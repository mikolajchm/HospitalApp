export const getAllPatients = ({ patients }) => patients;
export const getPatientById = ({ patients }, id) => patients.find(patient => patient._id === id);

const createActionName = actionName => `app/patients/${actionName}`;

const UPDATE_PATIENTS = createActionName('UPDATE_PATIENTS');
const ADD_PATIENT = createActionName('ADD_PATIENT');
const EDIT_PATIENT = createActionName('EDIT_PATIENT');
const DELETE_PATIENT = createActionName('DELETE_PATIENT');
const CLEAR_PATIENTS = createActionName('CLEAR_PATIENTS');

export const updatePatients = payload => ({ type: UPDATE_PATIENTS, payload });
export const addPatient = payload => ({ type: ADD_PATIENT, payload });
export const editPatient = payload => ({ type: EDIT_PATIENT, payload });
export const deletePatient = payload => ({ type: DELETE_PATIENT, payload });
export const clearPatients = () => ({ type: CLEAR_PATIENTS });

const patientsReducer = (statePart = [], action) => {
  switch (action.type) {
    case UPDATE_PATIENTS:
      return [...action.payload];
    case ADD_PATIENT:
      return [...statePart, { ...action.payload }];
    case EDIT_PATIENT:
      return statePart.map(patient => patient._id === action.payload.id ? { ...patient, ...action.payload } : patient );
    case DELETE_PATIENT:
      return statePart.filter(patient => patient._id !== action.payload);
    case CLEAR_PATIENTS:
      return [];
    default:
      return statePart;
  };
};

export default patientsReducer;