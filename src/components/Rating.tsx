import React from 'react';

type RatingProps = {
  rating: number;
  onRatingChange: (rating: number) => void;
};

const Rating: React.FC<RatingProps> = ({ rating, onRatingChange }) => {
  const handleRatingChange = (newRating: number) => {
    onRatingChange(newRating);
  };

  return (
    <div className="flex">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          className={`text-xl ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
          onClick={() => handleRatingChange(star)}
        >
          ★
        </button>
      ))}
    </div>
  );
};

export default Rating;