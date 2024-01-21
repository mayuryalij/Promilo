import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./components/Login.jsx";
import ProductList from "./components/ProductList.jsx";
import About from "./components/About.jsx";

const App = () => {
  const [accessToken, setAccessToken] = React.useState(null);

  const handleLogin = (token) => {
    setAccessToken(token);
  };

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-400 p-4">
      <div className="container mx-auto flex items-center justify-between">
        <img
          src="http://www.hindigraphics.in/wp-content/uploads/2019/01/pro.png"
          alt="Website Logo"
          className="h-16 w-auto object-contain bg-orange-500 rounded-md"
        />
       
      </div>
    </header>

        <div className="container mx-auto mt-4">
          <Routes>
            <Route
              path="/"
              element={
                accessToken ? (
                  <Navigate to="/products" />
                ) : (
                  <Login onLogin={handleLogin} />
                )
              }
            />

            <Route
              path="/products"
              element={
                accessToken ? (
                  <ProductList accessToken={accessToken} />
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;
