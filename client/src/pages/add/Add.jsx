import React, { useReducer, useState } from "react";
import "./Add.scss";
import { gigReducer, INITIAL_STATE } from "../../reducers/gigReducer";
import upload from "../../utils/upload";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import newRequest from "../../utils/newRequest";
import { useNavigate } from "react-router-dom";

const Add = () => {
  const [singleFile, setSingleFile] = useState(null);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [formError, setFormError] = useState("");

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleChange = (e) => {
    dispatch({
      type: "CHANGE_INPUT",
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleFeature = (e) => {
    e.preventDefault();
    const featureValue = e.target[0].value.trim();
    if (featureValue) {
      dispatch({ type: "ADD_FEATURE", payload: featureValue });
      e.target[0].value = "";
    }
  };

  const handleUpload = async () => {
    if (!singleFile) return;
    setUploading(true);
    setFormError("");

    try {
      const cover = await upload(singleFile);
      const images = await Promise.all(
        [...files].map(async (file) => await upload(file))
      );

      dispatch({ type: "ADD_IMAGES", payload: { cover, images } });
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
      setFormError("Error uploading images. Try again.");
    }
  };

  const mutation = useMutation({
    mutationFn: (gig) => newRequest.post("/gigs", gig),
    onSuccess: () => {
      queryClient.invalidateQueries(["myGigs"]);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    if (!state.title || !state.desc || !state.shortTitle || !state.price) {
      setFormError("Please fill all required fields.");
      return;
    }

    mutation.mutate(state);
    navigate("/mygigs");
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Create a New Gig</h1>
        <p className="subtitle">
          Craft a clear, attractive gig so buyers instantly understand your
          service.
        </p>

        <div className="sections">
          {/* LEFT SIDE INFO */}
          <div className="info">
            <div className="fieldGroup">
              <label>
                Gig Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="title"
                placeholder="e.g. I will create UI/UX web design"
                onChange={handleChange}
              />
            </div>

            <div className="fieldGroup">
              <label>
                Category <span className="required">*</span>
              </label>
              <select name="cat" onChange={handleChange}>
                <option value="design">Design</option>
                <option value="web">Web Development</option>
                <option value="animation">Animation</option>
                <option value="music">Music</option>
              </select>
            </div>

            <div className="fieldGroup">
              <label>
                Images <span className="required">*</span>
              </label>
              <div className="images">
                <div className="imagesInputs">
                  <div className="fileGroup">
                    <span className="fileLabel">Cover image</span>
                    <input
                      type="file"
                      onChange={(e) => setSingleFile(e.target.files[0])}
                    />
                  </div>

                  <div className="fileGroup">
                    <span className="fileLabel">Additional images</span>
                    <input
                      type="file"
                      multiple
                      onChange={(e) => setFiles(e.target.files)}
                    />
                  </div>
                </div>

                <button
                  onClick={handleUpload}
                  disabled={!singleFile || uploading}
                  className={uploading ? "loading" : ""}
                  type="button"
                >
                  {uploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>

            {state.cover && (
              <div className="preview">
                <span className="previewLabel">Cover preview</span>
                <img src={state.cover} alt="preview" />
              </div>
            )}

            <div className="fieldGroup">
              <label>
                Description <span className="required">*</span>
              </label>
              <textarea
                name="desc"
                placeholder="Describe your service to customers"
                rows={10}
                onChange={handleChange}
              ></textarea>
            </div>

            {formError && <p className="error">{formError}</p>}

            <button
              className="createBtn"
              onClick={handleSubmit}
              type="button"
              disabled={mutation.isLoading}
            >
              {mutation.isLoading ? "Creating..." : "Create Gig"}
            </button>
          </div>

          {/* RIGHT SIDE DETAILS */}
          <div className="details">
            <div className="fieldGroup">
              <label>
                Service Title <span className="required">*</span>
              </label>
              <input
                type="text"
                name="shortTitle"
                placeholder="e.g. One-page website"
                onChange={handleChange}
              />
            </div>

            <div className="fieldGroup">
              <label>Short Description</label>
              <textarea
                name="shortDesc"
                placeholder="Short description that appears in gig cards"
                rows={6}
                onChange={handleChange}
              />
            </div>

            <div className="fieldRow">
              <div className="fieldGroup">
                <label>Delivery Time</label>
                <input
                  type="number"
                  name="deliveryTime" // fixed to match reducer
                  placeholder="In days"
                  onChange={handleChange}
                  min={1}
                />
              </div>

              <div className="fieldGroup">
                <label>Revision Number</label>
                <input
                  type="number"
                  name="revisionNumber"
                  placeholder="e.g. 3"
                  onChange={handleChange}
                  min={0}
                />
              </div>
            </div>

            <div className="fieldGroup">
              <label>Add Features</label>
              <form className="addFeature" onSubmit={handleFeature}>
                <input type="text" placeholder="e.g. Source file" />
                <button type="submit">Add</button>
              </form>
              <p className="hint">
                Add small bullet points that highlight what&apos;s included.
              </p>
            </div>

            <div className="addedFeatures">
              {state?.features?.map((f) => (
                <div className="item" key={f}>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: "REMOVE_FEATURE", payload: f })
                    }
                  >
                    {f} <span>×</span>
                  </button>
                </div>
              ))}
            </div>

            <div className="fieldGroup">
              <label>
                Price <span className="required">*</span>
              </label>
              <input
                type="number"
                name="price"
                placeholder="e.g. 59"
                onChange={handleChange}
                min={1}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
