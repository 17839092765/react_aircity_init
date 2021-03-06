import { FC, useEffect } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { Clickevent } from "./util/clickEvent";
import { isOnReady } from "./store/action_types";

import "./assets/reset.css";
import Home from "./pages/home/home";

declare const window: Window & {
  AirCityPlayer: any;
  AirCityAPI: any;
  __g: any;
  HostConfig: any;
  // getQueryVariable: any;
};
const App: FC = () => {
  const Dispatch = useDispatch();

  const log = (e: any) => {
    // console.log(e);
  };

  useEffect(() => {
    const getMatchServerConfig = (host: any, fn: any, callbackIndex: any) => {
      if ("WebSocket" in window) {
        var url = `ws://${host}`;
        let __fn = fn;

        var ws = new WebSocket(url);
        ws.onopen = function () {
          this.send(
            JSON.stringify({
              command: 6,
              callbackIndex: callbackIndex,
            })
          );
        };

        ws.onmessage = function (event) {
          var o = JSON.parse(event.data);
          __fn(o);
        };
        ws.onclose = function () {};
        ws.onerror = function (event) {};
      } else {
        log("Not Support WebSocket!");
      }
    };
    const initInterface = (withPlayer: boolean, withApi: boolean) => {
      //AirCityPlayer
      if (withPlayer) {
        let options = {
          domId: "player",
          token: window.HostConfig.Token,
          showMarker: true,
          showStartupInfo: true,
        };
        new window.AirCityPlayer(
          window.HostConfig.instanceId || window.HostConfig.AirCityPlayer,
          options
        );

        // let p_bitrate = window.getQueryVariable("bitrate"); //2021.04.16 Add 从参数中解析码率
        // p_bitrate && aircityPlayer.setBitrate(p_bitrate);
      }

      //AirCityAPI
      if (withApi) {
        new window.AirCityAPI(
          window.HostConfig.instanceId || window.HostConfig.AirCityAPI,
          {
            onReady: () => {
              //此时可以调用接口了
              // window.__g.camera.get((r: any) => {
              //   log(`Camera: ${r.x}, ${r.y}, ${r.z}, ${r.pitch}, ${r.yaw}`);
              // });
              console.log("此时可以调用接口了");
              // 发送实例加载完成的信号
              Dispatch({
                type: isOnReady,
                isOnReady: true,
              });
            },
            // 'onApiVersion': (vNo, vType) => {
            //     var spanVer = document.getElementById('spanVer');
            //     if (spanVer) {
            //         if (__g.misc.isApiVersionMatched()) {
            //             spanVer.innerHTML = '<font color=green>' + __g.misc.apiVersion + '</font>';
            //         }
            //         else {
            //             spanVer.innerHTML = 's:<font color=red>' + __g.misc.apiVersionServer + '</font>-c:' + __g.misc.apiVersion;
            //             logWithColor('red', '<b>JS SDK版本和云渲染服务器版本不一致，可能造成接口调用错误，请确认!</b>');
            //             log(spanVer.innerHTML);
            //             log('');
            //         }
            //     }
            // },
            onEvent: (e: any) => {
              onEvent(e);
            },
            onLog: log,
            useColorLog: false, //仅用于SDK测试页面，二次开发请设置为false
          }
        );
      }
    };
    const init = (withPlayer: boolean, withInterface: boolean) => {
      // if (window.location.search.indexOf("ms") !== -1) {
      //页面地址加参数： http://192.168.1.222/int.html?ms
      getMatchServerConfig(
        window.HostConfig.MatchServer,
        function (o: { result: number; instanceId: any }) {
          console.log(o, "实例信息");

          if (o.result === 0) {
            window.HostConfig.instanceId = o.instanceId;
            initInterface(withPlayer, withInterface);

            //更新页面显示
            // let host = window.AirCityAPI.getHostFromInstanceId(o.instanceId);
            // if (host) {
            //     document.getElementById('txtIP') && (document.getElementById('txtIP').value = host[0]);
            //     document.getElementById('txtPort') && (document.getElementById('txtPort').value = host[1]);
            // }
          } else {
            // alert("云渲染资源已满，请稍候再试");
            initInterface(withPlayer, withInterface);
          }
        },
        null
      );
      // } else {
      //   initInterface(withPlayer, withInterface);
      // }
    };
    const onload = () => {
      init(true, true);
    };
    const onResize = () => {
      let player: any = document.getElementById("player");
      player.style.height = window.innerHeight + "px";
      player.style.width = window.innerWidth + "px";
    };
    const beforeunloadHandler = () => {
      console.log("页面刷新前");
      window.__g.reset();
      window.__g.camera.set(
        -22.46789,
        -725.425476,
        855.468506,
        -34.895367,
        -72.82061,
        0
      );
    };
    const onEvent = (e: any) => {
      console.log(e, "所有模型交互的回调--没有业务逻辑");
      Clickevent(e);
      // if (e.eventtype === "LeftMouseButtonClick") {
      //   console.log(e, "左键点击的回调");

      //   Dispatch({
      //     type: EDATA,
      //     state: e,
      //   });
      // } else if (e.eventtype === "camerabeginmove") {
      //   console.log(e, "导览开始的回调");
      // } else if (e.eventtype === "camerastopmove") {
      //   console.log(e, "导览结束的回调");
      // }
    };
    window.addEventListener("load", onload, true);
    window.addEventListener("resize", onResize, true);
    window.addEventListener("beforeunload", beforeunloadHandler, false);
  }, [Dispatch]);
  return (
    <>
      <div className="App">
        <div>
          <Home />
        </div>
        <div id="player"></div>
      </div>
    </>
  );
};

export default App;
