import Image from "next/image";

const BrowseTheRange = () => {
  const items = [
    {
      title: "Elegant Dining",
      description: "Explore our collection of modern dining essentials.",
      image: "/assets/img/Hero1.png",
    },
    {
      title: "Cozy Living",
      description: "Discover ideas to create a warm and inviting living space.",
      image: "/assets/img/Hero2.png",
    },
    {
      title: "Relaxing Bedroom",
      description: "Transform your bedroom into a tranquil retreat.",
      image: "/assets/img/Hero3.png",
    },
  ];

  return (
    <section className="text-center py-14 bg-gray-100">
      <h2 className="text-3xl font-bold text-gray-800">
        Browse Our Collections
      </h2>
      <p className="text-gray-500 md:mt-2 mt-4">
        Discover handpicked pieces for every <br className="block md:hidden" />
        corner of your home.
      </p>
      <div className="flex flex-col md:flex-row justify-center items-center gap-10 xl:px-6 px-6 md:py-8 py-12 max-w-7xl m-auto">
        {items.map((item, index) => (
          <div
            key={index}
            className="w-72 sm:w-full h-full rounded-lg overflow-hidden shadow-md bg-white hover:shadow-lg transition-shadow duration-300"
          >
            <Image
              src={item.image}
              alt={item.title}
              width={288}
              height={320}
              className="w-full h-3/4 object-cover"
            />
            <div className="p-4">
              <h3 className="text-lg font-semibold text-gray-700">
                {item.title}
              </h3>
              <p className="text-black font-semibold opacity-60 mt-2">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrowseTheRange;
