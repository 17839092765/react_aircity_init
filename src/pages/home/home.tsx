import "./home.scss";
import { message, Button } from "antd";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
declare const window: Window & {
  __g: any;
  Color: any;
  TagData: any;
  HostConfig: any;
};
interface RootState {
  EdataReducer: {
    edata: object;
  };
  isOnReadyReducer: {
    isOnReady: boolean;
  };
}
const Home = () => {
  const edata: any = useSelector(
    (state: RootState) => state.EdataReducer.edata
  );
  const isOnReady: boolean = useSelector(
    (state: RootState) => state.isOnReadyReducer.isOnReady
  );
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    console.log(isOnReady, "模型是否加载完毕");

    if (isOnReady) {
      message.success("实例连接成功");
    } else {
      message.info("实例连接中...");
    }
  }, [isOnReady]);
  useEffect(() => {
    console.log(edata, "edata仓库发生变化");
  }, [edata]);
  const setWeather = () => {
    setFlag(!flag);
    if (window.__g) {
      window.__g.weather.setDarkMode(flag);
    }
  };
  // let tagNum = 0;
  const [tagNum, settagNum] = useState(1);
  const addTags = async () => {
    let o = new window.TagData("p1" + tagNum);
    console.log(edata);

    o.coordinate = edata.MouseClickPoint;
    o.imagePath = window.HostConfig.Path + "/images/tag.png";
    o.url = window.HostConfig.Path + "/int_popup.html";
    o.imageSize = [28, 28];
    o.text = "tag" + tagNum;
    o.range = [1, 8000.0];
    o.textRange = 3000;
    o.showLine = true;
    o.textColor = window.Color.Black;
    o.textBackgroundColor = window.Color.White;
    o.hoverImagePath = window.HostConfig.Path + "/images/hilightarea.png";
    await window.__g.tag.add(o);
    window.__g.tag.focus(o.id, 200, 0);
    settagNum(tagNum + 1);
  };
  useEffect(() => {
    async function addtag() {
      let o = new window.TagData("p1" + tagNum);
      console.log(edata);

      o.coordinate = edata.MouseClickPoint;
      o.imagePath = window.HostConfig.Path + "/images/tag.png";
      o.url = window.HostConfig.Path + "/int_popup.html";
      o.imageSize = [28, 28];
      o.text = "tag" + tagNum;
      o.range = [1, 8000.0];
      o.textRange = 3000;
      o.showLine = true;
      o.textColor = window.Color.Black;
      o.textBackgroundColor = window.Color.White;
      o.hoverImagePath = window.HostConfig.Path + "/images/hilightarea.png";
      await window.__g.tag.add(o);
      window.__g.tag.focus(o.id, 200, 0);
      settagNum(tagNum + 1);
    }
    if (isOnReady) {
      addtag();
      // eslint-disable-next-line
    }
  }, [isOnReady]);
  return (
    <div className="home">
      <Button onClick={setWeather} type="link">
        设置
      </Button>
      <Button onClick={addTags} type="link">
        添加标签
      </Button>
    </div>
  );
};
export default Home;
