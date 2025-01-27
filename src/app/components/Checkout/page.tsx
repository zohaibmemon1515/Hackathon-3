"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/app/context/CartContext";
import { client } from "@/app/lib/sanity";
import { useRouter } from "next/navigation";
import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";

const CheckoutForm = () => {
  const [isMounted, setIsMounted] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberError, setCardNumberError] = useState("");
  const { cartItems, totalPrice, clearCart } = useCart();
  const [paymentMethod, setPaymentMethod] = useState<string>("");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    country: "Pakistan",
    street: "",
    city: "",
    province: "",
    zip: "",
    phone: "",
    email: "",
    additionalInfo: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const router = useRouter();

  const provinces = [
    "Punjab",
    "Sindh",
    "Khyber Pakhtunkhwa",
    "Balochistan",
    "Gilgit-Baltistan",
    "Azad Jammu and Kashmir",
  ];
  const cities: Record<string, string[]> = {
    Punjab: ["Lahore", "Islamabad", "Faisalabad", "Rawalpindi", "Multan"],
    Sindh: ["Karachi", "Hyderabad", "Sukkur", "Mirpur Khas", "Larkana"],
    "Khyber Pakhtunkhwa": ["Peshawar", "Mardan", "Swat", "Abbottabad", "Kohat"],
    Balochistan: ["Quetta", "Gwadar", "Sibi", "Chaman", "Zhob"],
    "Gilgit-Baltistan": ["Gilgit", "Skardu", "Hunza", "Gahkuch", "Chilas"],
    "Azad Jammu and Kashmir": [
      "Muzaffarabad",
      "Mirpur",
      "Rawalakot",
      "Bhimber",
      "Kotli",
    ],
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.firstName || !/^[A-Za-z]+$/.test(formData.firstName))
      newErrors.firstName =
        "First name is required and should contain only alphabets.";
    if (!formData.lastName || !/^[A-Za-z]+$/.test(formData.lastName))
      newErrors.lastName =
        "Last name is required and should contain only alphabets.";
    if (!formData.street) newErrors.street = "Street address is required.";
    if (!formData.city) newErrors.city = "City is required.";
    if (!formData.province) newErrors.province = "Province is required.";
    if (!formData.zip) newErrors.zip = "ZIP Code is required.";
    if (!formData.phone || !/^\d{11}$/.test(formData.phone))
      newErrors.phone = "Phone number is required and should be 11 digits.";
    if (
      !formData.email ||
      !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(formData.email)
    )
      newErrors.email = "Valid email address is required.";
    if (!paymentMethod)
      newErrors.paymentMethod = "Please select a payment method.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateCardNumber = () => {
    const cardNumberRegex = /^\d{16}$/;
    if (!cardNumberRegex.test(cardNumber)) {
      setCardNumberError("Please enter a valid 16-digit card number.");
    } else {
      setCardNumberError("");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { id, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const orderId = Math.floor(100000 + Math.random() * 900000);
    const productIds = cartItems.map((item) => item.id);

    const doc = {
      _type: "order",
      order_id: orderId.toString(),
      orderDate: new Date(),
      product_id: productIds,
      notes: formData.additionalInfo,
      firstName: formData.firstName,
      lastName: formData.lastName,
      companyName: formData.company,
      paymentMethod: paymentMethod,
      country: formData.country,
      streetAddress: formData.street,
      city: formData.city,
      state: formData.province,
      zipCode: formData.zip,
      email: formData.email,
      phone: formData.phone,
    };

    try {
     
      await client.create(doc);
  
    
      console.log({
        email: formData.email,
        orderId: orderId,
        firstName: formData.firstName,
        orderItems: cartItems,
      });
  
    
      const response = await fetch("https://hackathon-3-git-main-zohaib-memons-projects.vercel.app/api/sendEmail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          orderId: orderId,
          firstName: formData.firstName,
          orderItems: cartItems,
        }),
      });
  
      if (response.ok) {
        clearCart();
        router.push(
          `/components/SuccessCard?email=${encodeURIComponent(formData.email)}&orderId=${orderId}`
        );
      } else {
        alert("Failed to send order confirmation email.");
      }
    } catch (error) {
      console.error("Error creating order:", error);
      alert("An error occurred while placing the order. Please try again.");
    }
  };

  if (!isMounted) return null;

  return (
    <div className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-6">
        <div className="bg-white p-8 rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold mb-6">Billing Details</h2>

          <form className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="flex flex-col">
              <label
                htmlFor="firstName"
                className="mb-2 font-medium text-gray-700"
              >
                First Name
              </label>
              <input
                id="firstName"
                type="text"
                value={formData.firstName}
                onChange={handleChange}
                className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-500 ${errors.firstName ? "border-red-500" : ""}`}
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="lastName"
                className="mb-2 font-medium text-gray-700"
              >
                Last Name
              </label>
              <input
                id="lastName"
                type="text"
                value={formData.lastName}
                onChange={handleChange}
                className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-500 ${errors.lastName ? "border-red-500" : ""}`}
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="company"
                className="mb-2 font-medium text-gray-700"
              >
                Company
              </label>
              <input
                id="company"
                type="text"
                value={formData.company}
                onChange={handleChange}
                className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-500 ${errors.company ? "border-red-500" : ""}`}
              />
              {errors.company && (
                <p className="text-red-500 text-sm mt-1">{errors.company}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label
                htmlFor="street"
                className="mb-2 font-medium text-gray-700"
              >
                Street
              </label>
              <input
                id="street"
                type="text"
                value={formData.street}
                onChange={handleChange}
                className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-500 ${errors.street ? "border-red-500" : ""}`}
              />
              {errors.street && (
                <p className="text-red-500 text-sm mt-1">{errors.street}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="zip" className="mb-2 font-medium text-gray-700">
                Zip Code
              </label>
              <input
                id="zip"
                type="number"
                value={formData.zip}
                onChange={handleChange}
                className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-500 ${errors.zip ? "border-red-500" : ""}`}
              />
              {errors.zip && (
                <p className="text-red-500 text-sm mt-1">{errors.zip}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="phone" className="mb-2 font-medium text-gray-700">
                Phone
              </label>
              <input
                id="phone"
                type="number"
                value={formData.phone}
                onChange={handleChange}
                className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-500 ${errors.phone ? "border-red-500" : ""}`}
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
            </div>

            <div className="flex flex-col ">
              <label htmlFor="email" className="mb-2 font-medium text-gray-700">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-500 ${errors.email ? "border-red-500" : ""}`}
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="flex flex-col ">
              <label
                htmlFor="country"
                className="mb-2 font-medium text-gray-700"
              >
                Country
              </label>
              <select
                id="country"
                value={formData.country}
                onChange={handleChange}
                className={`border rounded-lg p-3 focus:ring-2 focus:ring-gray-500 ${errors.country ? "border-red-500" : ""}`}
                disabled
              >
                <option value="Pakistan">Pakistan</option>
              </select>
              {errors.country && (
                <p className="text-red-500 text-sm mt-1">{errors.country}</p>
              )}
            </div>

            <div className="flex flex-col ">
              <label
                htmlFor="province"
                className="mb-2 font-medium text-gray-700"
              >
                Province
              </label>
              <select
                id="province"
                value={formData.province}
                onChange={handleChange}
                className={`border rounded-lg p-3 focus:ring-2 focus:ring-gray-500 ${errors.province ? "border-red-500" : ""}`}
              >
                <option value="">Select Province</option>
                {provinces.map((province) => (
                  <option key={province} value={province}>
                    {province}
                  </option>
                ))}
              </select>
              {errors.province && (
                <p className="text-red-500 text-sm mt-1">{errors.province}</p>
              )}
            </div>

            <div className="flex flex-col">
              <label htmlFor="city" className="mb-2 font-medium text-gray-700">
                City
              </label>
              <select
                id="city"
                value={formData.city}
                onChange={handleChange}
                className={`border rounded-lg p-3 focus:ring-2 focus:ring-gray-500 ${errors.city ? "border-red-500" : ""}`}
              >
                <option value="">Select City</option>
                {formData.province &&
                  cities[formData.province]?.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
              </select>
              {errors.city && (
                <p className="text-red-500 text-sm mt-1">{errors.city}</p>
              )}
            </div>

            <div className="flex flex-col sm:col-span-2">
              <label
                htmlFor="additionalInfo"
                className="mb-2 font-medium text-gray-700"
              >
                Additional Information
              </label>
              <textarea
                id="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                className={`border rounded-lg p-3 w-full focus:ring-2 focus:ring-gray-500 ${errors.additionalInfo ? "border-red-500" : ""}`}
              />
              {errors.additionalInfo && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.additionalInfo}
                </p>
              )}
            </div>
          </form>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-6">Your Cart</h2>

          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-60">
              <FiShoppingCart
                size={70}
                className="flex justify-center items-center mb-5"
              />
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Your cart is empty!
              </h3>
              <p className="text-sm text-gray-500 mb-4">
                Looks like you haven&apos;t added anything yet.
              </p>
              <Link href="/Pages/Shop">
                <button className="px-6 py-2 bg-[#B88E2F] text-white font-bold rounded-md hover:bg-[#c79c38]">
                  Start Shopping
                </button>
              </Link>
            </div>
          ) : (
            <>
              <div className="mb-4">
                {cartItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between items-center mb-4"
                  >
                    <h5 className="text-black font-semibold opacity-70">
                      {item.title} x {item.quantity}
                    </h5>
                    <h5>Rs. {item.price * item.quantity}</h5>
                  </div>
                ))}

                <div className="flex justify-between items-center">
                  <span className="font-semibold text-lg text-black">
                    Subtotal
                  </span>
                  <span className="font-semibold">
                    Rs. {totalPrice ? totalPrice.toLocaleString() : 0}
                  </span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-xl text-black">Total</span>
                <span className="font-bold text-amber-600 text-xl">
                  Rs. {totalPrice ? totalPrice.toLocaleString() : 0}
                </span>
              </div>

              <div className="mb-6">
                <label className="block mb-2 font-semibold text-lg">
                  Payment Method
                </label>
                <div className="space-y-3 mt-5">
                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="bank"
                      name="payment"
                      className="w-5 h-5"
                      onChange={() => setPaymentMethod("bank")}
                    />
                    <label
                      htmlFor="bank"
                      className="text-sm font-semibold text-black"
                    >
                      Direct Bank Transfer
                    </label>
                  </div>
                  {paymentMethod === "bank" && (
                    <div className="pl-8">
                      <div className="flex flex-col mb-4">
                        <label
                          htmlFor="cardNumber"
                          className="mb-2 font-medium text-black"
                        >
                          Card Number
                        </label>
                        <input
                          id="cardNumber"
                          type="number"
                          className={`border p-3 rounded-md w-full ${
                            cardNumberError
                              ? "border-red-500"
                              : "border-gray-300"
                          }`}
                          placeholder="Enter Card Number"
                          value={cardNumber}
                          onChange={(e) => setCardNumber(e.target.value)}
                          onBlur={validateCardNumber}
                        />
                        {cardNumberError && (
                          <span className="text-red-500 text-sm mt-2">
                            {cardNumberError}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-3">
                    <input
                      type="radio"
                      id="cod"
                      name="payment"
                      className="w-5 h-5"
                      onChange={() => setPaymentMethod("cod")}
                    />
                    <label
                      htmlFor="cod"
                      className="text-sm font-semibold text-black"
                    >
                      Cash on Delivery
                    </label>
                  </div>
                </div>
              </div>

              <div className="flex justify-center gap-5 mt-10">
                <button
                  onClick={handleSubmit}
                  className="px-6 py-2 text-white font-bold bg-[#B88E2F] rounded-md hover:bg-[#c79c38]"
                  disabled={!paymentMethod}
                >
                  Place Order
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;
