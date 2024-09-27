import React from "react";
import Header from "../components/Header";
import Navbar from "../Components/NavBar";
import Footer from "../Components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      
      <Navbar />

      <Outlet />

      <Footer />
    </div>
  );
}

export default MainLayout;