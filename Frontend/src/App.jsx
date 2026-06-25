import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import TopBar from "./components/layout/TopBar";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";
import About from "./pages/About";
import CustomerReview from "./pages/CustomerReview";
import Article from "./pages/Article";
import Contact from "./pages/Contact";
import Articles from "./pages/Articles";
import ProductEnquiry from "./components/contact/ProductEnquiry";
import BecomePartner from "./components/contact/BecomePartner";
import AfterSalesService from "./components/contact/AfterSalesService";

function App() {
  return (
    <BrowserRouter>
      <TopBar />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/customer-review" element={<CustomerReview />} />
        <Route path="/article" element={<Article />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/contact/product-enquiry" element={<ProductEnquiry />} />
        <Route path="/contact/become-partner" element={<BecomePartner />} />
        <Route path="/contact/after-sales" element={<AfterSalesService />} />
         {/* <Route path="/articles" element={<Articles />} /> */}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
