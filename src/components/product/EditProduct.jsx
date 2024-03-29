import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserState } from "../../context/UserProvider"
import AppBar from "../miscellaneous/AppBar";
import { useNavigate } from "react-router-dom";

const EditProduct = () => {
  const { id } = useParams(); // productId
  const [product, setProduct] = useState({});
  const [images, setImages] = useState([]);
  const [updatedFields, setUpdatedFields] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userInfo } = UserState();
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
          },
        };
        const { data } = await axios.get(`/api/v1/product/${id}`, config);
        setProduct(data.data);
      } catch (error) {
        console.log(error);
      }
    }
    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProduct({
      ...product,
      [name]: value
    });

    // Highlight the input field that has changed
    if (!updatedFields.includes(name)) {
      setUpdatedFields([...updatedFields, name]);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };


  const handleSubmit = async () => {
    try {
      setLoading(true);
      // check each fields is not empty
      const {productName, price, department, productDescription} = product;
      if (!productName || !price || !department || !productDescription) {
        alert("Input field can't be null!")
        return;
      }

      const payload = { ...product };
      payload.updatedFields = updatedFields;
      payload.productId = product._id;
      payload.author = userInfo._id;
      delete payload._id; // delete the _id, otherwise it will create error
      
      // Upload the images to Cloudinary
      if (images.length > 0) {
        payload.image.pop();  // remove the previous image
        const data = new FormData();
        for (let i = 0; i < images.length; i++) {
          data.append("file", images[i]);
          data.append("upload_preset", "product_management");
          data.append("cloud_name", "riyazsheikh");
          const response = await axios.post(
            "https://api.cloudinary.com/v1_1/riyazsheikh/image/upload",
            data
          );
          payload.image.push(response.data.secure_url);
        }
      }
           
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem('auth_token')}`
        }
      }
      
      // if the user is ADMIN, then directly update the product to Product model
      if (userInfo.role === 'ADMIN') {
        const { data } = await axios.patch(`/api/v1/product/update/${id}`, JSON.stringify(payload), config);
        console.log(data.data);
        alert("Successfuly updated the product");
      } else {
        const { data } = await axios.post("/api/v1/review/create", JSON.stringify(payload), config);
        console.log(data.data);
      }
      navigate("/products");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


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
    <span>Submit for review</span>
  );

  return (
    <div className="flex flex-col items-center  pb-20 w-screen min-h-screen">
      <AppBar />
      <div className="flex flex-col items-center mt-10 rounded-lg p-4 bg-blue-200 h-auto w-96 md:w-4/6 md:flex-row md:items-start md:p-10">
        <div className="image-container mb-4 md:mr-4">
          <img
            src={product.image && product.image.length > 0 ? product.image[0] : 'https://shorturl.at/cgktH'}
            alt="product_image"
            className="md:h-3/6 h-48 w-full border-4 rounded-lg border-gray-200"
          />
          <input
            type="file"
            accept="image/*"
            multiple
            className="mt-4 w-full"
            onChange={handleImageChange} 
          />
        </div>

        <div className="description w-full">
          <label htmlFor="productName" className="font-semibold text-gray-800">
            Product Name:
          </label>
          <input
            type="text"
            name="productName"
            value={product.productName || ""}
            className="w-full mb-2 md:my-4 px-4 py-2.5 rounded-md"
            onChange={handleInputChange}
          />
          <label htmlFor="price" className="font-semibold text-gray-800">
            Price:
          </label>
          <input
            type="text"
            name="price"
            value={product.price || ""}
            className="w-full mb-2 md:my-4 px-4 py-2.5 rounded-md"
            onChange={handleInputChange}
          />
          <label
            htmlFor="productDescription"
            className="font-semibold text-gray-800"
          >
            Description:
          </label>
          <input
            type="text"
            name="productDescription"
            value={product.productDescription || ""}
            className="w-full mb-2 md:my-4 px-4 py-2.5 rounded-md"
            onChange={handleInputChange}
          />
          <label htmlFor="department" className="font-semibold text-gray-800">
            Category:
          </label>
          <input
            type="text"
            name="department"
            value={product.department || ""}
            className="w-full mb-2 md:my-4 px-4 py-2.5 rounded-md"
            onChange={handleInputChange}
          />

          <div className="mt-2.5">
            {userInfo && userInfo.role === 'ADMIN' ? (
              <button
              onClick={handleSubmit}
              className="bg-green-600 hover:bg-green-800 text-white font-semibold px-4 py-2.5 rounded-lg w-full"
            >
              UPDATE
            </button>
            ) : (
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-800 text-white font-semibold px-4 py-2.5 rounded-lg w-full"
              disabled={loading}
            >
              {buttonContent}
            </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
