import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchProductsByType } from "../../Services/Api"; // Adjust the import according to your structure

const ProductsByType = () => {
  const { type } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const data = await fetchProductsByType(type);
        setProducts(data);
      } catch (err) {
        setError("Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    getProducts();
  }, [type]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="h-full min-h-screen">
      <h2 className="text-3xl font-bold">
        {type.charAt(0).toUpperCase() + type.slice(1)} Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        {products.map((product) => (
          <div
            key={product._id}
            className="bg-gray-300 p-4 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold">{product.name}</h3>
            <p>{product.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsByType;
