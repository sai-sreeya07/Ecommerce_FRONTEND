import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "./ProductCard";
import { Pagination } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { findProducts } from "../../../state/Product/Action";

export default function Product() {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { products, loading, error } = useSelector((store) => store.products); // This part is correct now

  const searchParams = new URLSearchParams(location.search);
  const pageNumber = searchParams.get("page") || 1;

  const handlePaginationChange = (event, value) => {
    const newSearchParams = new URLSearchParams(location.search);
    newSearchParams.set('page', value);
    navigate({ search: `?${newSearchParams.toString()}` });
  };

  useEffect(() => {
    const reqData = {
      pageNumber: pageNumber - 1,
      pageSize: 10,
    };
    dispatch(findProducts(reqData));
  }, [dispatch, pageNumber]);

  return (
    <div className="bg-white p-4">
      <h1 className="text-4xl font-bold text-center py-6">All Products</h1>

      {loading ? (
        <div className="text-center py-10 text-lg">Loading products...</div>
      ) : error ? (
        <div className="text-center py-10 text-lg text-red-600">
          Error loading products: {error}
        </div>
      ) : (
        <div className="flex flex-wrap justify-center gap-6 py-5">
          {/* ----- FIX IS HERE ----- */}
          {products && Array.isArray(products) && products.length > 0 ? (
            products.map((item) => ( // Direct map over 'products'
              <ProductCard key={item.id} product={item} />
            ))
          ) : (
            <div className="text-center py-10 text-lg text-gray-500">
              No products found.
            </div>
          )}
        </div>
      )}

      {/* ----- POTENTIAL ISSUE HERE FOR PAGINATION ----- */}
      {/* If 'products' is just the array, it won't have 'totalPages' directly.
          You might need to adjust your reducer or action to store 'totalPages' separately,
          or get it from the API response and add it to the state.
          For now, this might break pagination. */}
      {products.totalPages > 1 && ( // This line will likely cause an error if products is just an array
        <section className="py-10 flex justify-center">
          <Pagination
            count={products.totalPages}
            color="secondary"
            page={parseInt(pageNumber)}
            onChange={handlePaginationChange}
          />
        </section>
      )}
    </div>
  );
}