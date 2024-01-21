import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ProductList = ({ accessToken }) => {
  const [categories, setCategories] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "https://api.kalpav.com/api/v1/product/category/retail",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        setCategories(response.data.response);
      } catch (error) {
        console.error("Error fetching categories", error);
      }
    };

    fetchCategories();
  }, [accessToken]);

  const filteredCategories = categories.filter((category) =>
    category.productCategory.productCategoryName
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">
        Product Categories{" "}
        <span className="ml-5  hover:bg-blue-200">
          <Link to="/about">About Page</Link>
        </span>
      </h2>

      <input
        className="w-full p-2 mb-4 border rounded"
        type="text"
        placeholder="Search categories"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredCategories.map((category) => (
          <div
            key={category.productCategory.productCategoryId}
            className="bg-white p-4 rounded-md shadow-md"
          >
            <img
              className="w-full h-40 object-cover mb-2 rounded-md"
              src={category.productCategory.productCategoryImage}
              alt={category.productCategory.productCategoryName}
            />
            <p className="text-lg font-semibold">
              {category.productCategory.productCategoryName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductList;
