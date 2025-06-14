import { useEffect, useState, useRef, useCallback } from "react";
import PersonCard from "./components/personCard";

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const observer = useRef();

  const fetchData = async (pageNumber) => {
    setIsLoading(true);
    try {
      const res = await fetch(`https://swapi-node.vercel.app/api/people?page=${pageNumber}`);
      const json = await res.json();
      const person = (json.results || []).map(p => p.fields);
      setData(prev => {
      const URLs = new Set(prev.map(p => p.url));
      const filtered = person.filter(p => !URLs.has(p.url));
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
    fetchData(page);
  }, [page]);

  const lastPersonRef = useCallback(node => {
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
  <div>
    <h2>Star Wars Characters</h2>

      {data.map((person, index) => {
        const isLast = index === data.length - 1;

        return (
          <PersonCard
            key={person.url}
            person={person}
            ref={isLast ? lastPersonRef : null}
          />
        );
      })}
    {isLoading && page > 1 && <p>Loading more...</p>}
  </div>
);
}

export default App;
