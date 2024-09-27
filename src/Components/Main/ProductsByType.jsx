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

  if (loading) return <div className="text-center mt-10">Loading...</div>;
  if (error) return <div className="text-center text-red-500 mt-10">{error}</div>;

  return (
    <div className="h-full min-h-screen bg-gray-50 py-10">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-10">
          {type.charAt(0).toUpperCase() + type.slice(1)} Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={product.image || "https://via.placeholder.com/150"} // Placeholder if no image available
                alt={product.name}
                className="w-full h-80 object-cover mb-4 rounded-md"
              />
              <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
              <p className="text-gray-600 mb-4">{product.description}</p>
              
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductsByType;
