import Image from "next/image";

const FeatureBar = () => {
  return (
    <div className="bg-[#fdf7f2] lg:py-10 py-16">
      <div className="max-w-7xl mx-auto px-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 flex flex-col sm:flex-col lg:flex-row gap-12 justify-center lg:justify-between items-center">
       
        <div className="flex flex-col items-center space-x-0 sm:space-x-0 text-center">
          <div className="w-14 h-14">
            <Image
              src="/assets/img/FeatureBar1.png" 
              alt="High Quality"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#242424]">High Quality</h3>
            <p className="text-base text-[#898989] font-medium">crafted from top materials</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-x-0 sm:space-x-0 text-center">
          <div className="w-14 h-14">
            <Image
              src="/assets/img/FeatureBar2.png" 
              alt="Warranty Protection"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#242424]">Warranty Protection</h3>
            <p className="text-base text-[#898989] font-medium">Over 2 years</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-x-0 sm:space-x-0 text-center">
          <div className="w-14 h-14">
            <Image
              src="/assets/img/FeatureBar3.png" 
              alt="Free Shipping"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#242424]">Free Shipping</h3>
            <p className="text-base text-[#898989] font-medium">Order over $150</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-x-0 sm:space-x-0 text-center">
          <div className="w-14 h-14">
            <Image
              src="/assets/img/FeatureBar4.png" 
              alt="24 / 7 Support"
              width={50}
              height={50}
              className="object-cover w-full h-full"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#242424]">24 / 7 Support</h3>
            <p className="text-base text-[#898989] font-medium">Dedicated support</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureBar;
