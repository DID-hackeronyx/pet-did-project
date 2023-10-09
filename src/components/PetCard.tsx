import Link from "next/link";

const PetCard = ({ dog }) => {
  return (
    <Link href={`/adopts/${dog.id}`}>
      <div className="bg-white p-4 rounded-md shadow-md cursor-pointer transition transform hover:scale-105">
        <div className="flex flex-col items-center">
          <img
            src={`/images/${dog.name}.png`}
            className="w-32 h-32 object-cover mb-2 rounded-full"
          />
          <h2 className="text-xl font-semibold mb-1">{dog.name}</h2>
        </div>
      </div>
    </Link>
  );
};

export default PetCard;
