import { combineReducers, ReducersMapObject, AnyAction, Reducer } from "redux";
// import addReducer, { AddState } from "./addReducer";
import EdataReducer, { Edata } from "./edataReducer";
import isOnReadyReducer, { isOnReady } from "./onReady";

// 合并reducers，模块化
export interface CombinedState {
  // addReducer: AddState;
  EdataReducer: Edata;
  isOnReadyReducer: isOnReady;
  // LeaveReducer: leave;
}
const reducers: ReducersMapObject<CombinedState, AnyAction> = {
  // addReducer,
  EdataReducer,
  isOnReadyReducer,
  // LeaveReducer,
};
const reducer: Reducer<CombinedState, AnyAction> = combineReducers(reducers);

export default reducer;
