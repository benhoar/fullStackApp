import './graph.css'

import { Bar } from 'react-chartjs-2'
import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   PointElement,
   BarElement,
   Title,
   Tooltip,
   Legend,
 } from 'chart.js';

 ChartJS.register(
   CategoryScale,
   LinearScale,
   PointElement,
   BarElement,
   Title,
   Tooltip,
   Legend
 );

 ChartJS.defaults.font.size = 16;
 ChartJS.defaults.font.family= ['Dosis', 'sans-serif']

 const Graph = ({data, title}) => {

   const labels = ["1","2","3","4","5","6","7","8","9","10"]

   const options = {
      events: [],
      maintainAspectRatio: false,
      indexAxis: 'x',
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        title: {
          display: false,
        },
        legend: {
         display: false
        },
        datalabels: {
          display: false
        },
      },
      scales: {
         x: {
            display: false,
            grid: {
               display: false,
            },
            border: {
               display: false,
            }
         },
         y: {
            display: false,
            grid: {
               display: false,
            },
            border: {
               display: false,
            },
            position: 'right',
         },
      }
    };

    const tograph = {
      labels,
      datasets: [
        {
          label: 'Scores',
          data: data,
          borderColor: 'rgb(27, 58, 32)',
          backgroundColor: 'rgba(27, 58, 32, 0.2)',
        },
      ],
    };

   return (
      <Bar data={tograph} options={options}/>
   )
 }
 
 export default Graph