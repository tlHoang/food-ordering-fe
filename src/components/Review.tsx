import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetReviews, useCreateReview, useDeleteReview } from '@/api/ReviewApi';
import Rating from './Rating';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Review as ReviewType } from '@/types';

const Review: React.FC = () => {
  const { restaurantId } = useParams();
  if (!restaurantId) {
    return null;
  }
  const { data: reviews, isLoading: isReviewsLoading } = useGetReviews(restaurantId);
  const { mutate: createReview } = useCreateReview();
  const { mutate: deleteReview } = useDeleteReview();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const handleCreateReview = () => {
    createReview({ restaurantId, rating, comment });
    setRating(0);
    setComment('');
  };

  const handleDeleteReview = (reviewId: string) => {
    deleteReview(reviewId);
  };

  return (
    <div>
      <h2>Reviews</h2>
      {isReviewsLoading ? (
        <p>Loading reviews...</p>
      ) : (
        reviews.map((review: ReviewType) => (
          <div key={review._id} className="border p-4 mb-4">
            <Rating rating={review.rating} onRatingChange={() => { }} />
            <p>{review.comment}</p>
            <Button onClick={() => handleDeleteReview(review._id)}>Delete</Button>
          </div>
        ))
      )}

      <h2>Add a Review</h2>
      <div className="border p-4">
        <label>Rating</label>
        <Rating rating={rating} onRatingChange={setRating} />
        <label>Comment</label>
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button onClick={handleCreateReview}>Submit</Button>
      </div>
    </div>
  );
};

export default Review;