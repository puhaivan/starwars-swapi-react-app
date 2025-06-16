import  { forwardRef } from "react";

const PersonCard = forwardRef(({ person }, ref) => {

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random&rounded=true`;

return (
  <div className="flex flex-col justify-center items-center w-full px-4">
    <div
      ref={ref}
      className="flex w-full max-w-4xl items-center justify-between text-center gap-6 my-4 py-6 px-4 rounded-lg bg-white/5 backdrop-blur-sm shadow-md border-white"
    >
      <div className="flex-1 flex justify-center">
        <img
          src={avatarUrl}
          alt=""
          className="w-24 h-24 rounded-full object-cover shadow-[0_0_20px_rgba(255,255,0,0.6)]"
        />
      </div>
      <div className="flex-1 flex justify-center items-center">
        <h3 className="text-yellow-300 text-xl font-bold drop-shadow-[0_0_4px_rgba(255,255,0,0.6)]">
          {person.name}
        </h3>
      </div>
      <ul className="flex-1 text-left space-y-1 text-blue-100 font-medium">
        <li>Gender: {person.gender}</li>
        <li>Birth Year: {person.birth_year}</li>
        <li>Eye Color: {person.eye_color}</li>
      </ul>
    </div>
  </div>
);
});

export default PersonCard;
