import React from "react";
import "./Orders.scss";
import { useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Orders = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const navigate = useNavigate();

  const { isLoading, error, data } = useQuery({
    queryKey: ["orders"],
    queryFn: () => newRequest.get(`/orders`).then((res) => res.data),
  });

  const handleContact = async (order) => {
    const sellerId = order.sellerId;
    const buyerId = order.buyerId;
    const id = sellerId + buyerId;

    try {
      const res = await newRequest.get(`/conversations/single/${id}`);
      navigate(`/message/${res.data.id}`);
    } catch (err) {
      if (err.response?.status === 404) {
        const res = await newRequest.post(`/conversations/`, {
          to: currentUser.isSeller ? buyerId : sellerId,
        });
        navigate(`/message/${res.data.id}`);
      }
    }
  };

  return (
    <div className="orders">
      <div className="container">
        <div className="titleRow">
          <div>
            <h1>Orders</h1>
            <p>Track your recent purchases and projects.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="state">Loading orders...</div>
        ) : error ? (
          <div className="state error">Something went wrong.</div>
        ) : !data?.length ? (
          <div className="state empty">You don&apos;t have any orders yet.</div>
        ) : (
          <div className="tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Contact</th>
                </tr>
              </thead>
              <tbody>
                {data.map((order) => (
                  <tr key={order._id}>
                    <td>
                      <img
                        className="image"
                        src={order.img}
                        alt={order.title}
                      />
                    </td>
                    <td className="titleCell">{order.title}</td>
                    <td className="priceCell">
                      <sup>$</sup>
                      {order.price}
                    </td>
                    <td>
                      <button
                        className="messageBtn"
                        type="button"
                        onClick={() => handleContact(order)}
                        title="Contact"
                      >
                        <img
                          className="messageIcon"
                          src="./img/message.png"
                          alt="message"
                        />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Orders;
