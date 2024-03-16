import { useEffect, useState } from 'react';
import axios from "axios";
import ProductCard from './ProductCard';

const ProductList = () => {
    const [products, setProduct] = useState([]);

    useEffect(() => {
        async function fetchProducts() {
            try {
                const config = {
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${localStorage.getItem("auth_token")}`
                    }
                }
                const { data } = await axios.get("/api/v1/get-products?page=1", config);
                setProduct(data.data);
            } catch (error) {
                //something
            }
        }

        fetchProducts();
    }, []);

  return (
    <div className='max-w-screen h-auto justify-center flex flex-wrap'>
      {products.map((item) => (
        <ProductCard item={item} key={item._id}/>
      ))}
    </div>
  )
}

export default ProductList;
