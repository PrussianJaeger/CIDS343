import './App.css';
import { useState } from 'react';
import { HashRouter as Router, Routes, Route  } from 'react-router-dom';
import { Account } from './pages/Account';
import { Home } from './pages/home';
import { Learn } from './pages/learn';
import { Settings } from './pages/Settings';
import { Layout } from './Layout';



function App() {

  return (

    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home/>}/>
          <Route path="/Account" element={<Account/>}/>
          <Route path="/learn/*" element={<Learn/>}/>
          <Route path="/Settings" element={<Settings/>}/>
        </Route>
        
      </Routes>
    </Router>

  )
}

export default App;