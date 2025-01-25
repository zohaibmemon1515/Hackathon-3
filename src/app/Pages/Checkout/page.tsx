import CheckoutForm from "@/app/components/Checkout/page";
import CheckoutBanner from "@/app/components/CheckoutBanner/page";
import FeatureBar from "@/app/components/FeatureBar/page";

import Footer from "@/app/components/Footer/page";
import Navbar from "@/app/components/Navbar/page";

const Checkout = () => {
  return (
    <div>
      <Navbar />
      <CheckoutBanner />
      <CheckoutForm />
      <FeatureBar />
      <Footer />
    </div>
  );
};

export default Checkout;
