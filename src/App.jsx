import Header from "./components/Header";
import Hero from "./components/Hero";
import Introduction from "./sections/Introduction";
import Projects from "./sections/Projects";
import Expertise from "./sections/Expertise";
import Contact from "./sections/Contact";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Header />

      <main>
        <Hero />
        <Introduction />
        <Projects />
        <Expertise />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;
