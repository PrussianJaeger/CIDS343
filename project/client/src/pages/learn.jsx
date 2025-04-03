import { HashRouter as Router, Routes, Route } from "react-router-dom";
import { SavingAndBudgeting } from "./Saving&Budgeting";
import { Link } from "react-router-dom";


export function Learn() {
    return (
       <>
       
       <h1>This is the Learning page</h1>
            <p>Here you can learn about various topics.</p>
            <p>Feel free to explore and learn at your own pace.</p>

            <h2>Topics:</h2>
            <ul>
                <li><a href="/Saving&Budgeting">Saving & Budgeting</a></li>
                <li><a href="/Investing">Investing</a></li>
                <li><a href="/Credit">Credit</a></li>
                <li><a href="/Debt">Debt</a></li>
            </ul>
            q
            
            <Routes>
                <Route path="/" element={<Learn />} />
                <Route path="/Saving&Budgeting" element={<SavingAndBudgeting />} />
            </Routes>
        


            

            
            
       
       
       
       </>
    );
}