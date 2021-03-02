export const initialState = {
  page: 0,
};

export const LOAD_PAGE_0 = 'LOAD_PAGE_0';
export const LOAD_PAGE_1 = 'LOAD_PAGE_1';
export const LOAD_PAGE_2 = 'LOAD_PAGE_2';
export const LOAD_PAGE_3 = 'LOAD_PAGE_3';

const reducer = (
  state = initialState,
  action,
) => {
  switch (action.type) {
    case LOAD_PAGE_0:
      return { ...state, page: 0 };
    case LOAD_PAGE_1:
      return { ...state, page: 1 };
    case LOAD_PAGE_2:
      return { ...state, page: 2 };
    case LOAD_PAGE_3:
      return { ...state, page: 3 };
    default:
      return state;
  }
};

export default reducer;
