"use client";
import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaClock } from "react-icons/fa";

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  
  useEffect(() => {
    const savedFormData = localStorage.getItem("contactFormData");
    if (savedFormData) {
      setFormData(JSON.parse(savedFormData));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("contactFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const newErrors = {
      name: "",
      email: "",
      message: "",
    };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    }
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email format.";
    }
    if (!formData.message.trim()) {
      newErrors.message = "Message is required.";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("");
  
    if (!validateForm()) {
      return;
    }
  
    const whatsappNumber = "923193852479";
    const message = `Hello! You have a new inquiry:
    - Name: ${formData.name}
    - Email: ${formData.email}
    - Subject: ${formData.subject || "N/A"}
    - Message: ${formData.message}`;
  
    const whatsappURL = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${encodeURIComponent(
      message
    )}`;
  
    setStatus("Redirecting to WhatsApp...");
    setTimeout(() => {
      window.open(whatsappURL, "_blank");
      setStatus("");
  
     
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
  
      
      localStorage.removeItem("contactFormData");
    }, 1500);
  };
  

  return (
    <div className="max-w-7xl mx-auto px-6 md:pt-20 pt-24 py-14">
      <div className="text-center mx-auto mb-12 lg:w-[60%] md:w-[60%] w-[100%]">
        <h2 className="md:text-4xl text-3xl font-bold mb-4">
          Get In Touch With Us
        </h2>
        <p className="text-black text-sm font-semibold opacity-70">
          For more information about our products & services, feel free to drop
          us a message. Our team is here to assist you!
        </p>
      </div>

      <div className="grid grid-cols-1 md:flex lg:gap-24 md:gap-20 justify-center md:mt-24 mt-10">
        <div className="space-y-6 lg:w-[25%] md:w-[33%] w-[100%] md:text-start text-center">
          {[
            {
              icon: <FaMapMarkerAlt className="text-black text-xl mt-1" />,
              title: "Address",
              description:
                "236 5th SE Avenue, New York NY10000, United States",
            },
            {
              icon: <FaPhoneAlt className="text-black text-xl mt-1" />,
              title: "Phone",
              description: (
                <>
                  <p>Mobile: +(84) 546-6789</p>
                  <p>Hotline: +(84) 456-6789</p>
                </>
              ),
            },
            {
              icon: <FaClock className="text-black text-xl mt-1" />,
              title: "Working Time",
              description: (
                <>
                  <p>Monday-Friday: 9:00 - 22:00</p>
                  <p>Saturday-Sunday: 9:00 - 21:00</p>
                </>
              ),
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex md:flex-row md:items-start flex-col items-center gap-4"
            >
              <div>{item.icon}</div>
              <div>
                <h3 className="text-xl font-semibold mb-1">{item.title}</h3>
                <div className="text-gray-500 font-semibold opacity-75">
                  {item.description}
                </div>
              </div>
            </div>
          ))}
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 lg:w-[35%] md:w-[40%] w-[100%] md:mt-0 mt-20"
        >
          {[
            {
              label: "Your Name",
              type: "text",
              id: "name",
              placeholder: "Your name",
              value: formData.name,
              error: errors.name,
            },
            {
              label: "Email Address",
              type: "email",
              id: "email",
              placeholder: "example@domain.com",
              value: formData.email,
              error: errors.email,
            },
            {
              label: "Subject",
              type: "text",
              id: "subject",
              placeholder: "This is optional",
              value: formData.subject,
              error: "",
            },
          ].map(({ label, type, id, placeholder, value, error }) => (
            <div key={id}>
              <label
                htmlFor={id}
                className="block text-sm font-medium text-gray-700"
              >
                {label}
              </label>
              <input
                type={type}
                id={id}
                name={id}
                placeholder={placeholder}
                value={value}
                onChange={handleChange}
                className={`mt-3 block w-full px-4 py-2 border ${
                  error ? "border-red-500" : "border-gray-300"
                } rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500`}
              />
              {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
            </div>
          ))}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-700"
            >
              Message
            </label>
            <textarea
              id="message"
              name="message"
              placeholder="Hi! I'd like to ask about..."
              value={formData.message}
              onChange={handleChange}
              className={`mt-3 block w-full px-4 py-2 border ${
                errors.message ? "border-red-500" : "border-gray-300"
              } rounded-md shadow-sm focus:ring-yellow-500 focus:border-yellow-500`}
            ></textarea>
            {errors.message && (
              <p className="text-red-500 text-xs mt-1">{errors.message}</p>
            )}
          </div>
          <div className="flex justify-center md:justify-start">
            <button
              type="submit"
              className="py-2 px-16 bg-[#B88E2F] text-white font-semibold rounded-md shadow-sm hover:bg-yellow-600"
            
            >
              Submit
            </button>
            
          </div>
          {status && (
            <p className="text-center mt-4 text-sm text-gray-500">{status}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ContactSection;
