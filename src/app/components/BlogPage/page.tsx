"use client";
import React, { useState } from "react";
import Image from "next/image";
import { FiSearch } from "react-icons/fi";
import { FaCalendarAlt, FaTags, FaUser } from "react-icons/fa";


interface Post {
  image: string;
  title: string;
  date: string;
  category: string;
  description: string;
  id: string;
}

interface Category {
  name: string;
  count: number;
}

interface RecentPost {
  title: string;
  date: string;
  image: string;
}

const BlogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const posts: Post[] = [
    {
      id: "1",
      image: "/assets/img/Blog1.jpg",
      title: "Modern Interior Design Trends",
      date: "12 Jan 2023",
      category: "Interior",
      description:
        "Discover the latest trends in modern interior design and how to implement them into your home.",
    },
    {
      id: "2",
      image: "/assets/img/Blog2.jpg",
      title: "The Beauty of Handmade Art",
      date: "08 Feb 2023",
      category: "Handmade",
      description:
        "A closer look at the intricate details and passion behind handmade crafts and artwork.",
    },
    {
      id: "3",
      image: "/assets/img/Blog3.jpg",
      title: "Sustainable Wood Crafting",
      date: "25 Mar 2023",
      category: "Wood",
      description:
        "How wood crafting can be both sustainable and stylish in today's world.",
    },
    {
      id: "4",
      image: "/assets/img/Blog4.jpg",
      title: "The Essence of Modern Architecture",
      date: "10 Apr 2023",
      category: "Design",
      description:
        "Exploring the key principles and designs that define modern architecture.",
    },
    {
      id: "5",
      image: "/assets/img/Blog5.jpg",
      title: "Eco-Friendly Furniture Designs",
      date: "18 May 2023",
      category: "Sustainability",
      description:
        "Sustainable furniture designs for environmentally conscious living spaces.",
    },
    {
      id: "6",
      image: "/assets/img/Blog6.jpg",
      title: "The Art of Handmade Jewelry",
      date: "30 Jun 2023",
      category: "Handmade",
      description:
        "Discover the intricate art of creating unique handmade jewelry pieces.",
    },
    {
      id: "7",
      image: "/assets/img/Blog7.jpg",
      title: "Timeless Wooden Creations",
      date: "15 Jul 2023",
      category: "Wood",
      description:
        "How wood can be transformed into timeless creations that last generations.",
    },
  ];

  const getCategoriesWithCount = () => {
    const categoryCounts = posts.reduce(
      (acc, post) => {
        acc[post.category] = (acc[post.category] || 0) + 1;
        return acc;
      },
      {} as Record<string, number>
    );

    return [
      { name: "Interior", count: categoryCounts["Interior"] || 0 },
      { name: "Handmade", count: categoryCounts["Handmade"] || 0 },
      { name: "Wood", count: categoryCounts["Wood"] || 0 },
      { name: "Design", count: categoryCounts["Design"] || 0 },
      { name: "Sustainability", count: categoryCounts["Sustainability"] || 0 },
    ];
  };

  const categories: Category[] = getCategoriesWithCount();

  const recentPosts: RecentPost[] = [
    {
      title: "Tips for Eco-Friendly Homes",
      date: "18 Nov 2023",
      image: "/assets/img/Recent1.jpg",
    },
    {
      title: "The Rise of Minimalist Design",
      date: "12 Nov 2023",
      image: "/assets/img/Recent2.jpg",
    },
    {
      title: "Sustainable Materials in Crafting",
      date: "05 Nov 2023",
      image: "/assets/img/Recent3.jpg",
    },
    {
      title: "Exploring Color Psychology in Design",
      date: "22 Oct 2023",
      image: "/assets/img/Recent4.jpg",
    },
    {
      title: "Handmade Gifts for the Holidays",
      date: "15 Oct 2023",
      image: "/assets/img/Recent5.jpg",
    },
  ];

  const filteredPosts = posts.filter((post) => {
    const matchesCategory =
      !selectedCategory || post.category === selectedCategory;
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.description.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const postsPerPage = 3;
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const [currentPage, setCurrentPage] = useState(1);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category === selectedCategory ? null : category);
  };

  return (
    <div className="max-w-6xl mx-auto px-6 lg:px-6 py-20">
      <div className="flex xl:justify-around gap-8 md:flex-row flex-col-reverse md:justify-between justify-center">
        <div className="space-y-12">
          {currentPosts.map((post, index) => (
            <div key={index} className="mb-10">
              <Image
                src={post.image}
                alt={post.title}
                width={600}
                height={300}
                className="w-full h-full object-cover rounded-lg"
                quality={100}
              />
              <div className="mt-4">
                <div className="text-gray-500 text-sm flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-black opacity-60 font-semibold" />
                    <span className="text-black opacity-50 font-semibold">
                      Admin
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaCalendarAlt className="text-black opacity-60 font-semibold" />
                    <span className="text-black opacity-50 font-semibold">
                      {post.date}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTags className="text-black opacity-60 font-semibold" />
                    <span className="text-black opacity-50 font-semibold">
                      {post.category}
                    </span>
                  </div>
                </div>

                <h2 className="text-3xl font-semibold mt-4">{post.title}</h2>
                <p className="text-black opacity-50 font-semibold mt-4">
                  {post.description}
                </p>
              </div>
            </div>
          ))}

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
        </div>

        <div className="md:w-[30%]">
          <div className="md:mb-6 mb-10 relative md:justify-start justify-center flex items-center">
            <input
              type="text"
              className="md:w-[85%] w-full p-2 border-gray border-2 rounded-lg focus:outline-none"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <FiSearch className="absolute md:right-16 right-6 top-3 text-gray-400 text-xl" />
          </div>

          <div className="md:mb-8 mb-12 md:w-[80%] w-full">
            <h3 className="text-xl font-semibold mb-6">Categories</h3>
            <ul className="space-y-6">
              {categories.map((category, index) => (
                <li
                  key={index}
                  className="flex justify-between text-black font-semibold opacity-50"
                  onClick={() => handleCategoryClick(category.name)}
                  style={{
                    cursor: "pointer",
                    backgroundColor:
                      selectedCategory === category.name
                        ? "#f9f1e7"
                        : "transparent",
                  }}
                >
                  <span>{category.name}</span>
                  <span className="text-gray-500">{category.count}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-[80%]">
            <h3 className="text-xl font-semibold mb-6">Recent Posts</h3>
            <ul className="space-y-4">
              {recentPosts.map((post, index) => (
                <li key={index} className="flex items-center gap-4">
                  <Image
                    src={post.image}
                    alt={post.title}
                    width={60}
                    height={60}
                    className="w-16 h-16 object-cover rounded-full"
                    quality={100}
                  />
                  <div>
                    <h4 className="text-black font-semibold">{post.title}</h4>
                    <p className="text-gray-500">{post.date}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
