"use client";
import React, { createContext, useState, useEffect, useContext } from "react";
import Cookies from "js-cookie";

interface WishlistItem {
  id: string;
  title: string;
  quantity: number;
  price: number;
  image: string;
}

interface WishlistContextType {
  wishlistItems: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlistItems, setWishlistItems] = useState<WishlistItem[]>([]);

  useEffect(() => {
    const storedWishlist = Cookies.get("wishlistItems");
    if (storedWishlist) {
      try {
        setWishlistItems(JSON.parse(storedWishlist));
      } catch (error) {
        console.error("Error parsing wishlist data from cookies", error);
      }
    }
  }, []);

 
  useEffect(() => {
    if (wishlistItems.length > 0) {
      Cookies.set("wishlistItems", JSON.stringify(wishlistItems), { expires: 7 }); 
    } else {
      Cookies.remove("wishlistItems");
    }
  }, [wishlistItems]);

  const addToWishlist = (newItem: WishlistItem) => {
    setWishlistItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems; 
      } else {
        return [...prevItems, newItem]; 
      }
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlistItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <WishlistContext.Provider
      value={{ wishlistItems, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within WishlistProvider");
  }
  return context;
};