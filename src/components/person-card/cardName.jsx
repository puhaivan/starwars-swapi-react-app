import highlightMatch from "../../utils/highlightMatch";


const CardName = ({ name, searchTerm }) => (
  <h3 className="text-yellow-300 text-xl font-bold drop-shadow-[0_0_4px_rgba(255,255,0,0.6)]">
    {highlightMatch(name, searchTerm)}
  </h3>
);
export default CardName;