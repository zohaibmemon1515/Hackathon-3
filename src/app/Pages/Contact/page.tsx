import ContactBanner from "@/app/components/ContactBanner/page";
import ContactSection from "@/app/components/ContactSection/page";
import FeatureBar from "@/app/components/FeatureBar/page";
import Footer from "@/app/components/Footer/page";
import Navbar from "@/app/components/Navbar/page";

const Contact = () => {
  return (
    <div>
      <Navbar />
      <ContactBanner/>
      <ContactSection/>
      <FeatureBar/>
      <Footer />
    </div>
  );
};
export default Contact;
