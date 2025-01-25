import CartDetail from "@/app/components/CartDetail/page";
import CartBanner from "@/app/components/CartBanner/page";
import FeatureBar from "@/app/components/FeatureBar/page";
import Footer from "@/app/components/Footer/page";
import Navbar from "@/app/components/Navbar/page";

const Cart = () => {
  return (
    <div>
      <Navbar />
      <CartBanner />
      <CartDetail  />
      <FeatureBar/>
      <Footer/>
    </div>
  );
};

export default Cart;
