import React from "react";

const PetDetails = ({ dog }) => {
  return (
    <div className="flex flex-col items-center bg-white p-4 rounded-md shadow-md">
      <img
        src={dog.image}
        alt={dog.name}
        className="w-40 h-40 object-cover mb-4 rounded-md"
      />
      <div>
        <h2 className="text-2xl font-semibold mb-2">{dog.name}</h2>
        <p className="text-gray-600">{dog.description}</p>
        {/* 여기에 다른 dog 데이터를 보여주는 코드를 추가하세요 */}
        <p className="text-gray-600">Breed: {dog.breed}</p>
        <p className="text-gray-600">Age: {dog.age}</p>
        {/* 추가할 데이터가 있으면 위와 같은 방식으로 추가하세요 */}
      </div>
    </div>
  );
};

export default PetDetails;
