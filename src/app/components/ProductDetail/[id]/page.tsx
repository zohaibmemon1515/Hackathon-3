"use client";
import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Head from "next/head";
import Image from "next/image";
import { FaFacebook, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import Link from "next/link";

import { fetchItemByID } from "@/app/utils/sanityQueries";
import Custom500 from "@/app/500";
import LoadingPage from "../../Loader/page";
import Navbar from "../../Navbar/page";
import RelatedProduct from "../../RelatedProducts/page";
import FeatureBar from "../../FeatureBar/page";
import Footer from "../../Footer/page";
import { useCart } from "@/app/context/CartContext";

interface ProductDetail {
  id: string;
  title: string;
  price: number;
  imageUrl: string;
  images: string[];
  rating: number;
  reviews: number;
  description: string;
  sku: string;
  tags: string[];
}

const ProductDetails = () => {
  const { id } = useParams();
  const [productDetail, setProductDetail] = useState<ProductDetail | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState<string | null>(null);
  const [error, setError] = useState(false);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const productData = await fetchItemByID(id as string);
        setProductDetail(productData);
        setMainImage(productData?.imageUrl || null);
        setError(false);
      } catch {
        setError(true);
      }
    };

    fetchData();
  }, [id]);

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  const handleAddToCart = () => {
    if (!productDetail) return;
    addToCart({
      id: productDetail.id,
      title: productDetail.title,
      price: productDetail.price,
      quantity,
      image: productDetail.imageUrl,
    });
  };

  const getCurrentUrl = () => {
    if (typeof window === "undefined") return "";
    const tags = productDetail?.tags.join(", ") || "";
    return `${window.location.href}?id=${id}&tags=${encodeURIComponent(tags)}`;
  };

  if (error) return <Custom500 />;
  if (!productDetail) return <LoadingPage />;

  return (
    <div>
      <Head>
        <title>{productDetail.title} - Product Details</title>
        <meta name="description" content={productDetail.description} />
        <meta property="og:title" content={productDetail.title} />
        <meta property="og:description" content={productDetail.description} />
        <meta property="og:image" content={productDetail.imageUrl} />
      </Head>

      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-6">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 sm:gap-8">
          <div className="col-span-12 md:col-span-2 lg:col-span-1 flex flex-row md:flex-col items-center justify-center md:justify-start md:items-start gap-3 sm:gap-4">
            {(productDetail?.images || []).map((src, index) => (
              <div
                key={index}
                className="group relative w-14 h-14 sm:w-20 sm:h-20 rounded-lg border border-gray-300 hover:border-[#B88E2F] cursor-pointer overflow-hidden"
                onClick={() => setMainImage(src)}
              >
                <Image
                  src={src}
                  alt={`Thumbnail ${index + 1}`}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
                />
              </div>
            ))}
          </div>

          <div className="col-span-12 md:col-span-5 lg:col-span-5 h-[300px] sm:h-[400px] md:h-[507px] flex items-start justify-center">
            <Image
              src={mainImage || "/assets/img/placeholder.png"}
              alt={productDetail.title || "Product Image"}
              width={500}
              height={500}
              className="w-full sm:max-w-sm md:max-w-full h-full object-cover rounded-lg bg-pink-100 p-4 shadow-lg"
            />
          </div>

          <div className="col-span-12 md:col-span-5 space-y-4">
            <h1 className="text-3xl font-bold text-gray-800">{productDetail.title}</h1>
            <p className="text-lg font-semibold text-gray-600 opacity-50">
              Rs. {productDetail.price}
            </p>

            <div className="flex items-center space-x-2">
              <div className="flex text-yellow-400 border-r border-gray pr-3">
                {Array(productDetail.rating || 5)
                  .fill("")
                  .map((_, i) => (
                    <span key={i}>⭐</span>
                  ))}
              </div>
              <p className="text-sm text-gray-800 opacity-50 font-semibold">
                {productDetail.reviews} Customer Reviews
              </p>
            </div>

            <p className="text-sm text-gray-600 leading-relaxed">
              {productDetail.description}
            </p>

            <div className="flex space-x-4 mt-4 border-b border-gray pb-6">
              <div className="flex items-center border rounded-md">
                <button
                  className="px-3 py-2 bg-black text-white opacity-50 hover:bg-[#B88E2F] hover:opacity-100"
                  onClick={handleDecrement}
                  aria-label="Decrease Quantity"
                >
                  -
                </button>
                <span className="px-4">{quantity}</span>
                <button
                  className="px-3 py-2 bg-black text-white opacity-50 hover:bg-[#B88E2F] hover:opacity-100"
                  onClick={handleIncrement}
                  aria-label="Increase Quantity"
                >
                  +
                </button>
              </div>
              <button
                className="px-3 py-2 text-sm bg-white border font-semibold text-black rounded-md hover:bg-[#B88E2F] hover:text-white transition"
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </div>

            <div className="text-sm text-black mt-4 space-y-2">
              <p className="font-bold opacity-50">
                <span className="pr-5">SKU</span>: {productDetail.sku || "N/A"}
              </p>
              <p className="font-bold opacity-50">
                <span className="pr-5">Tags</span>:{" "}
                {productDetail.tags.join(", ")}
              </p>
            </div>

            {/* Social Share */}
            <div className="flex items-center space-x-4 mt-4">
              <span className="text-sm sm:text-base font-bold text-black opacity-50">
                Share
              </span>
              <Link
                href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                  getCurrentUrl()
                )}`}
                target="_blank"
                className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full hover:text-[#B88E2F]"
              >
                <FaFacebook size={16} />
              </Link>
              <Link
                href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                  getCurrentUrl()
                )}`}
                target="_blank"
                className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full hover:text-[#B88E2F]"
              >
                <FaLinkedin size={16} />
              </Link>
              <Link
                href={`https://wa.me/?text=${encodeURIComponent(
                  `Check out this product: ${getCurrentUrl()}`
                )}`}
                target="_blank"
                className="w-5 h-5 flex items-center justify-center bg-gray-200 rounded-full hover:text-[#B88E2F]"
              >
                <FaWhatsapp />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <RelatedProduct />
      <FeatureBar />
      <Footer />
    </div>
  );
};

export default ProductDetails;
