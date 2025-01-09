import { useEffect, useState } from 'react';
import { Route, Routes } from "react-router-dom";
import Discover from "./components/Discover.jsx";
import Register from "./components/Register.jsx";
import Authorization from "./components/Authorization.jsx";
import MyLibrary from "./components/MyLibrary.jsx";
import ProtectedProte from './components/ProtectedRote.jsx';

const App = () => {
  const [usersList, setUsersList] = useState(JSON.parse(localStorage.getItem("usersList")) || []);
  const [thisUser, setThisUser] = useState(JSON.parse(localStorage.getItem("thisUser")) || {});

  useEffect(() => {
    setUsersList(prev => {
      const users = prev.filter(curValue => curValue.email !== thisUser.email && Object.keys(curValue).length > 0);
      const curUsers = Object.keys(thisUser).length > 0 ? [...users, thisUser] : [...users]
      localStorage.setItem("usersList", JSON.stringify(curUsers));
      return curUsers;
    })

    localStorage.setItem("thisUser", JSON.stringify(thisUser));
  }, [thisUser])

  const pStyles = {
    width: "500%",
    height: "200%",
    fontSize: "25px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }

  return (
    <main>
      <Routes>
        <Route path="/" element={<Authorization usersList={usersList} setThisUser={setThisUser} />} />
        <Route path="/register" element={<Register useRegister={[usersList, setUsersList]} />} />
        <Route path="/discover" 
          element={
            <ProtectedProte thisUser={thisUser}>
              <Discover user={[thisUser, setThisUser]} pStyles={pStyles} />
            </ProtectedProte>} />
        <Route path="/mylibrary" 
          element={
            <ProtectedProte thisUser={thisUser}>
              <MyLibrary user={[thisUser, setThisUser]} pStyles={pStyles} />
            </ProtectedProte>} />
        <Route path="*" element={<h1 style={{gridArea: "5 / 3 / 7 / 5", textAlign: "center"}}>Page not found</h1>} />
      </Routes>
    </main>
  );
}

export default App;