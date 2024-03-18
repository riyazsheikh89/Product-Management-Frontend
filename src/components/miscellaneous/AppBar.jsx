import { useNavigate } from "react-router-dom";
import { UserState } from "../../context/UserProvider";

const AppBar = () => {
    const navigate = useNavigate();
    const { userInfo } = UserState();


  return (
    <nav className="w-full flex justify-around h-14 bg-slate-300">
      <div className="w-4/12"></div>
      <div className="w-full flex items-center justify-evenly h-14 font-semibold md:justify-end md:gap-10 md:pr-6">
        <p
          className="hover:text-blue-700 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          Dashboard
        </p>
        {userInfo && userInfo.role === 'ADMIN' ? null : (
        <p
          className="hover:text-blue-700 hover:cursor-pointer"
          onClick={() => navigate("/")}
        >
          Submission
        </p>)
        }
        {userInfo && userInfo.role === 'ADMIN' ? (
        <p
          className="hover:text-blue-700 hover:cursor-pointer"
          onClick={() => navigate("/pending-requests")}
        >
          Pending Request
        </p>) : null
        }

        {/* If the user is logged in, show logout button */}
        {userInfo && userInfo.name ? (
            <button 
            type="button" 
            className="text-white bg-red-600 hover:bg-red-800  font-medium rounded-md  px-5 py-1.5"
            onClick={() => {
                localStorage.removeItem('auth_token');
                navigate("/");
            }}
            >
            Logout
            </button>
        ) : null}
      </div>
    </nav>
  );
};

export default AppBar;
