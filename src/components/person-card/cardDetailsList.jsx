

import renderDetails from "../../utils/renderDetails";
const DetailsList = ({ card, currentPage }) => (
  <ul className="flex-1 text-sm text-blue-100 space-y-1">
    {renderDetails(card, currentPage)}
  </ul>
);
export default DetailsList;