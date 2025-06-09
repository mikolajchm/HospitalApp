export const getBranches = ({ branches }) => branches;
export const getBranchesById = ({ branches }, id) => branches.find(branch => branch._id === id);
export const getBranchesByHospId = ({ branches }, idHosp) =>
  branches.find(branch => branch.idHospitals.includes(idHosp));

const createActionName = (actionName) => `app/branch/${actionName}`;

const LOAD_BRANCHES = createActionName('LOAD_BRANCHES');
const DELETE_BRANCHES = createActionName('DELETE_BRANCHES');

export const loadBranches = payload => ({
  type: LOAD_BRANCHES,
  payload
});

export const deleteBranches = payload => ({
  type: DELETE_BRANCHES,
  payload
})

const branchesReducer = (statePart = null, action) => {
  switch(action.type){
    case LOAD_BRANCHES:
      return action.payload;
    case DELETE_BRANCHES:
      return null;
    default: 
      return statePart;
  }
};

export default branchesReducer;