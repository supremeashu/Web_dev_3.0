import React, { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, Link } from "react-router-dom";
import { loginUser } from "../api/apiService";
import Header from "../components/Header";

const Login = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Validate input fields
  const validateForm = () => {
    if (!email || !password) {
      return "Email and password are required.";
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      return "Email is not valid.";
    }
    return null;
  };

  const handleLogin = async () => {
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    try {
      const userData = { email, password };
      const response = await loginUser(userData);
      login(response);
      navigate("/workshop");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div>
      <Header />
      <div className="flex justify-center items-center h-screen">
        <div className="flex flex-col md:flex-row max-w-4xl shadow-lg w-full md:w-4/5">
          <div
            className="md:w-1/2 w-full p-8 text-white flex items-center bg-opacity-50 rounded-t-lg md:rounded-l-lg md:rounded-t-none"
            style={{
              backgroundImage: 'url("/path-to-left-box-image.png")',
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          >
            <div>
              <h1 className="text-3xl font-bold mb-4">Welcome Page</h1>
              <p className="text-lg font-bold mb-3">
                Sign in to continue access to our amazing platform.
              </p>
            </div>
          </div>

          {/* Right side form */}
          <div className="w-full md:w-1/2 p-8 rounded-b-lg md:rounded-r-lg md:rounded-l-none">
            <h2 className="text-2xl font-bold mb-6">Sign in</h2>
            
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <input
                className="w-full p-4 mb-4 border border-gray-700 rounded-lg bg-transparent border-b border-gray-300 focus:outline-none"
                type="text"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input
                className="w-full p-4 mb-4 border border-gray-600 rounded-lg bg-transparent border-b border-gray-300 focus:outline-none"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="w-full bg-blue-500 text-white py-3 rounded"
                type="submit"
              >
                Sign in
              </button>
            </form>
            {error && <p className="mt-2 font-mono text-red-500 mb-4 text-sm">{error}</p>}
            {/* Forgot Password link */}
            <div className="mt-4 text-center">
              <Link
                to="/forgot-password"
                className="text-blue-500 hover:underline"
              >
                Forgot your password?
              </Link>
              <div className="mt-4 text-center"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
