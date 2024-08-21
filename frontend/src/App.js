
    import { BrowserRouter, Route, Routes } from "react-router-dom";
    import "./App.css";
    import AppNavBar from "./components/AppNavBar";
    import Login from "./pages/Login";
    import Register from "./pages/Register";
    import Home from "./pages/Home";
    import { ToastContainer } from "react-toastify";
    import "react-toastify/dist/ReactToastify.css";
    import Profile from "./pages/Profile";
    import { useState } from "react";
    import Shorturl from "./pages/Shorturl";
    import Admin from "./pages/Admin";

    const App = () => {
      const [isLoggedIn, setIsLoggedIn] = useState(false);
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");

      return (
        <div className="md:h-screen bg-purple-100">
          <BrowserRouter>
            <ToastContainer />
            <AppNavBar
              isLoggedIn={isLoggedIn}
              setIsLoggedIn={setIsLoggedIn}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
            />
            <div>
              <Routes>
                <Route path="/" exact
                  element={
                    <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                  }
                />
                <Route path="register" exact
                  element={
                    <Register
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      setName={setName}
                      setEmail={setEmail}
                    />
                  }
                />
                <Route path="login" exact
                  element={
                    <Login
                      isLoggedIn={isLoggedIn}
                      setIsLoggedIn={setIsLoggedIn}
                      setName={setName}
                      setEmail={setEmail}
                    />
                  }
                />
                <Route path="profile" exact
                  element={
                          <Profile
            isLoggedIn={isLoggedIn}
            setIsLoggedIn={setIsLoggedIn}
            name={name}
            setName={setName}
            email={email}
            setEmail={setEmail}
          />
                  }
                />
                                <Route path="Shorturl" exact
                  element={
<Shorturl isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
                  }
                />
                                <Route path="admin" exact
                  element={<Admin />}

                />
              </Routes>
            </div>
          </BrowserRouter>
        </div>
      );
    };

    export default App;