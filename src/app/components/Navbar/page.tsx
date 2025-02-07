"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaBars, FaRegHeart, FaRegUser, FaUser } from "react-icons/fa";
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
import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

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
  const [isUserOpen, setIsUserOpen] = useState(false);
  const [user, setUser] = useState<{ username: string; email: string } | null>(
    null
  );
  const router = useRouter();

  useEffect(() => {
    const userCookie = Cookies.get("user");
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
  }, []);

  const handleLogout = () => {
    Cookies.remove("user");
    setUser(null);
    setIsUserOpen(false);
    router.push("/components/login");
  };

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Shop", href: "/Pages/Shop" },
    { label: "Blog", href: "/Pages/Blog" },
    { label: "Contact", href: "/Pages/Contact" },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
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

  const handleUserClick = () => {
    setCartVisible(false);
    setIsSearchOpen(false);
    setIsWishOpen(false);
    setIsSidebarOpen(false);
    setIsUserOpen(!isUserOpen);
  };

  const handleAddToCart = (item: WishItem) => {
    addToCart(item);
    removeFromWishlist(item.id);
  };

  const handleCartClick = () => {
    setCartVisible(!CartVisible);
    setIsSearchOpen(false);
    setIsWishOpen(false);
    setIsUserOpen(false);
    setIsSidebarOpen(false);
  };

  const handleWishClick = () => {
    setIsWishOpen(!isWishOpen);
    setIsSearchOpen(false);
    setCartVisible(false);
    setIsUserOpen(false);
    setIsSidebarOpen(false);
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
    setIsSearchOpen(false);
    setIsUserOpen(false);
    setIsWishOpen(false);
    setCartVisible(false);
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

            <button
              className="relative text-gray-600 hover:text-[#B88E2F] transition-colors duration-200"
              onClick={handleUserClick}
            >
              <FaRegUser size={20} />
            </button>

            <button className="md:hidden" onClick={toggleSidebar}>
              <FaBars size={20} />
            </button>
          </div>
        </div>

        {isUserOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="absolute top-12 right-0 bg-white shadow-lg rounded-lg p-5 w-56 text-center"
          >
            {user ? (
              <>
                <div className="w-16 h-16 mx-auto bg-gray-200 rounded-full flex items-center justify-center">
                  <FaUser className="text-gray-600 w-8 h-8" />
                </div>

                <p className="mt-3 text-lg font-semibold text-gray-800">
                  {user.username}
                </p>

                <button
                  onClick={handleLogout}
                  className="mt-4 bg-[#B88E2F] text-white px-4 py-2 rounded-lg hover:bg-[#A6791D] transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link href="/components/login">
                <button className="mt-4 bg-[#B88E2F] text-white px-4 py-2 rounded-lg hover:bg-[#A6791D] transition">
                  Login
                </button>
              </Link>
            )}
          </motion.div>
        )}

        {isSidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black z-10"
              onClick={toggleSidebar}
            ></motion.div>

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 100, damping: 15 }}
              className="fixed top-0 right-0 w-72 h-full bg-white shadow-xl z-20 rounded-l-3xl flex flex-col p-6"
            >
              <button
                className="absolute top-5 right-5 text-gray-600 hover:text-[#B88E2F] transition-transform transform hover:scale-110"
                onClick={toggleSidebar}
                aria-label="Close Sidebar"
              >
                <IoClose size={28} />
              </button>

              <nav className="mt-16 space-y-4">
                {navItems.map(({ label, href }, index) => (
                  <Link
                    key={index}
                    href={href}
                    className="block text-lg font-semibold text-[#333333] hover:text-[#B88E2F] px-6 py-3 transition-all duration-300 rounded-md hover:bg-gray-100"
                  >
                    {label}
                  </Link>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </nav>

      {CartVisible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10"
            onClick={toggleSidebar}
          ></motion.div>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed top-0 right-0 h-full bg-white shadow-2xl w-[18rem] md:w-[24rem] p-5 rounded-l-lg z-50"
          >
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-2xl font-bold text-[#B88E2F]">
                Furniro Cart
              </h3>
              <button onClick={() => setCartVisible(false)}>
                <BsBagX
                  size={22}
                  className="text-[#B88E2F] hover:scale-110 transition-transform"
                />
              </button>
            </div>

            {cartItems.length === 0 ? (
              <div className="relative mt-24 text-center z-10 px-8 py-6 bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-lg">
                <p className="text-xl font-semibold text-gray-800 animate-bounce mb-4">
                  Your cart is empty.
                </p>
                <p className="text-sm mt-3 text-gray-600 opacity-90 mb-6">
                  Add some products to your cart and make shopping a breeze!
                </p>
                <Link href={"/Pages/shop"}>
                  <button className="mt-4 inline-block px-8 py-3 bg-[#B88E2F] text-white text-md font-semibold rounded-full shadow-md hover:scale-105 transform transition-all">
                    Start Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 space-y-4 overflow-y-auto max-h-[60vh]">
                {cartItems.map((item: CartItem, index) => (
                  <div
                  key={`${item.id}-${index}`}
                    className="flex justify-between items-center py-3 border-b"
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

            {cartItems.length > 0 && (
              <>
                <div className="flex justify-between items-center py-4 text-lg font-semibold">
                  <span>Subtotal</span>
                  <span className="text-[#B88E2F]">
                    Rs. {totalPrice.toLocaleString()}
                  </span>
                </div>

                <div className="border-t pt-4 flex justify-between gap-3">
                  <Link href="/Pages/Cart">
                    <button className="px-6 py-2 rounded-full text-xs font-medium bg-[#B88E2F] text-white transition">
                      View Cart
                    </button>
                  </Link>
                  <Link href="/Pages/Checkout">
                    <button
                      className={`px-6 py-2 rounded-full text-xs font-medium transition ${
                        cartItems.length === 0
                          ? "cursor-not-allowed bg-[#B88E2F] text-white"
                          : "bg-[#B88E2F] text-white"
                      }`}
                      disabled={cartItems.length === 0}
                    >
                      Checkout
                    </button>
                  </Link>
                </div>
              </>
            )}
          </motion.div>
        </>
      )}

      {isWishOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black z-10"
            onClick={toggleSidebar}
          ></motion.div>
          <motion.div
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 100, damping: 15 }}
            className="fixed top-0 right-0 h-full bg-white shadow-2xl w-[18rem] md:w-[24rem] p-5 rounded-l-lg z-50"
          >
            <div className="flex justify-between items-center pb-3">
              <h3 className="text-2xl font-bold text-[#B88E2F]">Wishlist</h3>
              <button onClick={() => setIsWishOpen(!isWishOpen)}>
                <IoHeartDislikeSharp
                  size={22}
                  className="text-[#B88E2F] hover:scale-110 transition-transform"
                />
              </button>
            </div>

            {wishlistItems?.length === 0 ? (
              <div className="relative mt-24 text-center z-10 px-8 py-6 bg-white bg-opacity-70 backdrop-blur-lg rounded-2xl shadow-lg">
                <p className="text-xl font-semibold text-gray-800 animate-bounce mb-4">
                  Your Wishlist is empty.
                </p>
                <p className="text-sm mt-3 text-gray-600 opacity-90 mb-6">
                  Add some items to your wishlist to save them for later!
                </p>
                <Link href={"/Pages/shop"}>
                  <button className="mt-4 inline-block px-8 py-3 bg-[#B88E2F] text-white text-md font-semibold rounded-full shadow-md hover:scale-105 transform transition-all">
                    Start Shopping
                  </button>
                </Link>
              </div>
            ) : (
              <div className="mt-4 space-y-4 overflow-y-auto max-h-[60vh]">
                {wishlistItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center py-3 border-b"
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
          </motion.div>
        </>
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
