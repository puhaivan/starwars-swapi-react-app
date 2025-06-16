import { forwardRef } from "react";


import Avatar from "./avatar";
import CardName from "./cardName";
import DetailsList from "./cardDetailsList";

const PersonCard = forwardRef(({ card, currentPage, searchTerm }, ref) => (
  <div
  ref={ref}
  className="flex w-full max-w-4xl items-center justify-between text-center gap-6 my-4 py-6 px-4 
             rounded-lg bg-white/5 backdrop-blur-sm shadow-md border-white 
             transition-all duration-300 ease-in-out transform hover:scale-[1.02] hover:shadow-xl"
>
    <div
      ref={ref}
      className="flex w-full max-w-4xl items-center justify-between text-center gap-6 my-4 py-6 px-4 rounded-lg bg-white/5 backdrop-blur-sm shadow-md border-white"
    >
      <div className="flex-1 flex justify-center">
        <Avatar name={card.name} />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <CardName name={card.name} searchTerm={searchTerm}/>
      </div>
      <DetailsList card={card} currentPage={currentPage} />
    </div>
  </div>
));

export default PersonCard;
