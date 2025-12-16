import React from "react";
import "./GigCard.scss";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["gigUser", item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => res.data),
  });

  const rating =
    item.starNumber && item.starNumber !== 0
      ? Math.round(item.totalStars / item.starNumber)
      : null;

  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <div className="thumbnail">
          <img src={item.cover} alt={item.title || "Gig cover"} />
        </div>

        <div className="info">
          {isLoading ? (
            <div className="user skeleton-user">
              <div className="avatar-skeleton" />
              <div className="text-skeleton" />
            </div>
          ) : error ? (
            <div className="user error-user">
              <img src="/img/noavatar.jpg" alt="User" />
              <span>Unknown seller</span>
            </div>
          ) : (
            <div className="user">
              <img src={data?.img || "/img/noavatar.jpg"} alt={data?.username} />
              <span>{data?.username}</span>
            </div>
          )}

          <p className="title">{item.desc}</p>

          <div className="metaRow">
            <div className="star">
              {rating && (
                <>
                  <img src="./img/star.png" alt="rating" />
                  <span>{rating.toFixed(0)}</span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="divider" />

        <div className="detail">
          <button className="fav">
            <img src="./img/heart.png" alt="save" />
          </button>
          <div className="price">
            <span>Starting at</span>
            <h2>
              <sup>$</sup> {item.price}
            </h2>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default GigCard;
