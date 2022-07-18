import Home from "./components/Home";
import Navigation from "./components/Navigation";
import PortfolioLinks from "./components/Links";

function App() {
  return (
    // <div>
    //   <h1 className="text-4xl font-signature">My Portfolio</h1>
    // </div>,
    <div>
      <Navigation />
      <Home />
      
      <PortfolioLinks />
    </div>
  );
}

export default App;
