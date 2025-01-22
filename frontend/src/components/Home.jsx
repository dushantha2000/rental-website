import React, { useState } from "react";
import Hero from "./common/Hero";
import PropertyFilter from "./common/PropertyFilter";
import Recommendation from "./common/Recommendation";
import FeedBack from "./common/FeedBack";
import Layout from "./common/Layout";
import FormFilter from "./common/FormFilter"; 
import ChatBox from "./common/ChatBox";


const HomePage = () => {
  return (
    <div className="bg-gray-900">
      <Layout>
        
        <Hero />

        <div className="container mx-auto py-10">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <FormFilter /> 
            </div>

            <div className="col-span-9">
             
              <Recommendation />

              
              <PropertyFilter />
            </div>
          </div>
        </div>

        {/*Chat Box */}
        <ChatBox/>

        {/*Customer Feed back */}
        <FeedBack />

        
        
      </Layout>
    </div>
  );
};

export default HomePage;