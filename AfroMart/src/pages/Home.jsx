import BestSeller from "../components/BestSeller";
import Hero from "../components/Hero";
import LatestCollections from "../components/LatestCollections";

function Home() {
  return (
    <div>
      <Hero />
      <LatestCollections />
      <BestSeller />
    </div>
  );
}

export default Home;
