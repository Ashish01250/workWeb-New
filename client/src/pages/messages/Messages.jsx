import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React from "react";
import { Link } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Messages.scss";
import moment from "moment";

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ["conversations"],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (id) => newRequest.put(`/conversations/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["conversations"]);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="messages">
      <div className="container">
        <div className="titleRow">
          <div>
            <h1>Messages</h1>
            <p>All your conversations in one place.</p>
          </div>
        </div>

        {isLoading ? (
          <div className="state">Loading conversations...</div>
        ) : error ? (
          <div className="state error">
            An error occurred while fetching conversations.
          </div>
        ) : !data?.length ? (
          <div className="state empty">You don&apos;t have any messages yet.</div>
        ) : (
          <div className="tableWrapper">
            <table>
              <thead>
                <tr>
                  <th>{currentUser.isSeller ? "Buyer" : "Seller"}</th>
                  <th>Last message</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data.map((conversation) => {
                  const isUnread =
                    (currentUser.isSeller && !conversation.readBySeller) ||
                    (!currentUser.isSeller && !conversation.readByBuyer);

                  return (
                    <tr
                      key={conversation.id}
                      className={isUnread ? "active" : ""}
                    >
                      <td>
                        {currentUser.isSeller
                          ? conversation.buyerId
                          : conversation.sellerId}
                      </td>
                      <td>
                        <Link
                          to={`/message/${conversation.id}`}
                          className="link"
                        >
                          {conversation?.lastMessage
                            ? `${conversation.lastMessage.substring(0, 80)}${
                                conversation.lastMessage.length > 80
                                  ? "..."
                                  : ""
                              }`
                            : "No message yet"}
                        </Link>
                      </td>
                      <td>
                        {conversation.updatedAt
                          ? moment(conversation.updatedAt).fromNow()
                          : "Unknown"}
                      </td>
                      <td>
                        {isUnread && (
                          <button
                            type="button"
                            onClick={() => handleRead(conversation.id)}
                          >
                            Mark as read
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Messages;
