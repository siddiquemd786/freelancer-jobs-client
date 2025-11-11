// src/component/Banner.jsx
// src/components/Banner.jsx

import { Link } from "react-router";
import { motion } from "framer-motion";



const Banner = () => {
  return (
    <section
      className="relative h-[85vh] flex flex-col justify-center items-center text-center text-white overflow-hidden"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556761175-4b46a572b786?auto=format&fit=crop&w=1600&q=80')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-800/80 to-blue-700/80 backdrop-blur-sm"></div>

      <motion.div
        className="relative z-10 px-6"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Reliable Freelance Marketplace
        </h1>
        <p className="text-lg md:text-xl text-gray-100 mb-8 max-w-2xl mx-auto">
          Connect with trusted clients and freelancers. Post jobs, collaborate, and earn — all in one secure platform.
        </p>

        <div className="flex justify-center gap-4">
          <Link to="/add-job">
            <button className="bg-white text-indigo-700 font-semibold px-6 py-3 rounded-full hover:bg-gray-200 transition-all">
              Create a Job
            </button>
          </Link>
          <Link to="/jobs">
            <button className="border-2 border-white font-semibold px-6 py-3 rounded-full hover:bg-white hover:text-indigo-700 transition-all">
              Explore Jobs
            </button>
          </Link>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;
