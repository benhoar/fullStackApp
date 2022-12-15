import './graph.css'

import { Pie } from 'react-chartjs-2'
import ChartDataLabels from 'chartjs-plugin-datalabels'

import {
   Chart as ChartJS,
   CategoryScale,
   LinearScale,
   ArcElement,
   PieController,
   Title,
   Tooltip,
   Legend,
 } from 'chart.js';

 ChartJS.register(
   CategoryScale,
   LinearScale,
   PieController,
   ArcElement,
   Title,
   Tooltip,
   Legend,
   ChartDataLabels
 );

 ChartJS.defaults.font.size = 16;
 ChartJS.defaults.font.family= ['Dosis', 'sans-serif']

 const Graph = ({data, title}) => {

   const labels = ["1","2","3","4","5","6","7","8","9","10"]

   const options = {
      maintainAspectRatio: false,
      elements: {
        bar: {
          borderWidth: 2,
        },
      },
      responsive: true,
      plugins: {
        title: {
          display: false,
          text: `${title} Scores`,
          font: {
            size: 20,
          }
        },
        legend: {
         display: false
        },
        datalabels: {
          color: "white"
        }
      },
    };

    const tograph = {
      labels: labels,
      datasets: [{
        label: 'My First Dataset',
        data: data,
        backgroundColor: [
          'rgb(5, 30, 17)',
          'rgb(3, 48, 24)',
          'rgb(28, 61, 35)',
          'rgb(42, 91, 49)',
          'rgb(54, 131, 64)',
          'rgb(50, 181, 74)',
          'rgb(103, 179, 98)',
          'rgb(138, 175, 135)',
          'rgb(155, 174, 154)',
          'rgb(166, 170, 168)',
          'rgb(100, 99, 132)',
        ],
        hoverOffset: 4
      }]
    };

   return (
      <Pie data={tograph} options={options} plugins={[ChartDataLabels]}/>
   )
 }
 
 export default Graph