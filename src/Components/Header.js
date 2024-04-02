import Pdf from "../Files/ResumeJan2023-1.pdf"
import Blog from "./Blog";
import React from 'react';
import { useLocation } from 'react-router-dom'; // Import the router location hook

export function Header() {
  const location = useLocation(); // Get the current location

  return (
    <div className="bg-gray-800 bg-fixed">
      <div className="flex flex-row-reverse md:mx-20">
        {HeaderItem("Linkedin", "https://www.linkedin.com/in/ellacutler/", "_blank")}
        {HeaderItem("Blog", "/blog", "_self", location.pathname === '/blog')} {/* Pass true if on the blog page */}
        {HeaderItem("Resume", Pdf, "_blank")}
        <div className="flex grow md:-mx-16">{HeaderItem("Ella Cutler", "/", "_self", location.pathname === '/')}</div>
      </div>
    </div>
  );
}

function HeaderItem(text, href, target, isUnderlined) {
  return (
    <a tabIndex="0" className={`m-2 text-2xl text-gray-100 ${isUnderlined ? 'underline' : 'hover:underline'} font-TrapBold oblique`} target={target} href={href}>
      {text} 
    </a>
  );
}