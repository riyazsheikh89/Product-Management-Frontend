import { useEffect, useState } from 'react';
import axios from "axios";
import ProductCard from './ProductCard';
import AppBar from '../miscellaneous/AppBar';

const ProductList = () => {
    const [products, setProduct] = useState([]);
    const [pageCount, setPageCount] = useState(1);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                    }
                }
                const { data } = await axios.get(`/api/v1/get-products?page=${pageCount}`, config);
                const newProducts = [...products, ...data.data];
                setProduct(newProducts);
            } catch (error) {
                console.log(error);
            }
        }
        fetchProducts();
    }, [pageCount]);

  return (
    <div className="max-w-screen h-auto justify-center flex flex-col items-center">
      <AppBar />
      <div className="flex justify-center flex-wrap">
        {products.map((item) => (
          <ProductCard item={item} key={item._id} />
        ))}
      </div>
      <div className="py-10">
        <button
          className="bg-green-700 hover:bg-green-8009 text-white font-semibold py-4 px-6 rounded-lg"
          onClick={() => setPageCount((prev) => prev + 1)}
        >
          Load more products ...
        </button>
      </div>
    </div>
  );
}

export default ProductList;
