import { useReducer } from 'react';
import { createContext } from 'react';

const actionType = {
  submitFulfilled: 'SUCCESS SUBMIT',
  openDialogTaskDetail: 'OPEN DIALOG TASK DETAIL',
  setTaskId: 'setTaskId',
  changeStatusTask: 'CHANGE STATUS TASK',
};

const initialState = {
  successTrigger: false,
  isDialogTaskDetail: false,
  taskId: null,
  statusTask: null,
};

const boardReducer = (state, { type, payload }) => {
  switch (type) {
    case actionType.submitFulfilled:
      const updatedSuccess = {
        ...state,
        successTrigger: !state.successTrigger,
      };
      return updatedSuccess;
    case actionType.openDialogTaskDetail:
      const updatedDialogTaskDetail = {
        ...state,
        isDialogTaskDetail: !state.isDialogTaskDetail,
      };
      return updatedDialogTaskDetail;
    case actionType.setTaskId:
      const updatedTaskId = {
        ...state,
        taskId: payload,
      };
      return updatedTaskId;
    case actionType.changeStatusTask:
      const updatedStatusTask = {
        ...state,
        statusTask: payload,
      };
      return updatedStatusTask;
    default:
      return state;
  }
};

export const BoardContext = createContext({
  successTrigger: false,
  isDialogTaskDetail: false,
  taskId: null,
  statusTask: null,
  toggleTrigger: (prevState) => {},
  toggleDialogTaskDetail: (prevState) => {},
  setTaskId: (id) => {},
  changeStatusTask: (statusId) => {},
});

const BoardProvider = ({ children }) => {
  const [boardState, dispatch] = useReducer(boardReducer, initialState);

  const toggleTriggerHandler = (prev) => {
    dispatch({ type: actionType.submitFulfilled });
  };
  const toggleDialogTaskDetailHandler = (prev) => {
    dispatch({ type: actionType.openDialogTaskDetail });
  };

  const setTaskIdHandler = (id) => {
    dispatch({ type: actionType.setTaskId, payload: id });
  };

  const changeStatusTaskHandler = (statusId) => {
    dispatch({ type: actionType.changeStatusTask, payload: statusId });
  };

  const boardContext = {
    successTrigger: boardState.successTrigger,
    isDialogTaskDetail: boardState.isDialogTaskDetail,
    taskId: boardState.taskId,
    statusTask: boardState.statusTask,
    toggleTrigger: toggleTriggerHandler,
    toggleDialogTaskDetail: toggleDialogTaskDetailHandler,
    setTaskId: setTaskIdHandler,
    changeStatusTask: changeStatusTaskHandler,
  };
  return (
    <BoardContext.Provider value={boardContext}>
      {children}
    </BoardContext.Provider>
  );
};

export default BoardProvider;
