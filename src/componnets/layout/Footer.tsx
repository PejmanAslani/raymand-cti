import React from "react";
import "./Footer.css";

function Footer() {
  var currentTime = new Date()
  return (
    <div className="footer">
      {/* <p>کلیه حقوق مرکز تلفن کاج متعلق به شرکت رایمند ارتباطات نقش جهان میباشد</p> */}
      <p>All Rights of RaymandCTI Belong to Raymand Naqsh Jahan Communications Company in {currentTime.getFullYear()}</p>
    </div>
  );
}

export default Footer;
