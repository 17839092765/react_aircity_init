import store from "../store";
import { EDATA } from "../store/action_types";
const Clickevent = (e: any) => {
  if (e.eventtype === "LeftMouseButtonClick") {
    console.log(e, "左键点击的回调");

    store.dispatch({
      type: EDATA,
      state: e,
    });
  } else if (e.eventtype === "camerabeginmove") {
    console.log(e, "导览开始的回调");
  } else if (e.eventtype === "camerastopmove") {
    console.log(e, "导览结束的回调");
  }
};
export { Clickevent };
