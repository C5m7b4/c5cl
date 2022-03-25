import React, { useState } from 'react';
import './StarRating.css';

export interface StarRatingProps {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const StarRating = (props: StarRatingProps) => {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="star-rating">
      {[...Array(5)].map((star, index) => {
        return (
          <button
            type="button"
            data-testid={`star-${index}`}
            key={`sr-${index}`}
            className={`star-rating-button ${
              index <= (hover || rating) ? 'on' : 'off'
            }`}
            onClick={() => setRating(index)}
            onMouseEnter={() => setHover(index)}
            onMouseLeave={() => setHover(rating)}
          >
            <span className="star">&#9733;</span>
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
