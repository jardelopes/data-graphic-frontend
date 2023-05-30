<template>
  <canvas ref="donutChart"></canvas>
</template>

<script>
import { Chart } from 'chart.js/auto';

export default {
  name: 'DonutChart',
  props: {
    labels: {
      type: Array,
      required: true,
    },
    data: {
      type: Array,
      required: true,
    },
  },
  mounted() {
    this.renderDonutChart();
  },
  methods: {
    renderDonutChart() {
      const ctx = this.$refs.donutChart.getContext('2d');

      if (this.donutChart) {
        this.donutChart.destroy();
      }

      this.donutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.labels,
          datasets: [{
            data: this.data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
          }],
        },
      });
    },
  },
};
</script>
