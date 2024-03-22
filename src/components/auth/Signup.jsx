import { useNavigate } from "react-router-dom";
import { useState } from 'react';
import axios from "axios";

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("MEMBER");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleEmailChange = (e) => {
      setEmail(e.target.value);
    };

    const handleNameChange = (e) => {
      setName(e.target.value);
    };

    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    };

    const handleUserTypeChange = (e) => {
      setRole(e.target.value);
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        setLoading(true);
        const response = validateInputData();
        if (response != "VALID_INPUT") {
          setErr(response);
          alert(response);
          return;
        }

        const config = {
          headers: {"Content-Type": "application/json"}
        }
        const { data } = await axios.post("/api/v1/signup",
          { name, email, password, role },
          config
        );
        if (data.success) {
          alert("Successfuly created your account");
        }
        navigate("/");  //login page
      } catch (error) {
        console.log(error);
        if (error.response.status === 403) {
          alert(error.response.data);
        }
      } finally {
        setName("");
        setEmail("");
        setPassword("");
        setRole("MEMBER");
        setLoading(false);
      }
    };

    function validateInputData() {
      if (!name || !email || !password) {
          return "All fields are mandatory!"
      }
  
      // Regular expression for email & password validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  
      if (!emailRegex.test(email)) {
          return "Enter a valid email address!";
      }
      if (!passwordRegex.test(password)) {
          return "Password must be at least 8 characters long and should contain at least 1 uppercase, 1 lowercase, 1 digit, and 1 special character";
      }
  
      // if everything is okay, return success
      return "VALID_INPUT";
  }

  const buttonContent = loading ? (
    <div className="loader flex justify-center">
      <svg
        width="22"
        height="22"
        fill="currentColor"
        className="mr-2 animate-spin"
        viewBox="0 0 1792 1792"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M526 1394q0 53-37.5 90.5t-90.5 37.5q-52 0-90-38t-38-90q0-53 37.5-90.5t90.5-37.5 90.5 37.5 37.5 90.5zm498 206q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-704-704q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm1202 498q0 52-38 90t-90 38q-53 0-90.5-37.5t-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-964-996q0 66-47 113t-113 47-113-47-47-113 47-113 113-47 113 47 47 113zm1170 498q0 53-37.5 90.5t-90.5 37.5-90.5-37.5-37.5-90.5 37.5-90.5 90.5-37.5 90.5 37.5 37.5 90.5zm-640-704q0 80-56 136t-136 56-136-56-56-136 56-136 136-56 136 56 56 136zm530 206q0 93-66 158.5t-158 65.5q-93 0-158.5-65.5t-65.5-158.5q0-92 65.5-158t158.5-66q92 0 158 66t66 158z"></path>
      </svg>
      Loading...
    </div>
  ) : (
    <span>Sign up</span>
  );

  return (
    <div className="signup-container w-screen h-screen  flex items-center justify-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-5 w-3/6 sm:w-96 min-h-4/6 rounded-lg shadow dark:border"
      >
        <div className="text-center text-xl text-blue-600 font-semibold pb-2">
          Create an account
        </div>

        <div className="flex flex-col mb-3">
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Name:
            </label>
            <input
              id="name"
              name="name"
              type="text"
              autoComplete="name"
              required
              value={name}
              onChange={handleNameChange}
              className="bg-gray-50 border border-gray-400 text-sm text-gray-900 rounded-lg w-full p-3"
              placeholder="Spider Man"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
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
              placeholder="spiderman@gmail.com"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
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

        {/* Radio button for userRole */}
        <div>
          <span className="block text-gray-800 font-semibold">User Role:</span>
          <div className="mt-2 flex">
            <div className="flex justify-center items-center mr-10">
              <input
                type="radio"
                value="MEMBER"
                checked={role === "MEMBER"}
                onChange={handleUserTypeChange}
                className="w-4 h-4"
              />
              <label
                htmlFor="user"
                className="ml-2 block text-sm text-gray-900"
              >
                User
              </label>
            </div>
            <div className="flex justify-center items-center">
              <input
                type="radio"
                value="ADMIN"
                checked={role === "ADMIN"}
                onChange={handleUserTypeChange}
                className="w-4 h-4"
              />
              <label
                htmlFor="admin"
                className="ml-2 block text-sm text-gray-900"
              >
                Admin
              </label>
            </div>
          </div>
        </div>

        {/* Submit button */}
        <div className="py-5">
          <button
            type="submit"
            className="w-full text-white bg-sky-600 hover:bg-sky-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            disabled={loading}
          >
            {buttonContent}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
