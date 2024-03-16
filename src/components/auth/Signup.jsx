import { useState } from 'react';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("MEMBER");

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

    const handleSubmit = (e) => {
      e.preventDefault();
      // Handle form submission here
      alert('Submitted')
      console.log("Form submitted");
      console.log(email + "-" + name + "-" + password + "-" + role);
      setName("");
      setEmail("");
      setPassword("");
      setRole("MEMBER");
    };

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
          >
            Signup
          </button>
        </div>
      </form>
    </div>
  );
}

export default Signup;
