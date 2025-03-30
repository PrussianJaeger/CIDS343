import Header from "./Header";
import DbDisplay from "./DbDisplay";
import BackendDisplay from "./BackendDisplay";
import Footer from "./Footer";
import Side from './Side';

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {

  return (
    <>
      <Header></Header>
      <Side></Side>
      <DbDisplay></DbDisplay>
      <BackendDisplay></BackendDisplay>
      <Footer></Footer>
    </>
  );
}

export default App;