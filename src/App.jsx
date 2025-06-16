import { useEffect, useState, useRef, useCallback } from "react";
import PersonCard from "./components/personCard";
import Header from "./components/header";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState("people");
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  const fetchData = async (pageNumber, type) => {
    setIsLoading(true);
    try {
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
    } finally {
      setIsLoading(false);
    }
  };

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

  return (
    <div className="flex flex-col justify-center items-center m-3 p-3">
      <Header currentPage={currentPage} setCurrentPage={setCurrentPage} />

      {data.map((item, index) => {
        const isLast = index === data.length - 1;
        return (
          <PersonCard
            key={item.url}
            card={item}
            ref={isLast ? lastRef : null}
            currentPage={currentPage}
          />
        );
      })}

      {isLoading && page > 1 && <p>Loading more...</p>}
    </div>
  );
}

export default App;
