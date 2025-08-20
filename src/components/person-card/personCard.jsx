import Avatar from './avatar';
import CardName from './cardName';
import DetailsList from './cardDetailsList';

export default function PersonCard({ card, currentPage, searchTerm }) {
  return (
    <div
      className="flex w-full max-w-4xl items-center justify-between text-center gap-6 my-4 py-6 px-4 
                 rounded-lg bg-white/5 backdrop-blur-sm shadow-md border border-white/10
                 transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl"
    >
      <div className="flex-1 flex justify-center">
        <Avatar name={card.name} />
      </div>

      <div className="flex-1 flex justify-center items-center">
        <CardName name={card.name} searchTerm={searchTerm} />
      </div>

      <DetailsList card={card} currentPage={currentPage} />
    </div>
  );
}
