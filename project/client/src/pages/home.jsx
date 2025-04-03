import { Link } from "react-router-dom";
import Header from "../Header";
import Footer from "../Footer";
import DbDisplay from "../DbDisplay";


export function Home() {
    return (
       <>
        <Header />
        <DbDisplay />
        <Footer />
       </>
    );
}