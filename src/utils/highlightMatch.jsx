const highlightMatch = (text, searchTerm) => {
  if (!searchTerm) return text;
  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.split(regex);

  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={index} className="text-red-700 font-semibold">
        {part}
      </span>
    ) : (
      part
    )
  );
};

export default highlightMatch;
