
const Header = ({ currentPage, setCurrentPage }) => (
  <header className="w-full py-8 px-4 bg-gradient-to-r from-black via-gray-900 to-black shadow-md border-b">
  <div className="max-w-4xl mx-auto text-center">
    <h1 className="text-5xl font-extrabold text-yellow-400 tracking-widest drop-shadow-[0_0_8px_rgba(255,255,0,0.6)]">
      Star Wars Galaxy
    </h1>
    <p className="text-md mt-2 text-blue-200 font-medium tracking-wide">
      Explore the characters of a galaxy far, far away...
    </p>
    <div className="mt-4 space-x-4">
      <button
        onClick={() => setCurrentPage("people")}
        className={`px-4 py-2 rounded ${currentPage === "people" ? "bg-yellow-300 text-black" : "bg-white/10 text-yellow-100"}`}
      >
        Characters
      </button>
      <button
        onClick={() => setCurrentPage("planets")}
        className={`px-4 py-2 rounded ${currentPage === "planets" ? "bg-yellow-300 text-black" : "bg-white/10 text-yellow-100"}`}
      >
        Planets
      </button>
       <button
        onClick={() => setCurrentPage("vehicles")}
        className={`px-4 py-2 rounded ${currentPage === "vehicles" ? "bg-yellow-300 text-black" : "bg-white/10 text-yellow-100"}`}
      >
        Vehicles
      </button>
    </div>
    </div>
  </header>
);

export default Header;

