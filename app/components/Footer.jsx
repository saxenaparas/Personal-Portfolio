import React from "react";
import Logo from "./ui/Logo";
import SocialMediaLinks from "./ui/SocialMediaLinks";

const Footer = () => {
  return (
    <footer className="footer border z-10 border-t-[#33353F] border-l-transparent border-r-transparent text-white ">
      <div className="container pl-24 pr-0 p-7 flex justify-between">
        <Logo/>
        <SocialMediaLinks />
      </div>
    </footer>
  );
};

export default Footer;
