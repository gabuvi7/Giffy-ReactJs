import React from "react";
import { Link } from "wouter";
import "./Category.css";

export default function Category({ name, options = [] }) {
  return (
    <div className="list-item">
      {options.map((singleOption) => (
        <li key={singleOption.id}>
          <Link className="Category-link" to={`/gif/${singleOption.slug}`}>
            {singleOption.title}
          </Link>
        </li>
      ))}
    </div>
  );
}
