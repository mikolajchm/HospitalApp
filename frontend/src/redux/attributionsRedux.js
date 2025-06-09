export const getAllAttributions = ({ attributions }) => attributions;
export const getAttributionById = ({ attributions }, id) => attributions.find(attribution => attribution._id === id);

const createActionName = actionName => `app/attribution/${actionName}`;

const UPDATE_ATTRIBUTIONS = createActionName('UPDATE_ATTRIBUTIONS');
const ADD_ATTRIBUTION = createActionName('ADD_ATTRIBUTION');
const EDIT_ATTRIBUTION = createActionName('EDIT_ATTRIBUTION');
const DELETE_ATTRIBUTION = createActionName('DELETE_ATTRIBUTION');
const CLEAR_ATTRIBUTIONS = createActionName('CLEAR_ATTRIBUTIONS');

export const updateATTRIBUTIONs = payload => ({ type: UPDATE_ATTRIBUTIONS, payload });
export const addATTRIBUTION = payload => ({ type: ADD_ATTRIBUTION, payload });
export const editATTRIBUTION = payload => ({ type: EDIT_ATTRIBUTION, payload });
export const deleteATTRIBUTION = payload => ({ type: DELETE_ATTRIBUTION, payload });
export const clearATTRIBUTIONs = () => ({ type: CLEAR_ATTRIBUTIONS });

const ATTRIBUTIONsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_ATTRIBUTIONS:
      return [...action.payload];
    case ADD_ATTRIBUTION:
      return [...statePart, { ...action.payload }];
    case EDIT_ATTRIBUTION:
      return statePart.map(attribution => attribution._id === action.payload.id ? { ...attribution, ...action.payload } : attribution );
    case DELETE_ATTRIBUTION:
      return statePart.filter(attribution => attribution._id !== action.payload);
    case CLEAR_ATTRIBUTIONS:
      return [];
    default:
      return statePart;
  };
};

export default ATTRIBUTIONsReducer;