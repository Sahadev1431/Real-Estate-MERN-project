import React from "react";
import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";

export default function ListingItem({ listi }) {
  return (
    <div className="bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden rounded-lg w-full sm:w-[330px]">
      <Link to={`listing/${listi._id}`}>
        <img
          src={listi.imageUrls[0]}
          alt="listing cover"
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
        />
        <div className="p-3 flex flex-col gap-2 w-full">
          <p className="truncate text-lg font-semibold text-slate-700">
            {listi.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className="text-sm text-gray-600 truncate w-full">{listi.address}</p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">{listi.description}</p>
          <p className="text-slate-500 mt-2 font-semibold">
            ₹
            {listi.offer ? listi.discountPrice.toLocaleString("en-IN") : listi.regularPrice.toLocaleString("en-IN")}
            {listi.type === 'rent' && ' / month'}
          </p>
          <div className="text-slate-700 flex gap-4">
            <div className="font-bold text-xs">
                {listi.bedrooms > 1 ? `${listi.bedrooms} beds` : `${listi.bedrooms} bed`}
            </div>
            <div className="font-bold text-xs">
                {listi.bathrooms > 1 ? `${listi.bathrooms} baths` : `${listi.bathrooms} bath`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
