import "./home.scss";
import { message, Button } from "antd";
import { useEffect, useState } from "react";
declare const window: Window & {
  __g: any;
};
const Home = () => {
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
