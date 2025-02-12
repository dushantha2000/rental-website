import React, { useState } from "react";
import Hero from "./common/Hero";
import PropertyFilter from "./common/PropertyFilter";
import Recommendation from "./common/Recommendation";
import FeedBack from "./common/FeedBack";
import Layout from "./common/Layout";
import FormFilter from "./common/FormFilter";

const HomePage = () => {
  return (
    <div className="bg-gray-900">
      <Layout>
        <Hero />

        <Recommendation />

        <PropertyFilter />

        {/*Chat Box */}
        
        {/*Customer Feed back */}
        <FeedBack />
      </Layout>
    </div>
  );
};

export default HomePage;
