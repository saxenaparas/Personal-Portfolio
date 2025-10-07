"use client";

import React, { useState } from "react";
import Contact from "./ui/contact/Contact";
import MiniContact from "./ui/miniContact/miniContact";
import SocialMediaLinks from "./ui/SocialMediaLinks";

const EmailSection = () => {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [loading, setLoading] = useState(false); // <-- NEW STATE

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (loading) return; // Prevent double click immediately

    setLoading(true); // Disable button instantly

    const data = {
      email: e.target.email.value,
      subject: e.target.subject.value,
      message: e.target.message.value,
    };

    try {
      const response = await fetch("/api/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        console.log("Message sent.");
        setEmailSubmitted(true);
      } else {
        alert("⚠️ Failed to send email. Please try again later.");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("⚠️ Network error. Please try again later.");
      setLoading(false);
    }
  };

  return (
    <section
      id="contact"
      className="grid md:grid-cols-2 my-12 md:my-12 py-24 gap-4 relative"
    >
      <div className="bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-900 to-transparent rounded-full h-80 w-80 z-0 blur-lg absolute top-3/4 -left-4 transform -translate-x-1/2 -translate-1/2"></div>
      <div className="z-10">
        <h5 className="text-3xl font-bold textColor1 my-2">Let&apos;s Connect : <MiniContact/> :</h5> 
        
        <p className="textColor2 mb-4 max-w-md text-justify text-lg">
          I&apos;m currently looking for new opportunities, my inbox is always
          open. Whether you have a question or just want to say hi, I&apos;ll
          try my best to get back to you!
        </p>
        <SocialMediaLinks />
      </div>
      
      <div className="relative">
        {emailSubmitted ? (
          <p className="text-green-500 text-3xl mt-auto ml-10 p-5 w-2/3 content-center border-dotted border-2 border-indigo-600">
            ✅ Email sent successfully!
          </p>
        ) : (
          <form className="flex flex-col z-0" onSubmit={handleSubmit}>
            <div className="mb-6">
              <Contact />
              <label
                htmlFor="email"
                className="textColor1 block mb-2 text-base font-medium"
              >
                📧 Your Email
              </label>
              <input
                name="email"
                type="email"
                id="email"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="📧 example@example.com"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="subject"
                className="textColor1 block text-base mb-2 font-medium"
              >
               🔎 Subject
              </label>
              <input
                name="subject"
                type="text"
                id="subject"
                required
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="👋 Just saying hi"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="message"
                className="textColor1 block text-base mb-2 font-medium"
              >
                📝 Message 
              </label>
              <textarea
                name="message"
                id="message"
                className="bg-[#18191E] border border-[#33353F] placeholder-[#9CA2A9] text-gray-100 text-sm rounded-lg block w-full p-2.5"
                placeholder="💬 Let's talk about..."
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`${
                loading
                  ? "bg-gray-600 cursor-not-allowed"
                  : "bg-primary-500 hover:bg-primary-600"
              } textColor1 font-medium py-2.5 px-5 rounded-lg w-full transition-all duration-200`}
            >
              <b>{loading ? "Sending..." : "Send Message"}</b>
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default EmailSection;
