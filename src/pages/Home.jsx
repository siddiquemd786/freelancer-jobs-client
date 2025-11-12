// src/pages/Home.jsx
import LatestJobs from "../component/LatestJobs";
import TopCategories from "../component/TopCategories";
import AboutPlatform from "../component/AboutPlatform";
import Banner from "../component/Banner";

const Home = () => {
  return (
    <>
      <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white ">


        <Banner />
      <LatestJobs />
      <TopCategories />
      <AboutPlatform />
      </div>

    </>
  );
};

export default Home;
