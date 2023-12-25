import React, { useState } from 'react';
import Modal from './Modal'; // Import the Modal component

const getCardColor = (name) => {
  const nameLower = name.toLowerCase();

  if (nameLower.includes('bulbasaur') || nameLower.includes('ivysaur')) {
    return 'bg-green-500';
  } else if (nameLower.includes('charmander') || nameLower.includes('charizard')) {
    return 'bg-red-500';
  } else if (nameLower.includes('squirtle') || nameLower.includes('wartortle')) {
    return 'bg-blue-500';
  }

  return 'bg-gray-500';
};

const Card = ({ item }) => {
  const cardColor = getCardColor(item.name);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCardClick = () => {
    console.log("");
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className={`max-w-xs mx-auto ${cardColor} shadow-lg rounded-lg overflow-hidden my-4 transition transform hover:scale-105`} onClick={handleCardClick}>
      <div className="flex">
        <div className="flex flex-col justify-between py-4 px-6">
          <div>
            <h2 className="text-lg font-semibold text-white">{item.name}</h2>
            <div className="mt-2 text-white text-sm space-y-1">
              {item.types.map((type, index) => (
                <span key={type} className="glassmorphic-chip">
                  {type}
                  {index < item.types.length - 1 }
                </span>
              ))}
            </div>
          </div>
        </div>
        <img className="w-40 h-40 object-cover object-center" src={item.image} alt={item.name} />
      </div>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal} pokemonDetails={item} />
    </div>
  );
};

export default Card;
