import React from "react";
import Hero from "../Hero/Hero";
import AllProducts from "../AllProducts/AllProducts";
import AboutCupagreen from "../AboutCupagreen/AboutCupagreen";
import OurProductStand from "../OurProductStand/OurProductStand";
import CoutingUp from "../CoutingUp/CoutingUp";
import Gallery from "../Gallery/Gallery";

function Home() {
  return (
    <>
      <Hero />
      <AllProducts />
      {/* <AboutCupagreen /> */}
      <OurProductStand />
      <CoutingUp />
      <Gallery />
    </>
  );
}

export default Home;
