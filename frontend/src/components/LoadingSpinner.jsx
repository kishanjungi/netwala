// src/components/LoadingSpinner.js
import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";

const LoadingSpinner = () => {
    const { loading } = useContext(ShopContext);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 bg-white bg-opacity-50 flex justify-center items-center z-50">
            <div className="border-8 border-blue-200 border-t-blue-500 rounded-full w-20 h-20 animate-spin"></div>
        </div>
    );
};

export default LoadingSpinner;
