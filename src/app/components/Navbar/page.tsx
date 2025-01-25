"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaRegHeart, FaRegUser } from "react-icons/fa";
import { FiSearch, FiShoppingCart } from "react-icons/fi";
import {
  IoBagCheckOutline,
  IoClose,
  IoHeartDislikeSharp,
} from "react-icons/io5";
import Image from "next/image";
import { useCart } from "@/app/context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import { TfiClose } from "react-icons/tfi";
import { BsBagX } from "react-icons/bs";
import { client } from "@/app/lib/sanity";

interface SanityProduct {
  _id: string;
  title: string;
  description: string;
  price: string;
  oldPrice?: string;
  discountPercentage?: string;
  imageUrl: string;
  isNew?: boolean;
  isOverlay?: boolean;
}

interface CartItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}
interface WishItem {
  id: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
}

const Navbar = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { cartItems, removeFromCart, totalPrice, addToCart } = useCart();
  const [CartVisible, setCartVisible] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isWishOpen, setIsWishOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<SanityProduct[]>([]);
  const [products, setProducts] = useState<SanityProduct[]>([]);
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/Pages/Shop" },
    { label: "Blog", href: "/Pages/Blog" },
    { label: "Contact", href: "/Pages/Contact" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // const res = await fetch("/api/products");
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
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    const lowerCaseQuery = searchQuery.toLowerCase();
    const results = products.filter((product: SanityProduct) =>
      product.title.toLowerCase().includes(lowerCaseQuery)
    );
    setFilteredProducts(results);
  }, [searchQuery, products]);

  const highlightText = (text: string, query: string) => {
    if (!query) return text;
    const parts = text.split(new RegExp(`(${query})`, "gi"));
    return parts.map((part, index) =>
      part.toLowerCase() === query.toLowerCase() ? (
        <span key={index} className="bg-[#B88E2F]">
          {part}
        </span>
      ) : (
        part
      )
    );
  };

  const handleAddToCart = (item: WishItem) => {
 
    addToCart(item);
  
   
    removeFromWishlist(item.id);
  };

  const handleCartClick = () => {
    setCartVisible(!CartVisible);
    setIsSearchOpen(false);
    setIsWishOpen(false);
  };

  const handleWishClick = () => {
    setIsWishOpen(!isWishOpen);
    setIsSearchOpen(false);
    setCartVisible(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSearchOpen(false);
  };

  return (
    <>
      {isSearchOpen && (
        <div className="absolute top-0 left-0 right-0 bottom-0 bg-black bg-opacity-50 z-40"></div>
      )}

      <nav className="bg-white shadow-md fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Image
              src="/assets/img/Logo.png"
              width={50}
              height={50}
              alt="Logo"
            />
            <Link href="/" className="text-2xl font-bold text-[#333333]">
              Furniro
            </Link>
          </div>

          <div className="hidden md:flex space-x-10">
            {navItems.map(({ label, href }, index) => (
              <Link
                key={index}
                href={href}
                className={`relative font-bold text-[#333333] hover:text-[#B88E2F] transition-colors duration-200 ease-in-out ${pathname === href ? "text-[#B88E2F]" : ""}`}
              >
                {label}
              </Link>
            ))}
          </div>

          <div className="flex items-center space-x-4 md:space-x-8">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="relative text-gray-600 hover:text-[#B88E2F] transition-colors duration-200"
            >
              <FiSearch size={20} />
            </button>

            <button
              onClick={handleCartClick}
              className="relative text-gray-600 hover:text-[#B88E2F] transition-colors duration-200"
            >
              <FiShoppingCart size={20} />
              {cartItems.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#B88E2F] text-white text-xs flex items-center justify-center rounded-full">
                  {cartItems.length}
                </span>
              )}
            </button>

            <button
              onClick={handleWishClick}
              className="relative text-gray-600 hover:text-[#B88E2F] transition-colors duration-200"
            >
              <FaRegHeart size={20} />
              {wishlistItems.length > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-[#B88E2F] text-white text-xs flex items-center justify-center rounded-full">
                  {wishlistItems.length}
                </span>
              )}
            </button>

            <button className="relative text-gray-600 hover:text-[#B88E2F] transition-colors duration-200">
              <FaRegUser size={20} />
            </button>

            <button className="md:hidden" onClick={toggleSidebar}>
              <FaBars size={20} />
            </button>
          </div>
        </div>

        {isSidebarOpen && (
          <>
            <div
              className="fixed inset-0 bg-black opacity-50 z-10"
              onClick={toggleSidebar}
              aria-hidden="true"
            ></div>

            <div
              className="fixed top-0 right-0 w-64 h-full bg-white shadow-lg z-20 transform transition-transform duration-300 ease-in-out"
              style={{
                transform: isSidebarOpen ? "translateX(0)" : "translateX(100%)",
              }}
            >
              <button
                className="absolute top-4 right-4 text-gray-600 hover:text-[#B88E2F] focus:outline-none"
                onClick={toggleSidebar}
                aria-label="Close Sidebar"
              >
                <IoClose size={24} />
              </button>

              <div className="mt-16 space-y-4">
                {navItems.map(({ label, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="block text-lg font-semibold text-[#333333] hover:text-[#B88E2F] transition-colors duration-200 ease-in-out px-6 py-3"
                  >
                    {label}
                  </Link>
                ))}
              </div>
            </div>
          </>
        )}
      </nav>

      {CartVisible && (
        <div className="absolute top-0 md:right-6 right-4 h-auto bg-white shadow-lg md:w-[24rem] w-[18rem] p-4 rounded-sm z-50">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold mb-4">Shopping Cart</h3>
            <button
              className="mb-4"
              onClick={() => setCartVisible(!CartVisible)}
            >
              <BsBagX size={20} className="text-[#B88E2F]" />
            </button>
          </div>
          {cartItems.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-black opacity-70 font-semibold text-lg">
                Your cart is empty.
              </p>
            </div>
          ) : (
            <div>
              {cartItems.map((item: CartItem) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center mb-4 border-t border-gray pt-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded-lg w-[5rem] h-[5rem]"
                    />
                    <div>
                      <h4 className="text-sm font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500 mt-1">
                        {item.quantity} x{" "}
                        <span className="text-[#B88E2F] text-xs">
                          Rs. {item.price.toLocaleString()}
                        </span>
                      </p>
                    </div>
                  </div>
                  <button
                    className="hover:text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <TfiClose
                      size={20}
                      className="px-1 py-0.5 bg-[#9F9F9F] text-white rounded-full hover:bg-[#B88E2F]"
                    />
                  </button>
                </div>
              ))}
            </div>
          )}
          <div className="flex justify-between items-center pt-4 pb-5">
            <span className="text-base font-medium">Subtotal</span>
            <span className="text-base font-bold text-[#B88E2F]">
              Rs. {totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="border-t border-gray flex justify-between gap-3">
            <Link href="/Pages/Cart">
              <button className="mt-4 hover:bg-[#B88E2F] hover:text-white text-black border-[#9F9F9F] border-2 py-1 px-6 hover:border-none rounded-full text-center font-medium text-sm">
                Cart
              </button>
            </Link>
            <Link href="/Pages/Checkout">
              <button
                className={`mt-4 text-black border-[#9F9F9F] border-2 py-1 px-6 rounded-full text-center font-medium text-sm ${
                  cartItems.length === 0
                    ? "cursor-not-allowed text-gray-400 border-gray-400 bg-transparent"
                    : "hover:bg-[#B88E2F] hover:border-none hover:text-white"
                }`}
                disabled={cartItems.length === 0}
              >
                {cartItems.length === 0 ? "Your cart is empty" : "Checkout"}
              </button>
            </Link>
          </div>
        </div>
      )}

      {isWishOpen && (
        <div className="absolute top-0 md:right-6 right-4 h-auto bg-white shadow-lg md:w-[24rem] w-[18rem] p-4 rounded-sm z-50">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-bold mb-4">Wishlist</h3>
            <button className="mb-4" onClick={()=> setIsWishOpen(!isWishOpen)}>
              <IoHeartDislikeSharp size={20} className="text-[#B88E2F]" />
            </button>
          </div>

          {wishlistItems?.length === 0 ? (
            <div className="text-center py-6">
              <p className="text-black opacity-70 font-semibold text-lg">
                Your Wishlist is empty.
              </p>
            </div>
          ) : (
            <div>
              {wishlistItems.map((item, index) => (
                <div
                  key={index}
                  className="flex justify-between items-center mb-4 border-t border-gray-200 pt-4"
                >
                  <div className="flex items-center gap-4">
                    <Image
                      src={item.image}
                      alt={item.title}
                      width={50}
                      height={50}
                      className="rounded-lg w-[5rem] h-[5rem] object-cover"
                    />
                    <div>
                      <h4 className="text-sm font-medium">{item.title}</h4>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      className="bg-[#9F9F9F] text-white px-2 py-1 rounded-md hover:bg-[#B88E2F]"
                      onClick={() => handleAddToCart(item)}
                    >
                      <IoBagCheckOutline size={15} />
                    </button>
                    <button onClick={() => removeFromWishlist(item.id)}>
                      <TfiClose
                        size={20}
                        className="px-1 py-0.5 bg-[#9F9F9F] text-white rounded-full hover:bg-[#B88E2F]"
                      />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {isSearchOpen && (
        <div className="absolute top-14 left-0 right-0 mt-4 bg-white shadow-2xl rounded-lg max-h-72 overflow-y-auto z-50 transition-all ease-out duration-300">
          <div className="p-4 border-b border-gray-200">
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-5 py-3 text-gray-800 bg-gray-100 rounded-full border border-gray-300 focus:ring-2 focus:ring-[#B88E2F] focus:border-[#B88E2F] transition duration-200 ease-in-out shadow-sm focus:shadow-lg hover:shadow-lg focus:outline-none placeholder:text-gray-500"
            />
          </div>
          <div className="max-h-100 overflow-y-auto">
            {searchQuery && filteredProducts.length === 0 ? (
              <div className="flex items-center justify-center h-32 text-gray-500">
                <span className="animate-pulse">Searching...</span>
              </div>
            ) : filteredProducts.length > 0 ? (
              filteredProducts.map((product, index) => (
                <Link
                  key={`${product._id}-${index}`}
                  href={`/components/ProductDetail/${product._id}`}
                  className="flex items-center space-x-4 py-4 px-5 hover:bg-[#F9F9F9] rounded-lg transition-all duration-300 ease-in-out"
                >
                  <div className="w-[3rem] h-[3rem]">
                    <Image
                      src={product.imageUrl}
                      alt={product.title}
                      width={60}
                      height={60}
                      className="rounded-lg w-full h-full object-cover shadow-md transform hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                  <div className="text-gray-800 font-medium text-sm">
                    {highlightText(product.title, searchQuery)}
                  </div>
                </Link>
              ))
            ) : (
              <div className="text-center text-gray-500 py-6">
                No products found
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
