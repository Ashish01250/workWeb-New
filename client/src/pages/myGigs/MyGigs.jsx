import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./MyGigs.scss";
import getCurrentUser from "../../utils/getCurrentUser.js";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";

function MyGigs() {
  const currentUser = getCurrentUser();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    isLoading,
    error,
    data: gigs,
  } = useQuery({
    queryKey: ["myGigs"],
    queryFn: () => newRequest.get("/gigs/mine").then((res) => res.data),
    enabled: !!currentUser && currentUser.isSeller,
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => newRequest.delete(`/gigs/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleDelete = (id, e) => {
    e.stopPropagation(); // 👈 prevent row click navigation
    deleteMutation.mutate(id);
  };

  const handleRowClick = (id) => {
    navigate(`/gig/${id}`); // 👈 open gig details page
  };

  const handleEdit = (id, e) => {
    e.stopPropagation(); // 👈 prevent row navigation
    navigate(`/edit-gig/${id}`); // you'll create this route/page
  };

  if (!currentUser) {
    return (
      <div className="myGigs">
        <div className="container">
          <div className="state error">You need to log in to view your gigs.</div>
        </div>
      </div>
    );
  }

  if (!currentUser.isSeller) {
    return (
      <div className="myGigs">
        <div className="container">
          <div className="state error">
            Only sellers can have gigs. Switch to a seller account.
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="myGigs">
      <div className="container">
        <div className="titleRow">
          <div className="titleBlock">
            <h1>Your gigs</h1>
            <p>Tap a gig to view details, edit or publish updates.</p>
          </div>
          <Link to="/add">
            <button className="addBtn">
              <span className="plus">＋</span> Add new gig
            </button>
          </Link>
        </div>

        {isLoading ? (
          <div className="state">Loading gigs...</div>
        ) : error ? (
          <div className="state error">Something went wrong.</div>
        ) : !gigs?.length ? (
          <div className="state empty">You have not created any gigs yet.</div>
        ) : (
          <div className="tableWrapper fadeIn">
            <table>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Title</th>
                  <th>Price</th>
                  <th>Sales</th>
                  <th className="actionsHead">Actions</th>
                </tr>
              </thead>
              <tbody>
                {gigs.map((gig) => (
                  <tr
                    key={gig._id}
                    className="rowClickable"
                    onClick={() => handleRowClick(gig._id)}
                  >
                    <td>
                      <img
                        className="image"
                        src={gig.cover}
                        alt={gig.title}
                      />
                    </td>
                    <td className="titleCell">{gig.shortTitle || gig.title}</td>
                    <td className="priceCell">
                      <sup>$</sup>
                      {gig.price}
                    </td>
                    <td>{gig.sales ?? 0}</td>
                    <td className="actionsCell">
                      <button
                        className="editBtn"
                        type="button"
                        onClick={(e) => handleEdit(gig._id, e)}
                      >
                        Edit
                      </button>
                      <button
                        className="deleteBtn"
                        type="button"
                        onClick={(e) => handleDelete(gig._id, e)}
                        title="Delete gig"
                      >
                        <img
                          className="deleteIcon"
                          src="/img/delete.png"
                          alt="delete"
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
}

export default MyGigs;
