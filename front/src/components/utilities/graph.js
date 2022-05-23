import React, { useEffect, useState} from 'react';
import Chart from 'chart.js/auto';
import {getRelativePosition} from 'chart.js/helpers'
import axios from 'axios';

const Graph = (props)=> {

  const [info, setInfo] = useState(props.state.firms);
  const [avg, setAvg] = useState(props.avg);
  const [chart, setChart] = useState()
  useEffect(() => {
    setInfo(props.state.firms)
    //determine graphable timeframe (hardcoded at 10 years from today)
    let years = []
    for (var i = 10; i >= 0; i--) {
      let current = new Date().getFullYear()
      years.push(current-i)
    }

    //create list of graphable data (graphables)
    let datasets = []
    let industry=[]
    props.state.firms.forEach((firm, i) => {
      let temp=[]
        years.forEach((year, i) => {
          firm.ratios.forEach((ratio, i) => {//extract specifc ratio
            if(ratio.calendarYear==year){
              temp.push(ratio.quick)
            }
          });
        });
        if(temp.length>0){//if extraction was successful add to list of graphables
          let color = genRGBA()
          datasets.push({
            label: firm.name,
            data: temp,
            borderColor: color,
            backgroundColor: color,
            borderWidth: 1
          })
        }
    });
    //calculate industry averages and add to graphable data
    avg.forEach((year, i) => {
      industry.push(year.quick)
    });
    datasets.push({
      label: 'AVG',
      data: industry,
      borderColor: 'rgba(1,1,122, 1)',
      borderWidth: 5,
      tension:0.1
    })

    if(chart){
      console.log('state.firms'+props.state.firms)
      chart.data={
        labels:years,
        datasets:datasets
      }
      chart.update()//updates chart if exists
    }else{
      //chart code
      let marked = ''
      const ctx = 'myChart';
      const graph = new Chart(ctx, {
      type: 'line',
      data: {
          labels: years,
          datasets: datasets
      },
      options: {
          scales: {
              y: {
                  beginAtZero: true
                  }
              },
          onClick: (e)=>{
            map(e,graph,(x)=>{
                props.update({year:x.label,firms:info})
            })
          },
          onHover: (e,x,y)=>{
            map(e,graph,(x)=>{
              emphasize(x,graph,marked)
            })
          }
        }
      });
      setChart(graph)
    }//creates chart if does not exist

  },[props.state.firms])
//HELPER FUNCTIONS
const genRGBA=()=>{
  var o = Math.round, r = Math.random, s = 255;
  return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + 0.5 + ')';
} //generates random colors with fixed transparency
const emphasize=(x,chart,marked)=>{
    let targets = chart.scales.x._gridLineItems
    let label = x.value
    if(label!=marked){
      targets.forEach((target, i) => {
        chart.scales.x._labelItems[i].color='#666'
        chart.scales.x._labelItems[i].font.style='normal'
        chart.scales.x._gridLineItems[i].width=1
        chart.scales.x._gridLineItems[i].tickColor='rgba(0,0,0,0.11)'
        chart.render()
        if(i==label){
          marked=i
          chart.scales.x._labelItems[i].color='#276CA1'
          chart.scales.x._labelItems[i].font.style='bold'
          chart.scales.x._gridLineItems[i].width=5
          chart.scales.x._gridLineItems[i].tickColor='rgba(39,108,161,1)'
          chart.render()
        }
      });
    }
  }//controls graph markers
const map=(e, chart,callback)=>{
    let canvasPosition = getRelativePosition(e, chart);
    let labels = chart.scales.x.ticks
    let dataX = chart.scales.x.getValueForPixel(canvasPosition.x);
    labels.forEach((label, i) => {
        if(label.value==dataX){
          callback(label)
        }
    });
}//map mouse coords to labels
const read=(obj)=>{
  var seen = [];
JSON.stringify(obj, function(key, val) {
   if (val != null && typeof val == "object") {
        if (seen.indexOf(val) >= 0) {
            return;
        }
        seen.push(val);
    }

});return seen
}//improved JSON.stringify
 return (
    <canvas id="myChart" width="400" height="400"></canvas>


 )

}

export default Graph;
