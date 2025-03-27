import ListGroup from './Components/ListGroup';
import Header from "./Header";
import DbDisplay from "./DbDisplay";
import BackendDisplay from "./BackendDisplay";
import Footer from "./Footer";
import Side from './Side';

function App() {

  return <>
    <ListGroup />
    <DbDisplay></DbDisplay>
    <BackendDisplay></BackendDisplay>
    <Footer></Footer>

  </>

}

export default App;