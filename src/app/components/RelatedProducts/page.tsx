"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Custom500 from "@/app/500";
import { fetchRelatedProductsByTags } from "@/app/utils/sanityQueries";
import { FaShare, FaExchangeAlt, FaHeart } from "react-icons/fa";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import Link from "next/link";

interface Product {
  _id: string;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  discountPercentage?: string;
  imageUrl: string;
  isNew: boolean;
  isOverlay?: boolean;
  discount?: string;
  tags: string[];
}

const sanitizePrice = (price: string): number => {
  const sanitizedPrice = parseFloat(price);
  return isNaN(sanitizedPrice) ? 0 : sanitizedPrice;
};

const getFirstFiveWords = (description: string): string => {
  return (
    description.split(" ").slice(0, 5).join(" ") +
    (description.split(" ").length > 5 ? "..." : "")
  );
};

const RelatedProduct: React.FC = () => {
  const searchParams = useSearchParams();
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<boolean>(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  useEffect(() => {
    debugger;
    const tags = searchParams.get("tags")?.split(",");

    if (!tags || tags.length === 0) {
      console.warn("No tags provided for related product search.");
      setLoading(false);
      return;
    }

    const fetchRelatedProducts = async () => {
      setLoading(true);
      try {
        debugger;
        const data = await fetchRelatedProductsByTags(tags);

        const filteredProducts = data.filter((product: Product) =>
          product.tags.some((tag: string) => tags.includes(tag))
        );

        setRelatedProducts(filteredProducts.length ? filteredProducts : []);
      } catch (err) {
        console.error("Error fetching related products:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [searchParams]);

  if (loading) return <p>Loading related products...</p>;

  if (error) return <Custom500 />;

  if (relatedProducts.length === 0) {
    return (
      <p className="text-center mt-4">
        No related products found. Please check product tags or try again later.
      </p>
    );
  }

  const handleAddToCart = (product: Product) => {
      const cartItem = {
        id: product._id,
        title: product.title,
        price: sanitizePrice(product.price),
        image: product.imageUrl,
        quantity: 1,
      };
      addToCart(cartItem);
  };

  const handleAddToWishlist = (product: Product) => {
    const wishlistItem = {
      id: product._id,
      title: product.title,
      price: sanitizePrice(product.price),
      image: product.imageUrl,
      quantity: 1,
    };

    if (wishlistItems.some((item) => item.id === product._id)) {
      removeFromWishlist(wishlistItem.id);
    } else {
      addToWishlist(wishlistItem);
    }
  };

  const handleShare = (product: Product) => {
    const url = `${window.location.origin}/components/ProductDetail/${product._id}?tags=${searchParams.get("tags")}`;

    if (navigator.share) {
      navigator
        .share({
          title: product.title,
          url: url,
        })
        .then(() => {
          console.log("Product shared successfully!");
        })
        .catch((error) => {
          console.error("Error sharing product:", error);
        });
    } else {
      alert("Your browser does not support sharing.");
    }
  };

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      <h1 className="text-3xl font-bold text-center mb-8">Related Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12 px-6 lg:px-8 xl:px-6">
        {relatedProducts.map((relatedProduct: Product) => (
          <div
            key={relatedProduct._id}
            className="relative bg-white text-black rounded-lg overflow-hidden shadow-lg group hover:cursor-pointer hover:opacity-70 transition-opacity duration-300"
          >
            <Image
              src={relatedProduct.imageUrl}
              alt={relatedProduct.title}
              className="w-full h-48 object-cover"
              width={300}
              height={300}
              priority
            />

            {relatedProduct.discountPercentage ? (
              <div className="bg-red-500 absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full">
                {relatedProduct.discountPercentage}% off
              </div>
            ) : (
              <div className="bg-red-500 absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full">
                0 % off
              </div>
            )}

            {relatedProduct.isNew && (
              <div className="bg-green-500 absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full">
                New
              </div>
            )}

            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button
                className="bg-yellow-500 text-black px-4 py-2 rounded-full mb-2 font-semibold"
                onClick={() => handleAddToCart(relatedProduct)}
              >
                Add to cart
              </button>
              <div className="flex space-x-4">
                <FaShare
                  className="text-white cursor-pointer"
                  onClick={() => handleShare(relatedProduct)}
                />
                <FaExchangeAlt className="text-white cursor-pointer" />
                <FaHeart
                  className={`text-white cursor-pointer ${
                    wishlistItems.some((item) => item.id === relatedProduct._id)
                      ? "text-red-500"
                      : ""
                  }`}
                  onClick={() => handleAddToWishlist(relatedProduct)}
                />
              </div>
              <Link
                href={`/components/ProductDetail/${relatedProduct._id}?tags=${relatedProduct.tags.join(",")}`}
              >
                <button className="bg-green-500 text-white px-8 py-2 rounded-full mt-2 font-semibold">
                  Details
                </button>
              </Link>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-2xl">{relatedProduct.title}</h3>
              <p className="text-gray-600 mt-2">
                {getFirstFiveWords(relatedProduct.description)}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="font-semibold text-base">
                  RP: {relatedProduct.price}
                </p>
                {relatedProduct.oldPrice && (
                  <p className="text-gray-400 line-through text-sm">
                    {relatedProduct.oldPrice}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link
          href="/Pages/Shop"
          className="bg-yellow-500 text-black px-6 py-2 rounded-full font-semibold"
        >
          Show More
        </Link>
      </div>
    </div>
  );
};

export default function RelatedProductWithSuspense() {
  return (
    <Suspense fallback={<p>Loading related products...</p>}>
      <RelatedProduct />
    </Suspense>
  );
}
