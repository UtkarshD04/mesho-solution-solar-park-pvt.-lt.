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
import ProductEnquiry from "./components/contact/ProductEnquiry";
import BecomePartner from "./components/contact/BecomePartner";
import CustomerSupport from "./pages/CustomerSupport";
import AfterSalesService from "./components/contact/AfterSalesService";
import SignIn from "./pages/SignIn";
import CreateAccount from "./pages/CreateAccount";
import MyAccount from "./pages/MyAccount";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Standalone — no TopBar/Navbar/Footer */}
        <Route path="/signup" element={<SignIn />} />
        <Route path="/create-account" element={<CreateAccount />} />

        {/* Main layout */}
        <Route path="/*" element={
          <>
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
              <Route path="/contact/after-sales-service" element={<AfterSalesService />} />
              <Route path="/contact/become-partner" element={<BecomePartner />} />
              <Route path="/customer-support" element={<CustomerSupport />} />
              <Route path="/my-account" element={<MyAccount />} />
            </Routes>
            <Footer />
          </>
        } />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
