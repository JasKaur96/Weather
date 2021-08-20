import React,{useState, useEffect} from 'react'
import {Group} from '@visx/group';
import { Bar, BarGroup } from '@visx/shape';
import { AxisBottom } from '@visx/axis';
import { scaleBand, scaleLinear, scaleOrdinal } from '@visx/scale';

import Service from "../../Services/CityService";

const service = new Service();

const blue = '#aeeef8';
export const green = '#e5fd3d';
const purple = '#9caff6';
export const yellow = '#FFFF00';
export const background = '#612efb';

const defaultMargin = { top: 20, bottom: 20, left: 20, right: 20 };

const colorScale = scaleOrdinal({
    // domain: keys,
    range: [blue, green, purple,yellow],
  });

export default function BarGroupGraph(props) {
    const [graph,setGraph] = useState([])
    const width = 700
    const height = 300
    const margin = { top: 20, bottom: 20, left: 20, right: 20 };

   
    // Then we'll create some bounds
    const xMax = width - margin.left - margin.right;
    const yMax = height - margin.top - margin.bottom;
  
    useEffect(() => {
        sevenDaysWeather();
    }, []);

    const sevenDaysWeather = () => {
        let tempArr = []
        if(props.dailyTemp && props.dailyTemp.daily){
            props.dailyTemp.daily.map((temp)=>{
                   tempArr.push(temp.temp.day);
                })
            console.log("seven days graph details here", tempArr);           
        }
        setGraph(tempArr)
    }
    

    // We'll make some helpers to get at the data we want
    const x = d => d.dt;
    const y = d => +d.graph * 100;
  
    // And then scale the graph by our data
    const xScale = scaleBand({
        range: [0, xMax],
        round: true,
        domain: graph.map(x),
        padding: 0.4,
    });
    const yScale = scaleLinear({
        range: [yMax, 0],
        round: true,
        domain: [0, Math.max(...graph.map(y))],
    });


  const compose = (scale, accessor) => data => scale(accessor(data));
const xPoint = compose(xScale, x);
const yPoint = compose(yScale, y);

// Finally we'll embed it all in an SVG
  return (
    <svg width={width} height={height}>
      {graph.map((d, i) => {
        const barHeight = yMax - yPoint(d);
        return (
          <Group key={`bar-${i}`}>
            <Bar
              x={xPoint(d)}
              y={yMax - barHeight}
              height={barHeight}
              width={xScale.bandwidth()}
              fill="#fc2e1c"
            />
          </Group>
        );
      })}
    </svg>
  );


   
   
}
