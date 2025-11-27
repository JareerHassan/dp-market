"use client"

import React, { useState } from 'react';
import { Plus, MessageCircle, ShoppingCart, Truck, CreditCard } from 'lucide-react';

// Define the type for the FAQ item
interface FAQItem {
  category: 'General' | 'Orders' | 'Shipping' | 'Payments' | 'Returns';
  question: string;
  answer: string;
}

// 1. Comprehensive FAQ Data
const faqData: FAQItem[] = [
  {
    category: 'General',
    question: "What makes your product unique?",
    answer: "Our product stands out due to its proprietary blend of sustainable materials, leading to superior durability and a minimal environmental footprint. We focus on ethical sourcing and transparent production processes.",
  },
  {
    category: 'Orders',
    question: "How can I change or cancel my order?",
    answer: "If your order has not yet been processed for shipping, you may be able to change or cancel it. Please contact our support team immediately (within 2 hours of purchase) at support@example.com with your order number. Once an order is shipped, we cannot make changes.",
  },
  {
    category: 'Shipping',
    question: "How long does shipping usually take?",
    answer: "For domestic orders, standard shipping typically takes 5-7 business days. Express options are available at checkout, which usually deliver within 2-3 business days. International shipping can take 10-20 business days, depending on customs clearance.",
  },
  {
    category: 'Returns',
    question: "What is your return and exchange policy?",
    answer: "Our standard return policy allows returns within 30 days of the purchase date for a full refund or exchange. Items must be unused, in their original packaging, and accompanied by a receipt. Personalized items are non-returnable.",
  },
  {
    category: 'Payments',
    question: "What payment methods do you accept?",
    answer: "We accept all major credit cards (Visa, Mastercard, Amex), PayPal, Apple Pay, and Google Pay. All transactions are securely processed using encrypted channels.",
  },
  {
    category: 'Shipping',
    question: "Do you offer international shipping?",
    answer: "Yes, we ship internationally to over 100 countries. Shipping fees and delivery times are calculated at checkout based on your location and selected service level.",
  },
  {
    category: 'Orders',
    question: "Can I place an order over the phone?",
    answer: "Currently, all orders must be placed through our secure online portal to ensure data accuracy and payment security. Our customer service team can guide you through the process if needed.",
  },
  {
    category: 'Payments',
    question: "When will I be charged for my order?",
    answer: "Your credit card will be authorized for the purchase amount at the time of order placement, and the final charge will occur once your order has been shipped from our warehouse.",
  },
  {
    category: 'General',
    question: "Do you have a physical store location?",
    answer: "We currently operate exclusively as an online retailer to keep our overhead low and pass the savings onto you. We occasionally participate in pop-up events, which we announce on social media.",
  },
  {
    category: 'Shipping',
    question: "What if my package is lost or damaged?",
    answer: "If your package is lost in transit or arrives damaged, please contact us immediately. We will initiate a claim with the carrier and send a replacement order as quickly as possible at no extra cost to you.",
  },
];

// Map categories to icons
const categoryIcons: Record<FAQItem['category'], React.ElementType> = {
  General: MessageCircle,
  Orders: ShoppingCart,
  Shipping: Truck,
  Payments: CreditCard,
  Returns: MessageCircle, // Using MessageCircle as a generic fallback
};

// 2. FAQ Accordion Component
const FAQItemComponent: React.FC<{ item: FAQItem, index: number, open: boolean, toggle: (index: number) => void }> = ({ item, index, open, toggle }) => {
  
  return (
    <div className="border-b border-gray-200 dark:border-gray-700">
      <button
        onClick={() => toggle(index)}
        // Simplified classes, keeping p-5 for spacing
        className="w-full flex justify-between items-center p-5 text-left transition duration-300 "
        aria-expanded={open}
        aria-controls={`faq-answer-${index}`}
      >
        {/* Simplified content: just the question span */}
        <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
            {item.question}
        </span>
        {/* Reverted to Plus icon with rotate-45 animation, using orange color for consistency */}
        <Plus
          className={`w-6 h-6 text-orange-600 dark:text-orange-400 transform transition-transform duration-300 ${
            open ? 'rotate-45' : ''
          }`}
        />
      </button>
      <div
        id={`faq-answer-${index}`}
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="p-5 pt-0 text-gray-600 dark:text-gray-300 leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  );
};

// 3. Main Application Component
const App = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<FAQItem['category'] | 'All'>('All');

  const toggleIndex = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };
  
  const categories = ['All', ...Array.from(new Set(faqData.map(item => item.category)))] as ('All' | FAQItem['category'])[];

  const filteredFaqData = activeCategory === 'All'
    ? faqData
    : faqData.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen font-sans p-4 sm:p-8">
      <header className="text-center py-12">
        <h1 className="text-5xl font-extrabold text-gray-900 dark:text-white mb-4 tracking-tight sm:text-6xl">
          Frequently Asked Questions
        </h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          Everything you need to know about our products, orders, shipping, and payments. If you can't find an answer here, feel free to contact us.
        </p>
      </header>

      <main className="max-w-5xl mx-auto">
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-2 mb-8 p-3">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setOpenIndex(null); // Close any open accordion when changing category
              }}
              className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all duration-200 shadow-sm
                ${activeCategory === category
                  ? 'bg-orange-600 text-white shadow-orange-500/50'
                  : ' text-gray-700 hover:bg-orange-100 hover:text-orange-600 dark:text-gray-200 dark:hover:bg-orange-900/50'
                }
              `}
            >
              {category}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div className=" rounded-xl overflow-hidden">
          {filteredFaqData.length > 0 ? (
            filteredFaqData.map((item, index) => (
              <FAQItemComponent 
                key={index} 
                item={item} 
                index={index} 
                open={openIndex === index} 
                toggle={toggleIndex} 
              />
            ))
          ) : (
            <div className="p-10 text-center text-gray-500 dark:text-gray-400">
              No FAQs found in the "{activeCategory}" category.
            </div>
          )}
        </div>
        
        {/* Contact CTA */}
        <div className="mt-12 p-8 text-center bg-orange-50 dark:bg-orange-900/30 rounded-xl border border-orange-200 dark:border-orange-700 shadow-inner">
            <h3 className="text-2xl font-bold text-orange-900 dark:text-orange-200 mb-3">Still have questions?</h3>
            <p className="text-orange-700 dark:text-orange-300 mb-4">
                If you cannot find the answer to your question in our FAQ, please reach out to our customer support team for assistance.
            </p>
            <a 
                href="mailto:support@example.com"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-full shadow-lg text-white bg-orange-600 hover:bg-orange-700 transition duration-150 ease-in-out transform hover:scale-105"
            >
                Contact Support
            </a>
        </div>
      </main>
    </div>
  );
};

export default App;