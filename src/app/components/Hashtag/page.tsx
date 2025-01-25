import Image from "next/image";

const Hashtag = () => {
  const images = [
    { src: "/assets/img/Hastag1.png", name: "Modern Sofa Set" },
    { src: "/assets/img/Hastag2.png", name: "Wooden Dining Table" },
    { src: "/assets/img/Hastag3.png", name: "Office Chair" },
    { src: "/assets/img/Hastag4.png", name: "Bedside Lamp" },
    { src: "/assets/img/Hastag5.png", name: "Bookshelf" },
    { src: "/assets/img/Hastag6.png", name: "Stylish Cabinet" },
    { src: "/assets/img/Hastag7.png", name: "Minimalistic Desk" },
    { src: "/assets/img/Hastag8.png", name: "Compact Storage Unit" },
  ];

  return (
    <section className="py-8 bg-gray-50">
      <div className="max-w-screen-xl mx-auto xl:px-6 lg:px-6 md:px-6 px-6">
        <h3 className="text-xl font-semibold text-center text-gray-800 ">
          Share your setup with
        </h3>
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
          #FuniroFurniture
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10">
          {images.map((image, index) => (
            <div
              key={index}
              className="relative overflow-hidden rounded-lg group"
            >
              <div className="relative w-full h-56">
                <Image
                  src={image.src}
                  alt={`Gallery image ${index + 1}`}
                  layout="fill"
                  objectFit="cover"
                  className="group-hover:scale-110 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out"></div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out">
                <span className="text-white text-lg font-semibold">
                  {image.name}
                </span>{" "}

              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hashtag;
