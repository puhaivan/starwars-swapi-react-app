import { useEffect, useState, useRef, useCallback } from 'react';

import PersonCard from './components/person-card/personCard';
import Header from './components/header/header';
import ApiError from './components/apiError';
import SkeletonCard from './components/skeletonCard';

function App() {
  const [loadedData, setLoadedData] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const observerRef = useRef(null);

  const [currentPage, setCurrentPage] = useState(() => {
    return localStorage.getItem('currentPage') || 'people';
  });

  const fetchData = async (pageNumber, type) => {
    if (isLoading || !hasMore) return;
    setIsLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://swapi-node.vercel.app/api/${type}?page=${pageNumber}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();

      const items = (json.results || []).map((p) => p.fields ?? p);

      setLoadedData((prev) => {
        const urls = new Set(prev.map((p) => p.url));
        const filtered = items.filter((p) => !urls.has(p.url));
        return [...prev, ...filtered];
      });

      setHasMore(Boolean(json.next));
    } catch (err) {
      console.error('Error fetching:', err);
      setError('Failed to load. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData(page, currentPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, currentPage]);

  useEffect(() => {
    setLoadedData([]);
    setPage(1);
    setHasMore(true);
    localStorage.setItem('currentPage', currentPage);
  }, [currentPage]);

  const lastRef = useCallback(
    (node) => {
      if (observerRef.current) observerRef.current.disconnect();

      observerRef.current = new IntersectionObserver(
        (entries) => {
          const first = entries[0];
          if (first.isIntersecting && hasMore && !isLoading) {
            setPage((prev) => prev + 1);
          }
        },
        {
          root: null,
          rootMargin: '400px 0px',
          threshold: 0,
        }
      );

      if (node) observerRef.current.observe(node);
    },
    [hasMore, isLoading]
  );

  const filteredData = loadedData.filter((card) =>
    card.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex flex-col justify-center items-center m-6 px-4 space-y-6 bg-sw-stars ">
      <Header
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {error && <ApiError error={error} currentPage={currentPage} page={page} />}

      <div className="w-full flex flex-col items-center space-y-4">
        {filteredData.map((item) => (
          <PersonCard
            key={item.url}
            card={item}
            currentPage={currentPage}
            searchTerm={searchTerm}
          />
        ))}

        {isLoading && (
          <>
            <SkeletonCard />
            <SkeletonCard />
            <SkeletonCard />
          </>
        )}

        <div ref={lastRef} style={{ height: 1 }} />
      </div>
    </div>
  );
}

export default App;
