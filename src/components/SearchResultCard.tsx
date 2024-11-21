import { Restaurant } from "@/types";
import { Link } from "react-router-dom";
import { AspectRatio } from "./ui/aspect-ratio";
import { Banknote, Clock, Dot } from "lucide-react";
import { useGetReviews } from "@/api/ReviewApi";
import { Star, StarHalf } from "lucide-react";

type Props = {
  restaurant: Restaurant;
};

const SearchResultCard = ({ restaurant }: Props) => {
  const restaurantId = restaurant._id;
  const { data: reviews } = useGetReviews(restaurantId);
  const averageRating = reviews?.length
    ? (reviews.reduce((acc: any, review: any) => acc + review.rating, 0) / reviews.length).toFixed(1)
    : "Chưa có đánh giá";
  return (
    <Link
      to={`/detail/${restaurant._id}`}
      className="grid lg:grid-cols-[2fr_3fr] gap-5 group"
    >
      <AspectRatio ratio={16 / 6}>
        <img
          src={restaurant.imageUrl}
          className="rounded-md w-full h-full object-cover"
        />
      </AspectRatio>
      <div>
        <h3 className="text-2xl font-bold mb-1 tracking-tight group-hover:underline">
          {restaurant.restaurantName}
        </h3>
        <div className="text-sm flex items-center gap-2">
          {averageRating}
          {reviews?.length > 0 && (
            <div className="flex items-center">
              {[...Array(5)].map((_, index) => {
                const ratingValue = index + 1;
                return (
                  <span key={index}>
                    {ratingValue <= Math.floor(Number(averageRating)) ? (
                      <Star className="h-5 w-5 text-yellow-500" />
                    ) : ratingValue - 0.5 <= Number(averageRating) ? (
                      <StarHalf className="h-5 w-5 text-yellow-500" />
                    ) : (
                      <Star className="h-5 w-5 text-white" />
                    )}
                  </span>
                );
              })}
            </div>
          )}
        </div>
        <div id="card-content" className="grid md:grid-cols-2 gap-2">
          <div className="flex flex-row flex-wrap">
            {restaurant.cuisines.map((item, index) => (
              <span className="flex">
                <span>{item}</span>
                {index < restaurant.cuisines.length - 1 && <Dot />}
              </span>
            ))}
          </div>
          <div className="flex gap-2 flex-col">
            <div className="flex items-center gap-1 text-green-600">
              <Clock className="text-green-600" />
              {restaurant.estimatedDeliveryTime} phút
            </div>
            <div className="flex items-center gap-1">
              <Banknote />
              Cước phí từ {restaurant.deliveryPrice.toLocaleString()} ₫
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default SearchResultCard;