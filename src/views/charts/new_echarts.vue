<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="12">
        <div ref="BerChart" style="width:1000px; height:400px;"></div>
      </el-col>
    </el-row>
  </section>
</template>

<script>
import * as echarts from 'echarts';
import axios from "axios";
export default {
  data() {
    return {
      Berchart: null,
    }
  },
  methods: {
    drwBerChart() {
      axios.get("http://localhost:9527/ranks").then(res => {
        this.Berchart = echarts.init(this.$refs.Berchart);
        this.Berchart.setOptions({
          xAxis: {
            max: 'dataMax'
          },
          yAxis: {
            type: 'category',
            data: res.data.x,
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 2
          },
          series: [
            {
              realtimeSort: true,
              name: 'X',
              type: 'bar',
              data: res.data.y,
              label: {
                show: true,
                position: 'right',
                valueAnimation: true
              }
            }
          ],
          legend: {
            show: true
          },
        })
        
      })
    },

    drawCharts() {
      this.drwBerChart()
    },

  },

  mounted() {
    this.drawCharts();
  }
}
</script>
<style scoped>
/* .chart-container {
  width: 100%;a
  float: left;
} */
.el-col {
  padding: 30px 20px;
}
</style>