import React from "react";
import { Link } from "wouter";
import "./Category.css";

export default function Category({ name, options = [] }) {
  return (
    <div className="list-item">
      {options.map((singleOption) => (
        <Link
          key={singleOption.id}
          className="Category-link"
          to={`/gif/${singleOption.slug}`}
        >
          <li>{singleOption.title}</li>
        </Link>
      ))}
    </div>
  );
}
