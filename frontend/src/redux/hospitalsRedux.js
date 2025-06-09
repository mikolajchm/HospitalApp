export const getHospitals = ({ hospitals }) => hospitals;

const createActionName = (actionName) => `app/hospital/${actionName}`;

const LOAD_HOSP = createActionName('LOAD_HOSP');
const DELETE_HOSP = createActionName('DELETE_HOSP');

export const loadHosp = payload => ({
  type: LOAD_HOSP,
  payload
});

export const deleteHosp = payload => ({
  type: DELETE_HOSP,
  payload
})

const hospitalReducer = (statePart = null, action) => {
  switch(action.type){
    case LOAD_HOSP:
      return action.payload;
    case DELETE_HOSP:
      return null;
    default: 
      return statePart;
  }
};

export default hospitalReducer;