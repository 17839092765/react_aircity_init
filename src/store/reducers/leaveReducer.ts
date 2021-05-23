import * as types from "../action_types";
import { AnyAction } from "redux";

// 定义参数接口
export interface leave {
  leave: string;
}

// 初始化state
let initialState: leave = {
  leave: "World",
};

// 返回一个reducer
// eslint-disable-next-line import/no-anonymous-default-export
export default (state: leave = initialState, action: AnyAction) => {
  switch (action.type) {
    case types.LEAVE:
      console.log(action, 88888888);
      // payload为传入的参数
      return { leave: action.state };
    default:
      return state;
  }
};
