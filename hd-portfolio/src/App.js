import Navigation from "./components/Navigation";
import Home from "./components/Home";
import About from "./components/About";
import Portfolio from "./components/Portfolio";
// import Contact from "./components/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <div>
      <Navigation />
      <Home />
      <About />
      <Portfolio />
      {/* <Contact /> */}
      <Footer />
    </div>
  );
}

export default App;
