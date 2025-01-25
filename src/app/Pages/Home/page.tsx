import BrowseTheRange from "@/app/components/BrowseRange/page";
import Footer from "@/app/components/Footer/page";
import Hashtag from "@/app/components/Hashtag/page";
import Hero from "@/app/components/Hero/page";
import Inspiration from "@/app/components/Inspiration/page";
import Navbar from "@/app/components/Navbar/page";
import ProductPage from "@/app/components/ProductPage/page";



const MainPage = () => {
  return (
    <div>
      <Navbar />
      <Hero />
      <BrowseTheRange />
      <ProductPage />
      <Inspiration />
      <Hashtag />
      <Footer />
    </div>
  );
};
export default MainPage;
