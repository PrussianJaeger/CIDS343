import { HashRouter as Router, Routes, Route, Link } from "react-router-dom";
import { SavingAndBudgeting } from "./SavingAndBudgeting";
import { Investing } from "./investing";



export function Learn() {
    return (
       <>
       
         <h1>This is the Learning page</h1>
            <p>Here you can learn about various topics.</p>
            <p>Feel free to explore and learn at your own pace.</p>

            <h2>Topics:</h2>
            <ul>
                <li><Link to="saving-and-budgeting">Saving & Budgeting</Link></li>
                <li><Link to="investing">Investing</Link></li>
            </ul>
  

            {/* Nested Routes */}
            <Routes>
                <Route path="saving-and-budgeting" element={<SavingAndBudgeting />} />
                <Route path="investing" element={<Investing />} />
            </Routes>
            
       </>
    );
}