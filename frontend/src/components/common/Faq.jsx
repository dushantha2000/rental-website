import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, Mail, MessageSquare } from 'lucide-react';
import Layout from './Layout';
import Contact from './Contact';
const FAQ = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const faqItems = [
    {
      question: "How do I list my property for rent?",
      answer: "Create an account, go to your dashboard, and use the 'List Property' form. Our team will review your submission within 24 hours."
    },
    {
      question: "What documents do I need to rent a property?",
      answer: "Typically you'll need government-issued ID, proof of income, and previous rental references. Specific requirements vary by property."
    },
    {
      question: "How are payments processed?",
      answer: "We use secure payment processing with SSL encryption. You can pay via credit card, bank transfer, or mobile payment options."
    },
    {
      question: "Can I schedule a property viewing?",
      answer: "Yes! Click the 'Schedule Viewing' button on any property listing to choose a convenient time."
    },
    {
      question: "What's your cancellation policy?",
      answer: "Cancellations made 48+ hours before move-in date receive full refund. Later cancellations may incur fees."
    },
    {
      question: "How do I contact support?",
      answer: "Use our 24/7 chat support, email support@dreamhome.lk, or call +94 112 345 678."
    }
    // ... rest of the questions
  ];

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <Layout>
      <div className="min-h-screen px-4 py-12 bg-gradient-to-b from-gray-900 to-gray-800 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        {/* Header Section (same as before) */}
        <div className="mb-16 text-center">
          <h2 className="mt-12 mb-4 text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">
            Frequently Asked Questions
          </h2>
          <p className="max-w-2xl mx-auto text-xl text-gray-300">
            Find quick answers to common questions about renting, listing properties, payments, and more.
          </p>
        </div>

        {/* Custom Accordion */}
        <div className="max-w-5xl mx-auto space-y-4">
          {faqItems.map((item, index) => (
            <div 
              key={index}
              className={`rounded-xl p-6 transition-all duration-300 ${
                activeIndex === index ? 'bg-gray-800' : 'bg-gray-800/50 hover:bg-gray-800/70'
              }`}
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full space-x-4"
              >
                <div className="flex items-start space-x-4">
                  <HelpCircle className="flex-shrink-0 w-6 h-6 text-purple-400" />
                  <h3 className="text-lg font-medium text-left text-gray-100">
                    {item.question}
                  </h3>
                </div>
                <ChevronDown
                  className={`h-6 w-6 transform transition-transform ${
                    activeIndex === index ? 'rotate-180 text-blue-400' : 'text-gray-400'
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  activeIndex === index ? 'max-h-96 mt-4' : 'max-h-0'
                }`}
              >
                <div className="pl-10 pr-4">
                  <p className="text-gray-400">{item.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Keep the same Additional Help Section */}
        <div className="pt-16 mt-16 text-center border-t border-gray-700">
          {/* ... same help section content as before ... */}
        </div>
        <Contact/>
      </div>
    </div>
    </Layout>
    
  );
};

export default FAQ;