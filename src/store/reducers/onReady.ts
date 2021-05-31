import * as types from "../action_types";
import { AnyAction } from "redux";

// 定义参数接口
export interface isOnReady {
  isOnReady: boolean;
}

// 初始化state
let initialState: isOnReady = {
  isOnReady: false,
};

// 返回一个reducer
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: isOnReady = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.isOnReady:
      console.log(action);
      // payload为传入的参数
      return { isOnReady: action.isOnReady };
    default:
      return state;
  }
};
