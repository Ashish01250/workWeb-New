import React, { useEffect, useState } from "react";
import "./profile.scss";
import { Link,useNavigate } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

const Profile = () => {
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const queryClient = useQueryClient();
  const isSeller = currentUser?.isSeller;

  const { isLoading, error, data } = useQuery({
    queryKey: ["me", currentUser?._id],
    queryFn: () =>
      newRequest.get(`/users/${currentUser._id}`).then((res) => res.data),
    enabled: !!currentUser?._id,
  });

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    country: "",
    address: "",
    desc: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        username: data.username || "",
        email: data.email || "",
        phone: data.phone || "",
        country: data.country || "",
        address: data.address || "",
        desc: data.desc || "",
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (payload) =>
      newRequest.put(`/users/${currentUser._id}`, payload),
    onSuccess: (res) => {
      queryClient.invalidateQueries(["me", currentUser._id]);
      const updatedUser = { ...currentUser, ...res.data };
      localStorage.setItem("currentUser", JSON.stringify(updatedUser));
    },
  });
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await newRequest.post("/auth/logout"); // backend remove cookie
      localStorage.removeItem("currentUser"); // remove user from browser
      navigate("/login"); // redirect
    } catch (err) {
      console.log("Logout error:", err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  if (!currentUser) {
    return (
      <div className="profilePage">
        <p>You need to sign in to view your profile.</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="profilePage">
        <p>Loading profile…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="profilePage">
        <p>Something went wrong while loading your profile.</p>
      </div>
    );
  }

  const user = data || currentUser;

  return (
    <div className="profilePage">
      {/* HEADER */}
      <div className="profileHeader">
        <div className="avatarWrapper">
          <img
            className="avatar"
            src={user.img || "/img/noavatar.jpg"}
            alt={user.username}
          />
        </div>
        <div className="info">
          <div className="nameRow">
            <h1>{user.username}</h1>
            <span className={`roleBadge ${isSeller ? "seller" : "buyer"}`}>
              {isSeller ? "Seller" : "Buyer"}
            </span>
          </div>
          <div className="email">{user.email}</div>
          <div className="country">{user.country || "No country set"}</div>
        </div>
      </div>

      {/* GRID */}
      <div className="profileGrid">
        {/* LEFT: ACCOUNT SUMMARY + QUICK LINKS */}
        <div className="card">
          <h2>Account overview</h2>
          <p className="muted">
            Role:
            <span className="pill">
              {isSeller ? "Seller" : "Buyer / Client"}
            </span>
          </p>
          <p className="muted small">
            Use these shortcuts to jump back into your work.
          </p>

          <div className="quickLinksBlock">
            <h3>Quick links</h3>
            <ul className="linksList">
              {isSeller && (
                <>
                  <li>
                    <Link to="/myGigs">My Gigs</Link>
                  </li>
                  <li>
                    <Link to="/add">Add New Gig</Link>
                  </li>
                </>
              )}
              <li>
                <Link to="/orders">Orders</Link>
              </li>
              <li>
                <Link to="/messages">Messages</Link>
              </li>
              <li>
              <button
                onClick={handleLogout}
                style={{
                  background: "none",
                  border: "none",
                  color: "red",
                  cursor: "pointer",
                  padding: 0,
                  fontSize: "16px"
                }}
              >
                Logout
              </button>
            </li>
            </ul>
          </div>
        </div>

        {/* RIGHT: ROLE–SPECIFIC EDIT FORM */}
        <div className="card editCard">
          {isSeller ? (
            <>
              <h2>Seller details</h2>
              <p className="muted small">
                This information appears on your gigs and is visible to buyers.
              </p>
            </>
          ) : (
            <>
              <h2>Your details</h2>
              <p className="muted small">
                This information is used for your account and orders.
              </p>
            </>
          )}

          <form className="profileForm" onSubmit={handleSubmit}>
            <div className="fieldRow">
              <div className="field">
                <label>{isSeller ? "Display name" : "Full name"}</label>
                <input
                  name="username"
                  type="text"
                  value={formData.username}
                  onChange={handleChange}
                  placeholder={
                    isSeller ? "Your seller display name" : "Your full name"
                  }
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="example@email.com"
                />
              </div>
            </div>

            <div className="fieldRow">
              <div className="field">
                <label>{isSeller ? "Business phone" : "Phone number"}</label>
                <input
                  name="phone"
                  type="text"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Phone"
                />
              </div>
              <div className="field">
                <label>Country</label>
                <input
                  name="country"
                  type="text"
                  value={formData.country}
                  onChange={handleChange}
                  placeholder="Country"
                />
              </div>
            </div>

            <div className="field">
              <label>{isSeller ? "Business address" : "Address"}</label>
              <input
                name="address"
                type="text"
                value={formData.address}
                onChange={handleChange}
                placeholder="Street, city, ZIP"
              />
            </div>

            <div className="field">
              <label>{isSeller ? "Seller bio" : "About you"}</label>
              <textarea
                name="desc"
                value={formData.desc}
                onChange={handleChange}
                placeholder={
                  isSeller
                    ? "Tell buyers about your experience and services"
                    : "Short info about yourself"
                }
              />
            </div>

            <div className="formFooter">
              <span className="statusMsg">
                {mutation.isSuccess && "Profile updated successfully."}
                {mutation.isError && "Could not update profile."}
              </span>

              <div className="actions">
                <button
                  type="submit"
                  className="btn primary"
                  disabled={mutation.isLoading}
                >
                  {mutation.isLoading ? "Saving…" : "Save changes"}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;
