// gigReducer.js

const currentUser = JSON.parse(localStorage.getItem("currentUser") || "null");

export const INITIAL_STATE = {
  userId: currentUser?._id || "",   // fallback to empty string if not logged in
  title: "",
  cat: "design",                    // default category
  cover: "",
  images: [],
  desc: "",
  shortTitle: "",
  shortDesc: "",
  deliveryTime: 0,
  revisionNumber: 0,
  features: [],
  price: 0,
};

const numberFields = ["deliveryTime", "revisionNumber", "price"];

export const gigReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_INPUT": {
      const { name, value } = action.payload;
      const parsedValue = numberFields.includes(name)
        ? Number(value || 0)
        : value;

      return {
        ...state,
        [name]: parsedValue,
      };
    }

    case "ADD_IMAGES":
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };

    case "ADD_FEATURE":
      if (!action.payload?.trim()) return state; // ignore empty features
      return {
        ...state,
        features: [...state.features, action.payload.trim()],
      };

    case "REMOVE_FEATURE":
      return {
        ...state,
        features: state.features.filter(
          (feature) => feature !== action.payload
        ),
      };

    case "RESET_GIG":
      return {
        ...INITIAL_STATE,
        userId: state.userId, // keep same user
      };

    default:
      return state;
  }
};
