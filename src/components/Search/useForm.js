import { useReducer } from "react";

const ACTION = {
  UPDATE_KEYWORD: "update_keyword",
  UPDATE_RATING: "update_rating",
  UPDATE_LANGUAGE: "update_language",
  RESET_FILTERS: "reset_filters",
};

const REDUCER = (state, action) => {
  switch (action.type) {
    case ACTION.UPDATE_KEYWORD:
      return {
        ...state,
        keyword: action.payload,
        times: state.times + 1,
      };
    case ACTION.UPDATE_RATING:
      return {
        ...state,
        rating: action.payload,
      };
    case ACTION.UPDATE_LANGUAGE:
      return {
        ...state,
        language: action.payload,
      };
    case ACTION.RESET_FILTERS:
      return {
        keyword: "",
        rating: "g",
        language: "en",
      };
    default:
      throw new Error(`Action ${action.type} not supported`);
  }
};

export default function useForm({
  initialKeyword,
  initialRating,
  initialLanguage,
}) {
  const [state, dispatch] = useReducer(REDUCER, {
    keyword: decodeURIComponent(initialKeyword),
    rating: initialRating,
    language: initialLanguage,
    times: 0,
  });
  const { keyword, rating, language, times, filter } = state;
  return {
    keyword,
    rating,
    language,
    times,
    filter,
    updateKeyword: (keyword) =>
      dispatch({
        type: ACTION.UPDATE_KEYWORD,
        payload: keyword,
      }),
    updateRating: (rating) =>
      dispatch({
        type: ACTION.UPDATE_RATING,
        payload: rating,
      }),
    updateLanguage: (language) =>
      dispatch({
        type: ACTION.UPDATE_LANGUAGE,
        payload: language,
      }),
    updateFilter: (filter) =>
      dispatch({ type: ACTION.RESET_FILTERS, payload: filter }),
  };
}
