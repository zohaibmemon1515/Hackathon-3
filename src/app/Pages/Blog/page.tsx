import BlogBanner from "@/app/components/BlogBanner/page";
import BlogPage from "@/app/components/BlogPage/page";
import FeatureBar from "@/app/components/FeatureBar/page";
import Footer from "@/app/components/Footer/page";
import Navbar from "@/app/components/Navbar/page"

const Blog = () => {
    return (
        <div>
            <Navbar/>
            <BlogBanner/>
            <BlogPage/>
            <FeatureBar/>
            <Footer/>
        </div>
    )
}
export default Blog;