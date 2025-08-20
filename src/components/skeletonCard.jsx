const SkeletonCard = () => (
  <div
    className="flex w-full max-w-4xl  text-center gap-6 my-4  px-4 
                 rounded-lgflex  items-center justify-between p-4 bg-white/5 rounded-lg animate-pulse"
  >
    <div className="w-24 h-24 bg-gray-700 rounded-full"></div>
    <div className="flex-1 space-y-2">
      <div className="w-3/4 h-4 bg-gray-700 rounded"></div>
      <div className="w-2/3 h-3 bg-gray-700 rounded"></div>
      <div className="w-1/2 h-3 bg-gray-700 rounded"></div>
    </div>
  </div>
);

export default SkeletonCard;
