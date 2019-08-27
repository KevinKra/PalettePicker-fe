export const userProjects = (state = [], action) => {
  switch (action.type) {
    case "ADD_USER_PROJECTS":
      return action.project;
    // case "CREATE_NEW_PROJECT":
    //   return action.project;
    // case "UPDATE_EXISTING_PROJECT":
    //   return action.project;
    case "REMOVE_USER_PROJECT":
      return state.filter(project => project.projectId !== action.id);
    case "LOGOUT_USER":
      const resetState = [];
      return resetState;
    default:
      return state;
  }
};
