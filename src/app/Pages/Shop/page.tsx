import FeatureBar from "@/app/components/FeatureBar/page";

import Footer from "@/app/components/Footer/page";
import ShopBanner from "@/app/components/MainBanner/page";
import Navbar from "@/app/components/Navbar/page";
import ProductList from "@/app/components/ProductList/page";

const Shop = () => {
  return (
    <div>
      <Navbar />
      <ShopBanner />
      <ProductList />
      <FeatureBar />
      <Footer />
    </div>
  );
};
export default Shop;
