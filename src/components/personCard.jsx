import  { forwardRef } from "react";

const PersonCard = forwardRef(({ person }, ref) => {

  const avatarUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(person.name)}&background=random&rounded=true`;

  return (
    <div ref={ref} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
      <img src={avatarUrl}  alt=""></img>
      <h3>{person.name}</h3>
      <ul>
        <li>Gender: {person.gender}</li>
        <li>Birth Year: {person.birth_year}</li>
        <li>Eye Color: {person.eye_color}</li>
      </ul>
    </div>
  );
});

export default PersonCard;
