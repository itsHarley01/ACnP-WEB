import React from "react";
import Header from "../components/Header";
import Navbar from "../components/NavBar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div>
      <Header />
      <Navbar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default MainLayout;
