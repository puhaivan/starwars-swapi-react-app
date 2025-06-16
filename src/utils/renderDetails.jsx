

const renderDetails = (card, currentPage) => {
  switch (currentPage) {
    case "people":
      return (
        <>
          <li>Gender: {card.gender}</li>
          <li>Birth Year: {card.birth_year}</li>
          <li>Eye Color: {card.eye_color}</li>
        </>
      );
    case "planets":
      return (
        <>
          <li>Population: {card.population}</li>
          <li>Diameter: {card.diameter}</li>
          <li>Terrain: {card.terrain}</li>
        </>
      );
    case "vehicles":
      return (
        <>
          <li>Model: {card.model}</li>
          <li>Manufacturer: {card.manufacturer}</li>
          <li>Cost: {card.cost_in_credits}</li>
        </>
      );
    default:
      return null;
  }
};

export default renderDetails;