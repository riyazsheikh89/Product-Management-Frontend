import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [token] = useState(localStorage.getItem("auth_token"));
  const [loading, setLoading] = useState(true); // Loading state
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    role: "",
    _id: ""
  });

  useEffect(() => {
    async function fetchUserDetails() {
      try {
        if (!token) {
          setLoading(false);
          setUserInfo(null);
          return;
        }
        const config = {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${token}`
          }
        };
        const { data } = await axios.get("api/v1/me", config);

        setUserInfo((prevUserInfo) => ({
          ...prevUserInfo,
          role: data.data.role,
          name: data.data.name,
          email: data.data.email,
          _id: data.data._id
        }));
      } catch (error) {
        console.error("Error fetching user details:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUserDetails();
  }, []); // Include dependency

  return (
    <UserContext.Provider value={{ userInfo, setUserInfo }}>
      {loading ? <p className="text-center">Loading...</p> : children}
    </UserContext.Provider>
  );
};

export const UserState = () => {
  return useContext(UserContext);
}