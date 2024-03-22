import axios from 'axios';
import { useEffect, useState } from 'react'
import AppBar from '../miscellaneous/AppBar';
import { useNavigate } from 'react-router-dom';

const PendingList = () => {
    const [pendingList, setPendingList] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchPendingReviews() {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                    }
                }
                const { data } = await axios.get("/api/v1/review/pending-list", config);
                setPendingList(data.data);
            } catch (error) {
                console.log(error);
            }
        }

        fetchPendingReviews();
    }, []);
  return (
    <div className='pb-10'>
      <AppBar />
      {pendingList && pendingList.length > 0 ? (
        pendingList.map((item) => (
        <PendingReviewCard item={item} key={item._id} setPendingList={setPendingList}/>
        ))
        ) : (
          <div className='font-bold flex justify-center mt-10'>
            No pending request! Go back to &nbsp; <p 
            className='text-blue-600 underline cursor-pointer'
            onClick={() => navigate("/products")}
            >Products Page</p>
          </div>
        )
      }
    </div>
  )
}



function PendingReviewCard({ item, setPendingList }) {
    const [ highlighted ] = useState(item.updatedFields);

    const handleSubmit = async(status, id) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                }
            }
            const { data } = await axios.patch(`/api/v1/review/update/${item._id}`,JSON.stringify({status: status}), config);
            setPendingList((prevState) => prevState.filter(item => item._id !== id));

            if (data.success && status !== 'REJECTED') {
              delete data.data._id;
              const response = await axios.patch(`/api/v1/product/update/${data.data.productId}`, JSON.stringify(data.data), config);
              console.log(response.data.data);
            }
            
        } catch (error) {
            console.log(error);
        }
    }
    console.log(item);

    return (
      <div className="w-screen h-auto flex justify-center">
        <div className="w-96 md:w-1/2 rounded-lg bg-white p-6 mt-10">
          
          <div className="w-full h-40 flex justify-center">
            <img
              src={item.image[0]}
              alt=""
              className="h-40"
            />
          </div>

          <div className="mt-6 p-4 rounded-xl bg-slate-200 flex flex-col gap-3">
            <div className={`${highlighted.includes("productName") ? 'bg-yellow-300' : null}`}>
              <p className="font-semibold">Product Name:</p>
              <p>{item.productName}</p>
            </div>
            <div className={`${highlighted.includes("price") ? 'bg-yellow-300' : null}`}>
              <p className="font-semibold">Price:</p>
              <p>{item.price}</p>
            </div>
            <div className={`${highlighted.includes("department") ? 'bg-yellow-300' : null}`}>
              <p className="font-semibold">Category:</p>
              <p>{item.department}</p>
            </div>
            <div className={`${highlighted.includes("productDescription") ? 'bg-yellow-300' : null}`}>
              <p className="font-semibold">Description:</p>
              <p>{item.productDescription}</p>
            </div>
          </div>

          <div className="pt-6 pb-4 w-full flex justify-between">
            <button 
            className="text-white font-medium bg-red-500 hover:bg-red-900 rounded-lg px-12 py-2.5"
            onClick={() => handleSubmit("REJECTED", item._id)}
            >Reject</button>

            <button 
            className="text-white font-medium bg-green-600 hover:bg-green-800 rounded-lg px-10 py-2.5"
            onClick={() => handleSubmit("APPROVED")}
            >Approve</button>
          </div>
          
        </div>
      </div>
    );
}

export default PendingList;
