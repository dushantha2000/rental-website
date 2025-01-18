import React, { useState } from "react";
import Hero from "./common/Hero";
import PropertyFilter from "./common/PropertyFilter";
import AboutUs from "./common/AboutUs";
import Recommendation from "./common/Recommendation";
import FeedBack from "./common/FeedBack";
import Layout from "./common/Layout";
import FormFilter from "./common/FormFilter"; // Import the AdvancedSearch component
import ChatBox from "./common/ChatBox";

const HomePage = () => {
  return (
    <div className="bg-gray-900">
      <Layout>
        {/*Hero Section */}
        <Hero />

        <div className="container mx-auto py-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <FormFilter /> 
            </div>

            <div className="col-span-9">
              {/*recommendation Section */}
              <Recommendation />

              {/* Property Type Filter */}
              <PropertyFilter />
            </div>
          </div>
        </div>

        {/*Chat Box */}
        <ChatBox/>

        {/*Customer Feed back */}
        <FeedBack />

        {/* About Us Section */}
        <AboutUs />
      </Layout>
    </div>
  );
};

export default HomePage;