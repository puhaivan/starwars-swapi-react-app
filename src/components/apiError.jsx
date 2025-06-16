

const ApiError = ({ error, currentPage, page }) => {
  return (
    <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded w-full max-w-xl text-center">
      <strong className="font-bold">Error:</strong> {error}
      <p className="text-sm mt-2">
        While loading <span className="font-semibold">{currentPage}</span> page {page}.
      </p>
      <button className="border-2 p-1 border-blue-500 border-solid active:border-dotted" onClick={() => fetchData(page, currentPage)}>Retry</button>
    </div>
  );
};

export default ApiError;
