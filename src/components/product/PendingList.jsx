import axios from 'axios';
import { useEffect, useState } from 'react'
import AppBar from '../miscellaneous/AppBar';

const PendingList = () => {
    const [pendingList, setPendingList] = useState([]);
    const [reload, setReload] = useState(false);

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
    }, [reload]);
  return (
    <div className='pb-10'>
      <AppBar />
      {pendingList && pendingList.length > 0 ? (
        pendingList.map((item) => (
        <PendingReviewCard item={item} key={item._id} setReload={setReload}/>
        ))
        ) : (
          <p className='font-semibold text-center pt-10'>No pending request...</p>
        )
      }
    </div>
  )
}



function PendingReviewCard({ item, setReload }) {

    const handleSubmit = async(status) => {
        try {
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                }
            }
            const { data } = await axios.patch(`/api/v1/review/update/${item._id}`,JSON.stringify({status: status}), config);

            if (data.success) {
              delete data.data._id;
              const response = await axios.patch(`/api/v1/product/update/${data.data.productId}`, JSON.stringify(data.data), config);
              console.log(response.data.data);
            }
            setReload(true);
        } catch (error) {
            console.log(error);
        }
    }

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
            <div>
              <p className="font-semibold">Product Name:</p>
              <p>{item.productName}</p>
            </div>
            <div>
              <p className="font-semibold">Price:</p>
              <p>{item.price}</p>
            </div>
            <div>
              <p className="font-semibold">Category:</p>
              <p>{item.department}</p>
            </div>
            <div>
              <p className="font-semibold">Description:</p>
              <p>{item.productDescription}</p>
            </div>
          </div>

          <div className="pt-6 pb-4 w-full flex justify-between">
            <button 
            className="text-white font-medium bg-red-500 hover:bg-red-900 rounded-lg px-12 py-2.5"
            onClick={() => handleSubmit("REJECTED")}
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
