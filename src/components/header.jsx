import { useState } from "react";

const Header = ({ currentPage, setCurrentPage }) => {
  const [isOpen, setIsOpen] = useState(false);

  const pages = [
    { key: "people", label: "Characters" },
    { key: "planets", label: "Planets" },
    { key: "vehicles", label: "Vehicles" },
  ];

  return (
    <header className="w-full py-8 px-4 bg-gradient-to-r from-black via-gray-900 to-black shadow-md border-b">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-5xl font-extrabold text-yellow-400 tracking-widest drop-shadow-[0_0_8px_rgba(255,255,0,0.6)]">
          Star Wars Galaxy
        </h1>
        <p className="text-md mt-2 text-blue-200 font-medium tracking-wide">
          Explore the characters of a galaxy far, far away...
        </p>

        <div className="relative inline-block text-left mt-6">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="inline-flex justify-center w-full rounded-md border border-yellow-300 shadow-sm px-4 py-2 bg-yellow-300 text-black font-medium hover:bg-yellow-400 transition"
          >
            {pages.find(p => p.key === currentPage)?.label || "Select"}
            <svg
              className="ml-2 -mr-1 h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 111.1 1.02l-4.25 4.65a.75.75 0 01-1.1 0L5.23 8.27a.75.75 0 01.02-1.06z"
                clipRule="evenodd"
              />
            </svg>
          </button>

          {isOpen && (
            <div className="absolute z-10 mt-2 w-48 rounded-md shadow-lg bg-white/90 ring-1 ring-black/5 backdrop-blur-md">
              <ul className="py-1">
                {pages.map((page) => (
                  <li key={page.key}>
                    <button
                      onClick={() => {
                        setCurrentPage(page.key);
                        setIsOpen(false);
                      }}
                      className={`block px-4 py-2 w-full text-left ${
                        currentPage === page.key
                          ? "bg-yellow-200 text-black font-semibold"
                          : "text-gray-800 hover:bg-yellow-100"
                      }`}
                    >
                      {page.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
