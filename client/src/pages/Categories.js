import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import useCategory from "../hooks/useCategory";
import Layout from "../components/Layout/Layout";

const Categories = () => {
  const categories = useCategory();

  return (
    <Layout title={"All Categories"}>
      <div className="container-fluid p-5">
        <h1 className="text-center mb-5">All Categories</h1>
        <div className="row justify-content-center">
          {categories.map((c) => (
            <div
              className="col-md-4 col-sm-6 col-xs-12 mb-4"
              key={c._id}
            >
              <Link
                to={`/category/${c.slug}`}
                className="btn btn-primary btn-block"
              >
                {c.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;