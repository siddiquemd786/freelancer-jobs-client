// src/pages/Home.jsx

import LatestJobs from "../component/LatestJobs";
import TopCategories from "../component/TopCategories";
import AboutPlatform from "../component/AboutPlatform";
import Banner from "../component/Banner";

const Home = () => {
  return (
    <>
      <Banner></Banner>
      <LatestJobs />
      <TopCategories />
      <AboutPlatform />
    </>
  );
};

export default Home;
