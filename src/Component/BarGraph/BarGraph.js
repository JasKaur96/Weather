import React,{useState, useEffect} from 'react'
import {Group} from '@visx/group';
import { BarGroup } from '@visx/shape';
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

export default function BarGraph(props) {
    const [graph,setGraph] = useState([])
    const width = 800
    const height = 300

    const xMax = width - 80;
    const yMax = height - 80;
  
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
    
    const data = graph;
    console.log("seven ------", data,graph);
  
    const keys = props.urlCities;
    const dateScale = scaleBand({
        domain: data.map(sevenDaysWeather),
        padding: 0.2,
      });

    const cityScale = scaleBand({
        domain: keys,
        padding: 0.1,
    });
    const tempScale = scaleLinear({
        domain: [0, Math.max(...data.map(d => Math.max(...keys.map(key => Number(d[key])))))],
      });
      const colorScale = scaleOrdinal({
        domain: keys,
        range: [blue, green, purple,yellow]
    });

    const getDate = graph;

    dateScale.rangeRound([0, xMax]);
    cityScale.rangeRound([0, dateScale.bandwidth()]);
    tempScale.range([yMax, 0]);
   
    return width < 10 ? null : (
        <svg width={width} height={height}> 
            <rect x={0} y={0} width={width} height={"200%"} fill={background}        
            />  

            <Group top={300/2} left={500/2}>
                <BarGroup data={data}
                    keys={keys}
                    height={yMax}
                    x0={graph}
                    x0Scale={dateScale}
                    x1Scale={cityScale}
                    yScale={tempScale}
                    color={colorScale}>
                </BarGroup>
                {barGroups =>
                    barGroups.map(barGroup => (
                    <Group key={keys}>
                        {barGroup.bars.map(bar => (
                        <rect
                            key={bar.keys}
                            x={bar.x}
                            y={bar.y}
                            width={bar.width}
                            height={bar.height}
                            fill={bar.color}
                            rx={4}

                        />
                    ))}
                </Group>
                ))}
            </Group>
            <AxisBottom
                top={yMax + defaultMargin.top}
                // tickFormat={formatDate}
                scale={dateScale} 
                stroke={green}
                tickStroke={green}
                hideAxisLine
                // tickLabelProps={() => ({
                // fill: green,
                // fontSize: 11,
                // textAnchor: 'middle',
                // })}
            />
        </svg>
    )
}
