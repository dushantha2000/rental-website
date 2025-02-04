import React, { useState } from "react";
import PropertyFilter from "./common/PropertyFilter";
import AboutUs from "./common/AboutUs";
import Recommendation from "./common/Recommendation";
import Layout from "./common/Layout";
import FormFilter from "./common/FormFilter";

const Listings = () => {
  return (
    <div className="bg-gray-900">
      <Layout>
        <div className="container py-10 mx-auto">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-3">
              <FormFilter /> 
            </div>

            <div className="col-span-9">
              {/*recommendation Section */}
              <Recommendation />

              {/* Property Type Filter */}
              <PropertyFilter/>
            </div>
          </div>
        </div>
        {/* About Us Section */}
        <AboutUs />
      </Layout>
    </div>
  );
};

export default Listings;