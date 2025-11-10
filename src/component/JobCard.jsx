// src/component/JobCard.jsx
import React from 'react';

const JobCard = ({job}) => {
    const {coverImage,title,category,description,price}=job
    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition">
      <img
        src={coverImage}
        alt={title}
        className="h-48 w-full object-cover"
      />

      <div className="p-4">
        <h2 className="text-xl font-semibold text-indigo-700">{title}</h2>
        <p className="text-gray-500 text-sm mb-2">{category}</p>
        <p className="text-gray-700 text-sm mb-3 line-clamp-2">{description}</p>
        <p className="text-indigo-600 font-bold">${price}</p>
      </div>
    </div>
    );
};

export default JobCard;