import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import newRequest from "../../utils/newRequest";
import "./Message.scss";

const Message = () => {
  const { id } = useParams();
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const bottomRef = useRef(null);

  const { isLoading, error, data } = useQuery({
    queryKey: ["messages", id],
    queryFn: () =>
      newRequest.get(`/messages/${id}`).then((res) => res.data),
  });

  const mutation = useMutation({
    mutationFn: (message) => newRequest.post(`/messages`, message),
    onSuccess: () => {
      queryClient.invalidateQueries(["messages", id]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = e.target.message.value.trim();
    if (!value) return;

    mutation.mutate({
      conversationId: id,
      desc: value,
    });
    e.target.message.value = "";
  };

  // Auto scroll to bottom when messages change
  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [data]);

  return (
    <div className="message">
      <div className="container">
        <div className="header">
          <span className="breadcrumbs">
            <Link to="/messages" className="backLink">
              ← Messages
            </Link>
            <span className="room">Conversation</span>
          </span>
        </div>

        {isLoading ? (
          <div className="state">Loading conversation...</div>
        ) : error ? (
          <div className="state error">Something went wrong.</div>
        ) : (
          <>
            <div className="messages">
              {data.map((m) => {
                const isOwner = m.userId === currentUser._id;
                return (
                  <div
                    className={`item ${isOwner ? "owner" : ""}`}
                    key={m._id}
                  >
                    <img
                      src={
                        isOwner
                          ? currentUser.img || "/img/noavatar.jpg"
                          : "/img/noavatar.jpg"
                      }
                      alt="avatar"
                    />
                    <p>{m.desc}</p>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>
          </>
        )}

        <hr />

        <form className="write" onSubmit={handleSubmit}>
          <textarea
            name="message"
            placeholder="Write a message..."
            maxLength={1000}
          />
          <button type="submit" disabled={mutation.isLoading}>
            {mutation.isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Message;
