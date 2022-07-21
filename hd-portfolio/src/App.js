import Navigation from "./components/Navigation";
import Home from "./components/Home";
import AboutMe from "./components/About";
import Portfolio from "./components/Portfolio";
// import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navigation />
      <Home />
      <AboutMe/>
      <Portfolio />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}

export default App;
