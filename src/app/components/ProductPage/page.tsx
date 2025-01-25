"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { FaShare, FaExchangeAlt, FaHeart } from "react-icons/fa";
import Custom500 from "@/app/500";
import LoadingPage from "../Loader/page";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { client } from "@/app/lib/sanity";

interface SanityProduct {
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

interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

interface WishlistItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
}

const sanitizePrice = (price: string): number => {
  const sanitizedPrice = parseFloat(price);
  return isNaN(sanitizedPrice) ? 0 : sanitizedPrice;
};

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        // const res = await fetch("/api/products");
        // if (!res.ok) {
        //   throw new Error("Failed to fetch products");
        // }
        // const data = await res.json();
        const data = await client.fetch(`*[_type=="product"]{
          _id,
          title,
          "imageUrl": productImage.asset->url,
          price,
          tags,
          discountPercentage,
          description,
          isNew
        }`);
        setProducts(data);
        setError(false);
      } catch {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (error) {
    return <Custom500 />;
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div>
          <LoadingPage />
        </div>
      </div>
    );
  }

  const getFirstFiveWords = (text: string) => {
    const words = text.split(" ");
    return words.slice(0, 5).join(" ") + (words.length > 5 ? "..." : "");
  };

  const handleAddToCart = (product: SanityProduct) => {
    const isAlreadyInCart = false;

    if (!isAlreadyInCart) {
      const cartItem: CartItem = {
        id: product._id,
        title: product.title,
        price: sanitizePrice(product.price), // Sanitize price
        image: product.imageUrl,
        quantity: 1,
      };
      addToCart(cartItem);
    } else {
      alert("This product is already in your cart!");
    }
  };

  const handleAddToWishlist = (product: SanityProduct) => {
    const wishlistItem: WishlistItem = {
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

  const handleShare = (product: SanityProduct) => {
    const url =
      window.location.href + `/components/ProductDetail/${product._id}`;

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
      <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">
        Our Products
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12 px-6 lg:px-8 xl:px-6">
        {products.slice(0, 8).map((product) => (
          <div
            key={product._id}
            className="relative bg-white text-black rounded-lg overflow-hidden shadow-lg group hover:cursor-pointer hover:opacity-70 transition-opacity duration-300"
          >
            <Image
              src={product.imageUrl}
              alt={product.title}
              className="w-full h-48 object-cover"
              width={300}
              height={300}
              priority
            />

            {product.discountPercentage ? (
              <div className="bg-red-500 absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full">
                {product.discountPercentage}% off
              </div>
            ) : (
              <div className="bg-red-500 absolute top-2 left-2 text-white text-xs font-bold px-2 py-1 rounded-full">
                0 % off
              </div>
            )}

            {product.isNew && (
              <div className="bg-green-500 absolute top-2 right-2 text-white text-xs font-bold px-2 py-1 rounded-full">
                New
              </div>
            )}

            <div className="absolute inset-0 bg-black bg-opacity-40 flex flex-col justify-center items-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
              <button
                className="bg-yellow-500 text-black px-4 py-2 rounded-full mb-2 font-semibold"
                onClick={() => handleAddToCart(product)}
              >
                Add to cart
              </button>
              <div className="flex space-x-4">
                <FaShare
                  className="text-white cursor-pointer"
                  onClick={() => handleShare(product)}
                />
                <FaExchangeAlt className="text-white cursor-pointer" />
                <FaHeart
                  className={`text-white cursor-pointer ${
                    wishlistItems.some((item) => item.id === product._id)
                      ? "text-red-500"
                      : ""
                  }`}
                  onClick={() => handleAddToWishlist(product)}
                />
              </div>
              <Link
                href={`/components/ProductDetail/${product._id}?tags=${product.tags.join(",")}`}
              >
                <button className="bg-green-500 text-white px-8 py-2 rounded-full mt-2 font-semibold">
                  Details
                </button>
              </Link>
            </div>

            <div className="p-4">
              <h3 className="font-bold text-2xl">{product.title}</h3>
              <p className="text-gray-600 mt-2">
                {getFirstFiveWords(product.description)}
              </p>
              <div className="flex items-center justify-between mt-3">
                <p className="font-semibold text-base">RP: {product.price}</p>
                {product.oldPrice && (
                  <p className="text-gray-400 line-through text-sm">
                    {product.oldPrice}
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
          className="bg-yellow-500 text-black px-6 py-3 rounded-full font-semibold transition duration-200 hover:bg-yellow-400"
        >
          Show More
        </Link>
      </div>
    </div>
  );
};

export default ProductPage;
