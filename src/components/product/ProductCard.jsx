import { useNavigate } from "react-router-dom";

const ProductCard = ({ item }) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col text-gray-700 bg-white shadow-md bg-clip-border rounded-xl m-6 w-96 min-h-4/6">

        {/* Image */}
      <div className="relative h-56 mx-4 mt-4 overflow-hidden text-white shadow-lg bg-clip-border rounded-xl bg-blue-gray-500 shadow-blue-gray-500/40">
        <img
          src={item.image[0]}
          alt="card-image"
        />
      </div>

        {/*Description  */}
      <div className="p-6">
        <h5 className="block mb-2 text-xl font-semibold text-gray-700">
          {item.productName}
        </h5>
        <p className="block text-base font-light overflow-hidden">
          {item.productDescription}.
        </p>
      </div>

        {/* Footer */}
      <div className="p-6 pt-0">
        <button
          className="align-middle font-bold text-center uppercase disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none"
          onClick={() => navigate(`/product/${item._id}`)}
        >
          Edit Product
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
