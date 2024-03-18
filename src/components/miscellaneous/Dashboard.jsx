import { useEffect, useState } from "react";
import AppBar from "./AppBar";
import axios from "axios";
import { UserState } from "../../context/UserProvider";

const Dashboard = () => {
  const [approvedCount, setApprovedCount] = useState(0);
  const [rejectedCount, setRejectedCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const { userInfo } = UserState();

  useEffect(() => {
    async function fetchReviews() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
          }
        }

        let ROUTE = '';
        if (userInfo.role === 'ADMIN') {
          ROUTE = "get-all-admin";
        } else {
          ROUTE = "get-all";
        }
        const { data } = await axios.get(`/api/v1/reviews/${ROUTE}`, config);
        if (data.success) {
          data.data.map((item) => {
            if (item.status === 'APPROVED') {
              setApprovedCount((prev) => prev+1);
            } else if (item.status === 'REJECTED') {
              setRejectedCount((prev) => prev+1);
            } else {
              setPendingCount((prev) => prev+1);
            }
          })
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviews();
  }, [])
  return (
    <div className="flex flex-col items-center">
      <AppBar />
      <p className="text-xl font-semibold mt-6">Your Review Updation History</p>
      <div className="mt-10 p-10 bg-white flex gap-5 rounded-xl shadow-xl">
        <div className="flex flex-col justify-center items-center gap-5 w-36 bg-green-300 shadow-xl py-4 rounded-lg">
          <p className="text-xl text-gray-800 font-semibold">Approved</p>
          <p className="text-lg font-semibold">{approvedCount}</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 w-36 bg-red-300 shadow-xl py-4 rounded-lg">
          <p className="text-xl text-gray-800 font-semibold">Rejected</p>
          <p className="text-lg font-semibold">{rejectedCount}</p>
        </div>
        <div className="flex flex-col justify-center items-center gap-5 w-36 bg-yellow-200 shadow-xl py-4 rounded-lg">
          <p className="text-xl text-gray-800 font-semibold">Pending</p>
          <p className="text-lg font-semibold">{pendingCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
