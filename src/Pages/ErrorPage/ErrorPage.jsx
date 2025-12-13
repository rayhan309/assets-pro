import React from "react";
import { Link } from "react-router";

const ErrorPage = () => {
  return (
    <div className="min-h-screen flex flex-col gap-10 justify-center items-center">
      {/* <!-- From Uiverse.io by DipeshPun91 -->  */}
      <div className="card">
        <p className="error-message">Page Not Found</p>
        <div className="error-title">
          <div className="error-item">
            <span aria-hidden="true">4O4</span>
            <span aria-hidden="true" className="error-glitch">
              4O4
            </span>
            <span
              aria-hidden="true"
              className="error-glitch error-glitch--secondary"
            >
              4O4
            </span>
          </div>
          <div className="error-item">
            <span aria-hidden="true">Error</span>
            <span aria-hidden="true" className="error-glitch">
              Error
            </span>
            <span
              aria-hidden="true"
              className="error-glitch error-glitch--secondary"
            >
              Error
            </span>
          </div>
        </div>
        <div className="error-description">
          The requested page could not be found
        </div>
      </div>

      {/* battuo back */}
      <Link
        to={'/'}
        className="bg-[#05062d] text-[#393aa6] text-center w-40 rounded-2xl h-12 relative text-xl font-semibold group"
        type="button"
      >
        <div className="bg-[#6a00eb26] rounded-xl h-10 w-1/4 flex items-center justify-center absolute left-1 top-[4px] group-hover:w-[150px] z-10 duration-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1024 1024"
            height="25px"
            width="25px"
          >
            <path
              d="M224 480h640a32 32 0 1 1 0 64H224a32 32 0 0 1 0-64z"
              fill="#000000"
            ></path>
            <path
              d="m237.248 512 265.408 265.344a32 32 0 0 1-45.312 45.312l-288-288a32 32 0 0 1 0-45.312l288-288a32 32 0 1 1 45.312 45.312L237.248 512z"
              fill="#000000"
            ></path>
          </svg>
        </div>
        <p className="translate-x-2">Go Back</p>
      </Link>
    </div>
  );
};

export default ErrorPage;
