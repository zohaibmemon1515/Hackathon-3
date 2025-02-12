"use client"
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import * as Yup from "yup";
import { client } from "@/app/lib/sanity";
import Image from "next/image";
import toast, { Toaster } from "react-hot-toast";
import { motion } from "framer-motion";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import bcrypt from "bcryptjs";

export default function Signup() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const showToast = (message: string, type = "success") => {
    toast.custom(
      () => (
        <motion.div
          initial={{ x: "100%", opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: "100%", opacity: 0 }}
          transition={{ type: "spring", stiffness: 100, damping: 25 }}
          className={`fixed right-5 top-20 z-50 p-5 rounded-xl shadow-xl ${
            type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"
          }`}
        >
          <div className="flex items-center space-x-4">
            <div className="flex-shrink-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-md border border-gray-300"
              >
                {type === "success" ? (
                  <FaCheckCircle className="text-green-500 w-6 h-6" />
                ) : (
                  <FaTimesCircle className="text-red-500 w-6 h-6" />
                )}
              </motion.div>
            </div>
            <div className="flex-grow">
              <p className="text-lg font-semibold">{message}</p>
              <motion.div
                initial={{ width: "100%" }}
                animate={{ width: "0%" }}
                transition={{ duration: 3, ease: "linear" }}
                className={`absolute bottom-0 left-0 h-1 ${
                  type === "success" ? "bg-green-700" : "bg-red-700"
                }`}
              />
            </div>
          </div>
        </motion.div>
      ),
      { duration: 3000 }
    );
  };

  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().min(3, "Must be at least 3 characters").required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      password: Yup.string().min(6, "Must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const existingUser = await client.fetch(
          `*[_type == "user" && email == $email][0]`,
          { email: values.email }
        );
    
        if (existingUser) {
          showToast("This email is already registered. Please login.", "error");
          setLoading(false);
          return;
        }
    
        const hashedPassword = await bcrypt.hash(values.password, 10);
    
        const user = await client.create({
          _type: "user",
          username: values.username,
          email: values.email.toLowerCase(),
          password: hashedPassword,
        });
        
        console.log("User created:", user);
    
        try {
          const emailResponse = await fetch("/api/signupEmail", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: values.email, username: values.username }),
          });
    
          if (!emailResponse.ok) {
            console.error("Failed to send welcome email.");
          }
        } catch (emailError) {
          console.error("Email sending error:", emailError);
        }
    
        showToast("Signup successful! Please login.", "success");
        setTimeout(() => router.push("/components/login"), 3000);
      } catch (error) {
        showToast("Signup failed. Try again!", "error");
        console.error("Signup error:", error);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-6">
    <Toaster />
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-md sm:max-w-lg"
    >
      <Image
        src="/assets/img/Logo.png"
        alt="Logo"
        width={80}
        height={80}
        className="mx-auto mb-6"
      />
  
      <h2 className="text-3xl font-bold text-center text-[#B88E2F] mb-8">
        Furniro Signup
      </h2>
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div>
          <input
            type="text"
            name="username"
            placeholder="Username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-6 py-3 border ${formik.touched.username && formik.errors.username ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#B88E2F] outline-none transition-all duration-300 ease-in-out`}
          />
          {formik.touched.username && formik.errors.username && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 mt-2 text-sm"
            >
              {formik.errors.username}
            </motion.p>
          )}
        </div>
  
        <div>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-6 py-3 border ${formik.touched.email && formik.errors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#B88E2F] outline-none transition-all duration-300 ease-in-out`}
          />
          {formik.touched.email && formik.errors.email && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 mt-2 text-sm"
            >
              {formik.errors.email}
            </motion.p>
          )}
        </div>
  
        <div>
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className={`w-full px-6 py-3 border ${formik.touched.password && formik.errors.password ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring-2 focus:ring-[#B88E2F] outline-none transition-all duration-300 ease-in-out`}
          />
          {formik.touched.password && formik.errors.password && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
              className="text-red-500 mt-2 text-sm"
            >
              {formik.errors.password}
            </motion.p>
          )}
        </div>
  
        <div className="flex justify-between items-center">
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 text-white bg-[#B88E2F] rounded-lg shadow-lg ${loading ? "bg-opacity-75" : "hover:bg-[#A6791D]"} transition duration-300`}
          >
            {loading ? "Loading..." : "Signup"}
          </button>
        </div>
  
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-500">
            Already have an account?{" "}
            <a href="/components/login" className="text-[#B88E2F] font-semibold">
              Login
            </a>
          </p>
        </div>
      </form>
    </motion.div>
  </div>
  
  );
}
