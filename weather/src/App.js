import React, { useState } from "react";
import styled from "styled-components";
import axios from "axios";
import {
  TiWeatherSunny,
  TiWeatherStormy,
  TiWeatherShower,
  TiWeatherDownpour,
  TiWeatherSnow,
  TiWeatherCloudy,
} from "react-icons/ti";
import { BsCloudFog } from "react-icons/bs";
import { MdLocationPin } from "react-icons/md";
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown } from "react-icons/io";

const api = {
  key: "a422f44283aac58f0d215db5d78a2834",
  base: "https://api.openweathermap.org/data/2.5/",
};

function Weather({ setCold }) {
  // 날짜 가져오기
  const dateBuilder = (d) => {
    let months = [
      "1월",
      "2월",
      "3월",
      "4월",
      "5월",
      "6월",
      "7월",
      "8월",
      "9월",
      "10월",
      "11월",
      "12월",
    ];

    // sunday 먼저..!!
    let days = ["일", "월", "화", "수", "목", "금", "토"];
    let day = days[d.getDay()];
    let month = months[d.getMonth()];
    let year = d.getFullYear();
    let date = d.getDate();

    return `${year}년 ${month} ${date}일 ${day} `;
  };
  //lon:126.9778, lat:37.5683
  //https://pro.openweathermap.org/data/2.5/forecast/climate?lat=37&lon=126.9778&appid=3ad1d1f3a704fea952da06944931bbd0
  const city = "Seoul";
  const url = `https://api.openweathermap.org/data/2.5/forecast?lat=37.5683&lon=126.9778&appid=3ad1d1f3a704fea952da06944931bbd0`;
  const [weather, setWeather] = useState("");
  const [phrase, setPhrase] = useState("");
  const weatherNumber = (parseInt(weather.id) / 100).toFixed(0);
  // 날씨 가져오기
  React.useEffect(() => {
    axios.get(url).then((responseData) => {
      const data = responseData.data;
      console.log(data.list)
      // setWeather({
      //   id: data.weather[0].id,
      //   currentTemperature: data.main.temp,
      //   minTemperature: data.main.temp_min,
      //   maxTemperature: data.main.temp_max,
      //   main: data.weather[0].main,
      //   loading: false,
      //   icon: data.weather[0].icon,
      // });
      setWeather(data.list)
      console.log(weather)
      if (weatherNumber === "0") {
        setPhrase("맑음");
      } else if (weatherNumber === "2") {
        setPhrase("비");
      } else if (weatherNumber === "3") {
        setPhrase("흐림");
      } else if (weatherNumber === "5") {
        setPhrase("비");
      } else if (weatherNumber === "6") {
        setPhrase("눈");
      } else if (weatherNumber === "7") {
        setPhrase("안개");
      } else {
        setPhrase("구름");
      }
    });
  }, []);

  let currentTemperature = weather.currentTemperature - 273.15;
  let minTemperature = weather.minTemperature - 273.15;
  let maxTemperature = weather.maxTemperature - 273.15;
  //   setCold(c < 15 ? true : false);

  const selectIcon = (k) => {

    let iconId =
      Number(k) == 800 ? String(0) : (parseInt(k) / 100).toFixed(0);

    switch (iconId) {
      case "0":
        return <TiWeatherSunny size="80px" color="red" />;
      case "2":
        return <TiWeatherStormy size="80px" color="black" />;
      case "3":
        return <TiWeatherShower size="80px" color="blue" />;
      case "5":
        return <TiWeatherDownpour size="80px" color="white" />;
      case "6":
        return <TiWeatherSnow size="80px" color="white" />;
      case "7":
        return <BsCloudFog size="80px" color="white" />;
      case "8":
        return <TiWeatherCloudy size="80px" color="white" />;
    }
  };
  
  const selectWord = (k) => {
    const weatherNumber =   Number(k) == 800 ? String(0) : (parseInt(k) / 100).toFixed(0);
    console.log(weatherNumber)
    if (weatherNumber === "0") {
      return "맑음"
    } else if (weatherNumber === "2") {
      return "비"
    } else if (weatherNumber === "3") {
      return "흐림"
    } else if (weatherNumber === "5") {
      return "비"
    } else if (weatherNumber === "6") {
      return "눈"
    } else if (weatherNumber === "7") {
      return "안개"
    } else {
       return "구름 많음"
    }
  }

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: 'center', marginTop: "10%" }}>
      
        { weather?
        weather.map((e, idx) => {
        
            if(idx%8==1)
            return (
              <Wrap>
                <Top>
                  <Left>
                    <div style={{fontSize:20,color:"white",display:"flex",justifyContent:"center",alignItems:"center",textAlign:"center",marginBottom:"20px"}}>
                    {e.dt_txt.split(" ")[0].split("-")[1]+"월"+e.dt_txt.split(" ")[0].split("-")[2]+"일"}
                    </div>
                 
                    <LeftTop>
                      <MdLocationPin
                        style={{ color: "#FF5656", width: "24px", height: "24px" }}
                      />
                      <City>서울시</City>
                    </LeftTop>
      
                    <Temperature>{(e.main.temp - 273.15).toFixed(0)}℃</Temperature>
                    <OtherTemp>
                      <IoIosArrowDown
                        style={{
                          color: "#61C5B8",
                          width: "24px",
                          height: "24px",
                          marginTop: "-5px",
                        }}
                      />
                      <MinMaxTemp>{(e.main.temp_min-273.15).toFixed(0)}℃</MinMaxTemp>
      
                      <IoIosArrowUp
                        style={{
                          color: "#FF5656",
                          width: "24px",
                          height: "24px",
                          marginTop: "-7px",
                        }}
                      />
                      <MinMaxTemp>{(e.main.temp_max-273.15).toFixed(0)}℃</MinMaxTemp>
                    </OtherTemp>
                  </Left>
      
                   
       
                </Top>
                <Bottom>
                   <WeatherIcon>{selectIcon(e.weather[0].id)}</WeatherIcon>
                  {selectWord(e.weather[0].id)}</Bottom>
                </Wrap>
            )
          })
          :""
        }
      
  
    </div>
    
  );
}
export default Weather;

const Wrap = styled.div`
  width: 15%;
  height: 300px;
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  /* aspect-ratio: 4 / 2; */
  background-color: #86d3ff;
  border-radius: 14px;
  margin: 0 10px;
`;

const Top = styled.div`
/* border: 1px solid orange; */
display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Temperature = styled.div`
  font-size: 28px;
  line-height: 36px;
  color: #fff;
  margin-left: 8px;
  margin-bottom: 12px;
`;
const OtherTemp = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
`;
const MinMaxTemp = styled.div`
  font-weight: normal;
  font-size: 14px;
  line-height: 16px;
  margin-right: 8px;
`;

const City = styled.div`
  color: #fff;
  
`;
const LeftTop = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
`;

const DateDiv = styled.div`
  color: #444;
  font-size: 15px;
  font-style: italic;
`;

const Right = styled.div`
  color: white;
`;

const WeatherIcon = styled.div`
`;

const Bottom = styled.div`
font-size: 16px;
padding-top: 4px;
display:flex;
flex-direction:column;
justify-content:center;
align-items:center;
`
