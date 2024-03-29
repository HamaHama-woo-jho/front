export const initialState = {
  keyword: '',
  location: ['북측', '서측', '동측', '어은동', '궁동'],
  priceLow: 0,
  priceHigh: 999999999,
  from: null,
  to: null,
  hashtags: [],
};

export const FILTER_KEYWORD = 'FILTER_KEYWORD';
export const FILTER_LOCATION_ADD = 'FILTER_LOCATION_ADD';
export const FILTER_LOCATION_REMOVE = 'FILTER_LOCATION_REMOVE';
export const FILTER_LOCATION = 'FILTER_LOCATION';
export const FILTER_PRICE = 'FILTER_PRICE';
export const FILTER_DATE = 'FILTER_DATE';
export const CLEAR_FILTER = 'CLEAR_FILTER';
export const FILTER_HASHTAG = 'FILTER_HASHTAG';
export const FILTER_HASHTAG_REMOVE = 'FILTER_HASHTAG_REMOVE';
export const FILTER_HASHTAG_REMOVE_ALL = 'FILTER_HASHTAG_REMOVE_ALL';

export const locationAddAction = (data) => ({
  type: FILTER_LOCATION_ADD,
  data,
});

export const locationRemoveAction = (data) => ({
  type: FILTER_LOCATION_REMOVE,
  data,
});

const reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case FILTER_KEYWORD:
      return {
        ...state,
        keyword: action.data,
      };
    case FILTER_LOCATION_ADD:
      return {
        ...state,
        location: [...state.location, action.data],
      };
    case FILTER_LOCATION_REMOVE:
      return {
        ...state,
        location: state.location.filter((item) => item !== action.data),
      };
    case FILTER_PRICE:
      return {
        ...state,
        priceLow: Math.min(...action.data),
        priceHigh: Math.max(...action.data),
      };
    case FILTER_DATE:
      return {
        ...state,
        from: action.data.from,
        to: action.data.to,
      };
    case FILTER_HASHTAG:
      return {
        ...state,
        hashtags: [...new Set([...state.hashtags, action.data])],
      };
    case FILTER_HASHTAG_REMOVE:
      return {
        ...state,
        hashtags: state.hashtags.filter((tag) => tag.content !== action.data),
      };
    case FILTER_HASHTAG_REMOVE_ALL:
      return {
        ...state,
        hashtags: [],
      };
    case CLEAR_FILTER:
      return initialState;
    default:
      return state;
  }
};

export default reducer;
