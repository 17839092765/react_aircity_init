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
  EdataReducer: object;
}
const Home = () => {
  const edata: any = useSelector((state: RootState) => state.EdataReducer);
  const [flag, setFlag] = useState(false);
  useEffect(() => {
    let timer = setInterval(() => {
      let is__g = window.__g;
      console.log(is__g, 44444444);

      if (is__g) {
        message.success("实例连接成功");
        clearInterval(timer);
      } else {
        // message.info("实例连接中...");
      }
    }, 1000);
  }, []);
  useEffect(() => {
    console.log(edata);
    // if (window.__g) {
    //   let o = new window.TagData("p1");
    //   o.coordinate = edata.MouseClickPoint;
    //   o.imagePath = window.HostConfig.Path + "/images/tag.png";
    //   o.url = window.HostConfig.Path + "/int_popup.html";
    //   o.imageSize = [28, 28];
    //   o.text = "北京银行";
    //   o.range = [1, 8000.0];
    //   o.textRange = 3000;
    //   o.showLine = true;
    //   o.textColor = window.Color.Black;
    //   o.textBackgroundColor = window.Color.White;
    //   o.hoverImagePath = window.HostConfig.Path + "/images/hilightarea.png";
    //   window.__g.tag.add(o);
    //   window.__g.tag.focus(o.id, 200, 0);
    // }
  }, [edata]);
  const setWeather = () => {
    setFlag(!flag);
    if (window.__g) {
      window.__g.weather.setDarkMode(flag);
    }
  };
  return (
    <div className="home">
      <Button onClick={setWeather} type="link">
        设置
      </Button>
    </div>
  );
};
export default Home;
