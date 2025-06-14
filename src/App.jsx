import { useEffect, useState, useRef, useCallback } from "react";


import PersonCard from "./components/person-card/personCard";
import Header from "./components/header/header";
import ApiError from "./components/apiError";
import SkeletonCard from "./components/skeletonCard";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);
  const observer = useRef();

  const [currentPage, setCurrentPage] = useState(() => {
  return localStorage.getItem("currentPage") || "people";
});

  const fetchData = async (pageNumber, type) => {
  setIsLoading(true);
  setError(null);
  try {
    await new Promise(res => setTimeout(res, 500));
    const res = await fetch(`https://swapi-node.vercel.app/api/${type}?page=${pageNumber}`);
    const json = await res.json();
    const items = (json.results || []).map(p => p.fields);
    setData(prev => {
      const urls = new Set(prev.map(p => p.url));
      const filtered = items.filter(p => !urls.has(p.url));
      return [...prev, ...filtered];
    });
    setHasMore(!!json.next);
  } catch (err) {
    console.error("Error fetching:", err);
    setError("Failed to load. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  useEffect(() => {
  localStorage.setItem("currentPage", currentPage);
}, [currentPage]);

  useEffect(() => {
    fetchData(page, currentPage);
  }, [page, currentPage]);

  useEffect(() => {
    setData([]);
    setPage(1);
    setHasMore(true);
  }, [currentPage]);

  const lastRef = useCallback(node => {
    if (isLoading) return;
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        setPage(prev => prev + 1);
      }
    });
    if (node) observer.current.observe(node);
  }, [isLoading, hasMore]);

  const filteredData = data.filter(card =>
    card.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center m-6 px-4 space-y-6">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      {error && (
  <ApiError
   error={error}
   currentPage={currentPage}
   page={page} />
)}
      

      <div className="w-full flex flex-col items-center space-y-4">
        {filteredData.map((item, index) => {
          const isLast = index === data.length - 1;
          return (
            <PersonCard
              key={item.url}
              card={item}
              ref={isLast ? lastRef : null}
              currentPage={currentPage}
              searchTerm={searchTerm}
            />
          );
        })}
        {isLoading && data.length === 0 && (
  <>
    <SkeletonCard />
    <SkeletonCard />
    <SkeletonCard />
  </>)}
      </div>
    </div>
  );
}

export default App;
