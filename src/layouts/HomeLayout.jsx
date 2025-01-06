import React, { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../provider/AuthProvider";
import { FiMoon, FiSun } from "react-icons/fi";

const HomeLayout = () => {
  const { loading, isDark, setIsDark } = useContext(AuthContext);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [isDark]);

  return (
    <div className="max-w-screen-2xl mx-auto">
      <Navbar />
      <div className="min-h-screen p-4">
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner text-primary w-16"></span>
          </div>
        ) : (
          <>
            <Outlet />
            <button
              className="p-4 rounded-full bg-blue-200 fixed right-5 bottom-5 z-10"
              onClick={() => setIsDark((c) => !c)}
            >
              {isDark ? <FiSun className="dark:text-black" /> : <FiMoon />}
            </button>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
};

export default HomeLayout;
