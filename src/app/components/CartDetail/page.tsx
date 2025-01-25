"use client";
import Image from "next/image";
import { FaTrash } from "react-icons/fa";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";

const CartDetail = () => {
  const { cartItems, removeFromCart, updateQuantity, totalPrice } = useCart();

  return (
    <div className="py-12 bg-gray-50 h-full">
      <div className="max-w-7xl mx-auto bg-white px-6 rounded-lg flex flex-col lg:flex-row gap-8">
        <div className="flex-1 overflow-x-auto">
          <div className="grid grid-cols-4 text-sm gap-4 md:text-base items-center bg-[#F9F1E7] text-gray-600 p-4 rounded-t-lg">
            <span className="font-semibold">Product</span>
            <span className="font-semibold">Price</span>
            <span className="font-semibold">Quantity</span>
            <span className="font-semibold">Subtotal</span>
          </div>

          {cartItems.length > 0 ? (
            <div>
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-4 gap-4 items-center p-4 border-b"
                >
                  <div className="flex items-center">
                    <div className="w-16 h-16 relative bg-[#F9F1E7]">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="w-full h-full object-cover rounded-lg"
                      />
                    </div>
                    <span className="ml-6 text-black text-sm font-semibold opacity-60">
                      {item.title}
                    </span>
                  </div>
                  <span className="text-black text-sm font-semibold opacity-60">
                    Rs. {item.price}
                  </span>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-12 p-1 border rounded text-center appearance-none"
                    onChange={(e) =>
                      updateQuantity(item.id, Number(e.target.value))
                    }
                  />
                  <div className="flex items-center gap-10">
                    <span className="text-black font-semibold flex justify-start text-sm">
                      Rs. {item.price * item.quantity}
                    </span>
                    <button
                      className="flex justify-end text-amber-600 hover:text-amber-800"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <FaTrash className="h-6 w-6" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 text-gray-600 text-lg">
              Your cart is empty
            </div>
          )}
        </div>

        <div className="lg:w-[28%] w-full px-6 pt-6 pb-14 rounded-lg shadow-lg bg-[#F9F1E7]">
          <h3 className="text-3xl font-bold text-black text-center">
            Cart Totals
          </h3>
          <div className="mt-14 flex justify-between">
            <span className="text-base text-black font-semibold">Subtotal</span>
            <span className="text-base text-black opacity-60 font-semibold">
              Rs. {totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="mt-4 flex justify-between">
            <span className="text-base text-black font-semibold">Total</span>
            <span className="text-base font-semibold text-amber-600">
              Rs. {totalPrice.toLocaleString()}
            </span>
          </div>
          <div className="flex justify-center items-center">
            {cartItems.length > 0 ? (
              <Link href="/Pages/Checkout">
              <button className="mt-12 px-12 hover:bg-amber-600 hover:text-white py-2 rounded-lg text-black font-semibold border-black border-2 hover:border-none">
                Check Out
              </button>
              </Link>
            ) : (
              <span className="mt-12 px-12 py-2 rounded-lg text-gray-400 font-semibold border-black border-2 cursor-not-allowed">
                Your cart is empty
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartDetail;
