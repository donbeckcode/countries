import { Header } from "../../components/Header/Header";
import { Results } from "../../components/Results/Results";

import "./Home.css";

export const Home = () => {
  return (
    <div className="homeWrapper">
      <Header />
      <Results />
    </div>
  );
};
