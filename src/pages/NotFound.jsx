import React from 'react';
import { Link } from 'react-router'; 

const NotFound = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-green-100 p-4">
            <div className="text-center bg-white p-10 md:p-16 rounded-2xl shadow-xl border border-green-200">
                <h1 className="text-9xl font-extrabold text-green-600 mb-4 animate-bounce">
                    404
                </h1>
                <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-md mx-auto">
                    Oops! The page you're looking for doesn't exist.
                    It might have been moved or deleted.
                </p>
                <Link
                    to="/" // Redirects to the homepage
                    className="inline-flex items-center px-8 py-4 bg-green-600 text-white font-semibold rounded-lg shadow-md hover:bg-green-700 transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                    >
                        <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                    </svg>
                    Go to Homepage
                </Link>
            </div>
        </div>
    );
};

export default NotFound;