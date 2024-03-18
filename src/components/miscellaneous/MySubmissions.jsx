import { useEffect, useState } from 'react'
import AppBar from './AppBar';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const MySubmissions = () => {
    const [submissions, setSubmissions] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchReviews() {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
                    }
                }
                const { data } = await axios.get("/api/v1/reviews/get-all", config);
                setSubmissions(data.data);
            } catch (error) {
                console.log(error);
            }
        }
        fetchReviews();
    }, []);

  return (
    <div className="max-w-screen h-screen flex flex-col items-center">
      <AppBar />
      {submissions.length > 0 ? (
        submissions.map((item) => <SubmissionList key={item._id} item={item} />)
      ) : (
        <div className="p-16 text-red-700 flex flex-col items-center">
          <p>You don&apos;t have any submissions!</p>
          <p>for making submissions visit <a className="text-blue-800 underline cursor-pointer" onClick={() => navigate("/products")}>Products page </a>
          </p>
        </div>
      )}
    </div>
  );
}

export default MySubmissions;


function SubmissionList({ item }) {
    const [statusButtonColor, setStatusButtonColor] = useState('text-yellow-700');

    useEffect(() => {
        if (item.status === 'APPROVED') {
            setStatusButtonColor("text-green-600");
        } else if (item.status === 'REJECTED') {
            setStatusButtonColor("text-red-700");
        }
    }, [item.status]);

    return (
      <div className="w-96 bg-white flex items-center justify-between my-6 rounded-lg p-2">
        <div className="w-48 rounded-lg mr-2">
          <img src={item.image[0] || "https://shorturl.at/aflrM"} alt="image" className="h-full p-2 rounded-sm" />
        </div>

        <div className="w-4/6 text-sm flex flex-col gap-1">
          <p>{item.productName}</p>
          <p>₹ {item.price}</p>
          <p>{item.department}</p>
        </div>
        <div className={`${statusButtonColor} text-sm font-semibold bg-gray-200 p-1 px-2 rounded-lg`}>
        {item.status}
        </div>
      </div>
    );
}
