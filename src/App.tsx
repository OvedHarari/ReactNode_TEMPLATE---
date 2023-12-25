import React, { createContext, useEffect, useState } from 'react';
// import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { getUserById } from './services/usersService';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Home from './components/Home';
import Register from './components/Register';
import UsersHome from './components/UsersHome';
import GoogleAuth from './components/GoogleAuth';

const theme = {
  light: "light",
  dark: "dark",
};
export let SiteTheme = createContext(theme.dark);

function App() {
  let [darkMode, setDarkMode] = useState<boolean>(
    JSON.parse(localStorage.getItem("darkMode")!)
  );
  let [userInfo, setUserInfo] = useState(
    JSON.parse(sessionStorage.getItem("userInfo") as string) == null
      ? { email: false }
      : JSON.parse(sessionStorage.getItem("userInfo") as string)
  );
  let [dataUpdated, setDataUpdated] = useState<boolean>(false);
  let render = () => setDataUpdated(!dataUpdated)
  let [userProfile, setUserProfile] = useState<any>({
    _id: 0,
    name: { firstName: "", middleName: "", lastName: "" },
    phone: "",
    email: "",
    password: "",
    image: { url: "", alt: "" },
    gender: "",
    role: "",
    address: { country: "", state: "", city: "", street: "", houseNumber: "", zipcode: "" },
    picture: "",
    isActive: ""
  })
  let [passwordShown, setPasswordShown] = useState(false);
  let togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  useEffect(() => {
    if (userInfo.userId) {
      getUserById(userInfo.userId)
        .then((res) => {
          setUserProfile(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [dataUpdated, userInfo]);

  return (
    <SiteTheme.Provider value={darkMode ? theme.dark : theme.light}>
      <ToastContainer theme={`${darkMode ? "dark" : "light"}`} />
      <div className={`App  ${darkMode && "dark"}`}>
        <Router>
          <Navbar
            userInfo={userInfo}
            setUserInfo={setUserInfo}
            setDarkMode={setDarkMode}
            darkMode={darkMode}
            userProfile={userProfile}
            setUserProfile={setUserProfile}
            render={render}
            passwordShown={passwordShown}
            togglePassword={togglePassword}
          />

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<UsersHome />} />
            <Route path="/google/success" element={<GoogleAuth setUserInfo={setUserInfo} />} />
            <Route path='login' element={<Login setUserInfo={setUserInfo} passwordShown={passwordShown} togglePassword={togglePassword} />} />
            <Route path='register' element={<Register setUserInfo={setUserInfo} passwordShown={passwordShown} togglePassword={togglePassword} />} />

          </Routes>

        </Router>
      </div>
    </SiteTheme.Provider>
  );
}

export default App;
