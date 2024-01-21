import { useState } from "react";
import axios from "axios";
import CryptoJS from "crypto-js";

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleLogin = async () => {
    try {
      setEmailError("");
      setPasswordError("");

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        setEmailError("Invalid email format");
        return;
      }

      const passwordRegex =
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
      if (!passwordRegex.test(password)) {
        setPasswordError(
          "Password must contain at least 8 characters, one lowercase letter, one uppercase letter, one digit, and one special character."
        );
        return;
      }

      const hashedPassword = CryptoJS.SHA256(password).toString();

      const formData = new FormData();
      formData.append("username", email);
      formData.append("password", hashedPassword);
      formData.append("grant_type", "password");

      const response = await axios.post(
        "https://apiv2stg.promilo.com/user/oauth/token",
        formData,
        {
          headers: {
            Authorization: "Basic UHJvbWlsbzpxNCE1NkBaeSN4MiRHQg==",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      const accessToken = response.data.response.access_token;
      onLogin(accessToken);
    } catch (error) {
      console.error("Login failed", error);

      if (error.response && error.response.status === 401) {
        setEmailError("Invalid email or password");
      } else {
        console.log("Detailed error:", error.response);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Email:
            <input
              className={`shadow appearance-none border ${
                emailError ? "border-red-500" : "border-gray-200"
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setEmailError("");
              }}
            />
            {emailError && (
              <p className="text-red-500 text-xs italic">{emailError}</p>
            )}
          </label>
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2">
            Password:
            <input
              className={`shadow appearance-none border ${
                passwordError ? "border-red-500" : "border-gray-200"
              } rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline`}
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswordError("");
              }}
            />
            {passwordError && (
              <p className="text-red-500 text-xs italic">{passwordError}</p>
            )}
          </label>
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
