"use client";

import Custom500 from "@/app/500";
import LoadingPage from "../Loader/page";
import FilterBar from "../FilterBar/FilterBar";
import { useState, useEffect } from "react";
import { FaShare, FaExchangeAlt, FaHeart } from "react-icons/fa";
import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "../../context/WishlistContext";

interface SanityProduct {
  _id: string;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  discountPercentage: string;
  imageUrl: string;
  isNew: boolean;
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

const itemsPerPage = 12;

const ProductList: React.FC = () => {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, wishlistItems } = useWishlist();
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<SanityProduct[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<boolean>(false);

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch("api/products");
      const data = await response.json();
      setProducts(data);
      setFilteredProducts(data);
      setError(false);
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const applyFilter = (option: string) => {
    setCurrentPage(1);

    if (option === "0-10000") {
      setFilteredProducts(
        [...products].sort((a, b) => parseFloat(a.price) - parseFloat(b.price))
      );
    } else if (option === "10000-0") {
      setFilteredProducts(
        [...products].sort((a, b) => parseFloat(b.price) - parseFloat(a.price))
      );
    } else {
      setFilteredProducts(products);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
  };

  const handlePrev = () => {
    if (currentPage > 1) setCurrentPage((prev) => prev - 1);
  };

  const handleAddToCart = (product: SanityProduct) => {
    const cartItem: CartItem = {
      id: product._id,
      title: product.title,
      price: sanitizePrice(product.price),
      image: product.imageUrl,
      quantity: 1,
    };
    addToCart(cartItem);
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

  if (error) {
    return <Custom500 />;
  }

  return (
    <div className="container mx-auto py-6 max-w-7xl">
      {loading ? (
        <LoadingPage />
      ) : (
        <>
          <FilterBar applyFilter={applyFilter} />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-12 px-6 lg:px-8 xl:px-6">
            {currentProducts.map((product) => (
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
                    {product.description.split(" ").slice(0, 5).join(" ")}
                    {product.description.split(" ").length > 5 && "..."}
                  </p>
                  <div className="flex items-center justify-between mt-3">
                    <p className="font-semibold text-base">
                      RP: {product.price}
                    </p>
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

          <div className="justify-center items-center mt-12 gap-4 flex">
            <button
              onClick={handlePrev}
              className="px-4 py-2 bg-gray rounded font-semibold hover:bg-[#B88E2F] hover:opacity-100"
              disabled={currentPage === 1}
            >
              Prev
            </button>
            <span className="text-lg text-white font-medium bg-[#B88E2F] px-4 py-2 rounded">
              {currentPage}
            </span>
            <button
              onClick={handleNext}
              className="px-4 py-2 bg-gray rounded font-semibold hover:bg-[#B88E2F] hover:opacity-100"
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default ProductList;
