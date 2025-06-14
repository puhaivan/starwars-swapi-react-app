import  { forwardRef } from "react";

const PersonCard = forwardRef(({ person }, ref) => {
  return (
    <div ref={ref} style={{ border: "1px solid #ccc", margin: "1rem 0", padding: "1rem" }}>
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
