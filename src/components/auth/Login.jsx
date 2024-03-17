import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {UserState} from "../../context/UserProvider";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { setUserInfo } = UserState();
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const config = { headers: { "Content-type": "Application/json" } }

        const response = await axios.post("/api/v1/login", {email, password}, config);
        if (response.data.success) {
            config.headers.Authorization = `Bearer ${response.data.data}`;
            localStorage.setItem("auth_token", response.data.data);

            const { data } = await axios.get("/api/v1/me", config);
            setUserInfo((prevUserInfo) => ({
                ...prevUserInfo,
                role: data.data.role,
                name: data.data.name,
                email: data.data.email,
                _id: data.data._id
            }));
            navigate("/products");
        }
        
      } catch (error) {
        console.log("error: ");
        if (error.response) {
            alert(error.response.data.err);
        }
        console.log(error);
      } finally {
        setEmail("");
        setPassword("");
        // setLoding(false);
      }
    };

  return (
    <div className="signup-container w-screen h-screen  flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white px-5 p-7 w-3/6 sm:w-96 min-h-4/6 rounded-lg shadow dark:border"
      >
        <div className="text-center text-2xl text-blue-600 font-semibold pb-2">
          Login
        </div>

        <div className="flex flex-col my-3">
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 font-medium text-gray-900"
            >
              Email:
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={handleEmailChange}
              className="bg-gray-50 border border-gray-400 text-sm text-gray-900 rounded-lg w-full p-3"
              placeholder="company@example.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 font-medium text-gray-900"
            >
              Password:
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              required
              value={password}
              onChange={handlePasswordChange}
              className="bg-gray-50 border border-gray-400 text-sm text-gray-900 rounded-lg w-full p-3"
              placeholder="Enter your password"
            />
          </div>
        </div>

        {/* Submit button */}
        <div className="pb-5 pt-3">
          <button
            type="submit"
            className="w-full text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Login
          </button>
        </div>

        {/*  */}
        <span className="flex text-sm">
          Don&apos;t have an account? &nbsp;
          <p
            className="text-blue-700 font-semibold cursor-pointer"
            onClick={() => navigate("/signup")}
          >
            Signup
          </p>
        </span>
      </form>
    </div>
  );
}

export default Login;