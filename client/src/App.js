import React from 'react';
import {Routes,Route,Link} from "react-router-dom";

import './App.css';

// Pages
import MainPage from './Pages/MainPage';
import WritingPage from './Pages/WritingPage';
import StorePage from './Pages/StorePage';
import AccountPage from './Pages/AccountPage';
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import ServerRequestManager from './RequestServer/ServerRequestManager';

function App() {

  ServerRequestManager.InitRegisterNFTProducts();

  return (
    <div className="App">
      <Routes>
          <Route path="/" element={<MainPage></MainPage>}></Route>
          <Route exact path="/writing" element={<WritingPage/>}></Route>
          <Route exact path="/store" element={<StorePage/>}></Route>
          <Route exact path="/account" element={<AccountPage/>}></Route>
          <Route exact path="/login" element={<LoginPage/>}></Route>
          <Route exact path="/signup" element={<SignupPage/>}></Route>
      </Routes>
    </div>
  );
}

export default App;
