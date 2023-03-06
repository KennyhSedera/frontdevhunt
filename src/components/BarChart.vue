<template>
    <v-card width="500">
      <Bar
        :chart-options="chartOptions"
        :chart-data="chartData"
        :chart-id="chartId"
        :dataset-id-key="datasetIdKey"
        :plugins="plugins"
        :css-classes="cssClasses"
        :styles="styles"
        :width="width"
        :height="height"
      />
    </v-card>
    </template>
    
    <script>
    
    import { Bar } from 'vue-chartjs'
    import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
    
    ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    
    export default {
      name: 'BarChart',
      components: { Bar },
      props: {
        chartId: {
          type: String,
          default: 'bar-chart'
        },
        datasetIdKey: {
          type: String,
          default: 'label'
        },
        width: {
          type: Number,
          default: 400
        },
        height: {
          type: Number,
          default: 400
        },
        cssClasses: {
          default: '',
          type: String
        },
        styles: {
          type: Object,
          default: () => {}
        },
        plugins: {
          type: Object,
          default: () => {}
        }
      },
      data() {
        return {
          chartData: {
            labels: [ 'January', 'February', 'March', 'January', 'February', 'March' ],
            backgroundColor: ['red', 'green', 'grey', 'blue', 'orange', 'purpel'],
            datasets: [ { data: [40, 20, 12, 40, 20, 12] } ]
          },
          chartOptions: {
            responsive: true
          }
        }
      }
    }
    </script>