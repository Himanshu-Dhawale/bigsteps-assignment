import React from 'react';

const Modal = ({ isOpen, onClose, pokemonDetails }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-container bg-white w-96 p-4 rounded shadow-lg z-50">
        <div className="modal-close text-right">
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">&times;</button>
        </div>
        <div className="modal-content">
          <h2 className="text-lg font-semibold mb-4">{pokemonDetails.name}</h2>
          <p>Speed: {pokemonDetails.stats.speed}</p>
          <p>Special Defence: {pokemonDetails.stats.special_defense}</p>
          <p>Special Attack: {pokemonDetails.stats.special_attack}</p>
          <p>Defence: {pokemonDetails.stats.defense}</p>
          <p>Attack: {pokemonDetails.stats.attack}</p>
          <p>HP: {pokemonDetails.stats.hp}</p>
        </div>
      </div>
    </div>
  );
};

export default Modal;
