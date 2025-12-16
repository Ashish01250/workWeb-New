// src/pages/editGig/EditGig.jsx
import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import upload from "../../utils/upload"; // 👈 same helper you use in Add page
import "./EditGig.scss";

function EditGig() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: "",
    shortTitle: "",
    desc: "",
    shortDesc: "",
    price: "",
    cat: "",
    deliveryTime: "",
    revisionNumber: "",
    cover: "",
    features: [],
  });

  const [isUploading, setIsUploading] = useState(false);

  const {
    data,
    isLoading,
    error: fetchError,
  } = useQuery({
    queryKey: ["gig", id],
    queryFn: () => newRequest.get(`/gigs/single/${id}`).then((res) => res.data),
  });

  useEffect(() => {
    if (data) {
      setFormData({
        title: data.title || "",
        shortTitle: data.shortTitle || "",
        desc: data.desc || "",
        shortDesc: data.shortDesc || "",
        price: data.price || "",
        cat: data.cat || "",
        deliveryTime: data.deliveryTime || "",
        revisionNumber: data.revisionNumber || "",
        cover: data.cover || "",
        features: data.features || [],
      });
    }
  }, [data]);

  const mutation = useMutation({
    mutationFn: (payload) => newRequest.put(`/gigs/${id}`, payload),
    onSuccess: () => {
      queryClient.invalidateQueries(["gig", id]);
      queryClient.invalidateQueries(["myGigs"]);
      navigate("/myGigs", { state: { updated: true } });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCoverFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      setIsUploading(true);
      const url = await upload(file); // 👈 uploads to Cloudinary / your service
      setFormData((prev) => ({ ...prev, cover: url }));
    } catch (err) {
      console.error("Upload error:", err);
      // you can add toast / error text here if you want
    } finally {
      setIsUploading(false);
    }
  };

  const openFilePicker = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveCover = () => {
    setFormData((prev) => ({ ...prev, cover: "" }));
  };

  if (isLoading) {
    return (
      <div className="editGigPage">
        <div className="loadingState">Loading gig details…</div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="editGigPage">
        <div className="errorState">Could not load this gig.</div>
      </div>
    );
  }

  return (
    <div className="editGigPage">
      <div className="editGigHeader">
        <div>
          <h1>Edit gig</h1>
          <p>Update your gig and publish the latest version for buyers.</p>
        </div>
      </div>

      <div className="editGigLayout">
        {/* LEFT: Preview card */}
        <div className="previewCard">
          <div className="previewImageWrapper">
            {formData.cover ? (
              <img
                src={formData.cover}
                alt={formData.title || "Gig cover"}
                className="previewImage"
              />
            ) : (
              <div className="previewImage placeholder">
                <span>No cover image</span>
              </div>
            )}
            <div className="imageActions">
              <button
                type="button"
                className="imageBtn primary"
                onClick={openFilePicker}
              >
                {isUploading ? "Uploading…" : formData.cover ? "Change image" : "Upload image"}
              </button>
              {formData.cover && (
                <button
                  type="button"
                  className="imageBtn ghost"
                  onClick={handleRemoveCover}
                >
                  Remove
                </button>
              )}
            </div>
            <input
              type="file"
              accept="image/*"
              ref={fileInputRef}
              onChange={handleCoverFileChange}
              style={{ display: "none" }}
            />
          </div>

          <div className="previewInfo">
            <h2 className="previewTitle">
              {formData.shortTitle || formData.title || "Your gig title"}
            </h2>
            <p className="previewCat">{formData.cat || "Category not set"}</p>
            <p className="previewDesc">
              {formData.shortDesc || "Short description will appear here."}
            </p>
            <div className="previewFooter">
              <span className="previewPrice">
                {formData.price ? (
                  <>
                    <span className="label">From</span> ${formData.price}
                  </>
                ) : (
                  "Set a price"
                )}
              </span>
              <span className="previewMeta">
                {formData.deliveryTime
                  ? `${formData.deliveryTime} day delivery`
                  : "Set delivery time"}
              </span>
            </div>
          </div>
        </div>

        {/* RIGHT: Form */}
        <form className="editGigForm" onSubmit={handleSubmit}>
          <div className="formGroup">
            <label>Gig title</label>
            <input
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="I will design a modern logo for your brand"
            />
          </div>

          <div className="formGroup twoCols">
            <div>
              <label>Short title</label>
              <input
                name="shortTitle"
                value={formData.shortTitle}
                onChange={handleChange}
                placeholder="Modern logo design"
              />
            </div>
            <div>
              <label>Category</label>
              <input
                name="cat"
                value={formData.cat}
                onChange={handleChange}
                placeholder="e.g. design, web, writing"
              />
            </div>
          </div>

          <div className="formGroup">
            <label>Full description</label>
            <textarea
              name="desc"
              value={formData.desc}
              onChange={handleChange}
              placeholder="Describe your service, process, and what buyers will receive."
              rows={4}
            />
          </div>

          <div className="formGroup">
            <label>Short description</label>
            <input
              name="shortDesc"
              value={formData.shortDesc}
              onChange={handleChange}
              placeholder="One line that sells your gig."
            />
          </div>

          <div className="formGroup twoCols">
            <div>
              <label>Price (USD)</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                placeholder="e.g. 50"
                min="0"
              />
            </div>
            <div>
              <label>Delivery time (days)</label>
              <input
                type="number"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                placeholder="e.g. 3"
                min="1"
              />
            </div>
          </div>

          <div className="formGroup twoCols">
            <div>
              <label>Revision number</label>
              <input
                type="number"
                name="revisionNumber"
                value={formData.revisionNumber}
                onChange={handleChange}
                placeholder="e.g. 2"
                min="0"
              />
            </div>
          </div>

          <div className="formFooter">
            {mutation.isError && (
              <span className="status error">
                Could not update gig. Please check required fields.
              </span>
            )}
            {mutation.isSuccess && (
              <span className="status success">Gig updated successfully!</span>
            )}

            <button
              type="submit"
              className="submitBtn"
              disabled={mutation.isLoading || isUploading}
            >
              {mutation.isLoading || isUploading
                ? "Saving changes…"
                : "Save & publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditGig;
