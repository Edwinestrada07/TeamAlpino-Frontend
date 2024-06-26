import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';

const UserRating = ({ userId, initialRating, onRated }) => {
    const [rating, setRating] = useState(initialRating);

    const handleRatingChange = async (newRating) => {
        setRating(newRating);
        try {
            const response = await fetch(`http://localhost:3000/user/${userId}/rating`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rating: newRating }),
            });

            if (response.ok) {
                onRated();
            } else {
                console.error('Error al enviar la calificación del jugador:', response.statusText);
            }
        } catch (error) {
            console.error('Error al enviar la calificación del jugador:', error);
        }
    };

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <FontAwesomeIcon
                    key={star}
                    icon={faStar}
                    className={`cursor-pointer ${star <= rating ? 'text-yellow-500' : 'text-gray-400'}`}
                    onClick={() => handleRatingChange(star)}
                />
            ))}
        </div>
    );
};

export default UserRating;
