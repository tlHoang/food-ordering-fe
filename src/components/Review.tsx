import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useGetReviews, useCreateReview, useDeleteReview } from '@/api/ReviewApi';
import Rating from './Rating';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Review as ReviewType } from '@/types';
import { useGetMyUser } from '@/api/MyUserApi';

const Review: React.FC = () => {
  const { restaurantId } = useParams();
  const { currentUser } = useGetMyUser();
  const { data: reviews, isLoading: isReviewsLoading } = useGetReviews(restaurantId);
  const { mutate: createReview } = useCreateReview();
  const { mutate: deleteReview } = useDeleteReview();

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  if (!restaurantId || !currentUser) {
    return null;
  }


  const handleCreateReview = () => {
    if (reviews.some((review: ReviewType) => review.user === currentUser._id)) {
      alert("Bạn đã đánh giá rồi");
      return;
    }
    createReview({ restaurantId, rating, comment });
    setRating(0);
    setComment('');
  };

  const handleDeleteReview = (reviewId: string) => {
    deleteReview(reviewId);
  };

  return (
    <div>
      <h2>Thêm đánh giá</h2>
      <div className="border p-4">
        <label>Rating</label>
        <Rating rating={rating} onRatingChange={setRating} />
        <label>Nhận xét</label>
        <Textarea value={comment} onChange={(e) => setComment(e.target.value)} />
        <Button
          className='mt-4'
          disabled={rating === 0 || comment.length === 0}
          onClick={handleCreateReview}
        >Submit</Button>
      </div>
      {isReviewsLoading ? (
        <p>Loading reviews...</p>
      ) : (
        <>
          {reviews
            .filter((review: ReviewType) => review.user === currentUser._id)
            .map((review: ReviewType) => (
              <div key={review._id} className="border p-4 mb-4">
                Tôi:
                <Rating rating={review.rating} onRatingChange={() => { }} />
                <p>{review.comment}</p>
                <Button onClick={() => handleDeleteReview(review._id)}>Delete</Button>
              </div>
            ))}
          {reviews
            .filter((review: ReviewType) => review.user !== currentUser._id)
            .map((review: ReviewType) => (
              <div key={review._id} className="border p-4 mb-4">
                <Rating rating={review.rating} onRatingChange={() => { }} />
                <p>{review.comment}</p>
              </div>
            ))}
        </>
      )}
    </div>
  );
};

export default Review;