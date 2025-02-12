import React from 'react';
import { User, Mail, Phone, Clock, Heart, Shield, Sparkles, Users } from 'lucide-react';
import Recommendation from './Recommendation';

const AboutPage = () => {
  

  const features = [
    {
      title: "Verified Listings",
      description: "Every property is vetted for accuracy, safety, and compliance",
      icon: Shield
    },
    {
      title: "Smart Search Tools",
      description: "Filter by budget, location, amenities, and more",
      icon: Sparkles
    },
    {
      title: "24/7 Support",
      description: "Chat, email, or call our team anytime",
      icon: Clock
    }
  ];

  return (
    <div className="min-h-screen text-gray-100 bg-gray-900">
      {/* Hero Section */}
      <section className="px-4 py-20 ">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="mt-12 mb-6 text-5xl font-bold">Where Every Home Tells a Story</h1>
          <p className="mb-8 text-xl text-gray-400">Transforming how people find, manage, and love their homes</p>
         
        </div>
      </section>

      {/* Mission Section */}
      <section className="px-4 py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-8 text-3xl font-bold text-center">Our Mission</h2>
          <p className="max-w-3xl mx-auto text-xl text-center text-gray-400">
            To empower renters and property owners with a seamless, stress-free rental experience by combining cutting-edge technology with human-centric values.
          </p>
        </div>
      </section>

     

      {/* Features Section */}
      <section className="px-4 py-16 bg-gray-800">
        <div className="max-w-6xl mx-auto">
          <h2 className="mb-12 text-3xl font-bold text-center">What We Offer</h2>
          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature, index) => (
              <div key={index} className="p-6 bg-gray-900 rounded-lg">
                <feature.icon size={40} className="mb-4 text-blue-400" />
                <h3 className="mb-3 text-xl font-bold">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Recommendation/>
    </div>
  );
};

export default AboutPage;