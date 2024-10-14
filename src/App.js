import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "./App.css";
import NotificationCreation from "./page/NotificationCreation";
import NotificationManagement from "./page/NotificationManagement";
import logo from "./image/SBPower_logo.jpeg";
import notice_create from "./image/notice_create.png";
import notice_management from "./image/notice_management.png";

import { LoadScript } from "@react-google-maps/api"; // LoadScriptをインポート

function App() {
  return (
    <Router>
      <div className="App">
        <LoadScript googleMapsApiKey="AIzaSyBHIEi6b0KfP6wHyCFsDbj7e_CWws9-n-c">
          <nav className="navbar">
            <ul>
              <img src={logo} alt="logo" className="logo" />
              <li>
                <img
                  src={notice_create}
                  alt="notice_create"
                  className="nav-icon"
                />
                <Link to="/create-notification">お知らせ作成</Link>
              </li>
              <li>
                <img
                  src={notice_management}
                  alt="notice_management"
                  className="nav-icon"
                />
                <Link to="/management-notification">お知らせ管理</Link>
              </li>
            </ul>
          </nav>

          <div className="content">
            <Routes>
              <Route
                path="/create-notification"
                element={<NotificationCreation />}
              />
              <Route
                path="/management-notification"
                element={<NotificationManagement />}
              />
            </Routes>
          </div>
        </LoadScript>
      </div>
    </Router>
  );
}

export default App;
