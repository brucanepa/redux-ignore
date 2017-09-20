
const createActionHandler = ignore => {
  return (reducer, actions = {}) => {
    const predicate = (action) => actions[action.type];

    const initialState = reducer(undefined, {});

    return (state = initialState, action) => {
      if (predicate(action)) {
        return ignore ? state : reducer(state, action)
      }
      return ignore ? reducer(state, action) : state;
    };
  };
};

export const createReducerByFilteringActions = createActionHandler(false);

export const createReducerByIgnoringActions = createActionHandler(true);