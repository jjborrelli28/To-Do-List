export const toDoListReducer = (state = [], action) => {
  switch (action.type) {
    case "add":
      return [action.payload, ...state];
    case "delete":
      return state.filter((task) => task.id !== action.payload);
    case "edit":
      return state.map((task) => {
        if (task.id !== action.payload) {
          return task;
        }
        return {
          ...task,
          readOnly: !task.readOnly,
        };
      });
    case "editing":
      return state.map((task) => {
        if (task.id !== action.payload) {
          return task;
        }
        return {
          ...task,
          desc: action.desc ,
        };
      });
    default:
      return state;
  }
};
