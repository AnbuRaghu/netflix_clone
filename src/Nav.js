import React, { useEffect, useState } from "react";
import "./nav.css";

export default function Nav() {
  const [show, handleShow] = useState(false);
  //scroll listening
  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        handleShow(true);
      } else handleShow(false);
    });
    return () => {
      window.removeEventListener("scroll");
    };
  }, []);
  return (
    <div className={`nav ${show && "nav_black"}`}>
      <img
        className="nav_logo"
        src="https://th.bing.com/th/id/OIP.XDiH6SLpGJ0THRoajza96wHaCT?w=320&h=108&c=7&o=5&dpr=1.25&pid=1.7"
        alt="Netfilx Logo"
      />
      <img
        className="nav_avatar"
        src="https://th.bing.com/th?q=Netflix+Avatar+Icons&w=120&h=120&c=1&rs=1&qlt=90&cb=1&dpr=1.25&pid=InlineBlock&mkt=de-DE&adlt=moderate&t=1&mw=247"
        alt="Netfilx Logo"
      />
    </div>
  );
}
