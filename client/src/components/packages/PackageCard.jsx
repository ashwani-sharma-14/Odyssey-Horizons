import { Link } from "react-router-dom";

const PackageCard = ({ packageData }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={packageData.image}
        alt={packageData.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="text-xl font-semibold mb-2">{packageData.title}</h3>
        <p className="text-gray-600 mb-4 line-clamp-2">
          {packageData.description}
        </p>
        <div className="flex justify-between items-center">
          <span className="text-lg font-bold">&#8377;{packageData.price}</span>
          <Link
            to={`/packages/&#8377;{packageData._id}`}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PackageCard;
