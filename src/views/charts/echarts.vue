<template>
  <section class="chart-container">
    <el-row>
      <el-col :span="12">
        <div ref="testChart" style="width:1400px; height:650px;position: absolute;left:20px;top: 10px;"></div>
      </el-col>
    </el-row>
  </section>
  <div class="realtime-display">
    <div v-for="(playerData, index) in limitedUser" :key="index">
      <p>
        <span class="user-name">{{ getPlayerName(playerData) }}</span>: 
        <span class="commend">{{ getComment(playerData) }}</span>
      </p>
    </div>
    </div>
</template>

<script>
import * as echarts from 'echarts';
import axios from "axios";

export default {
  data() {
    return {
      testChart: null,
      UserName: [],
      maxDisplay: 7
    }
  },
  computed: {
    limitedUser() {
      return this.UserName.slice(-this.maxDisplay);
    },
  },
  methods: {
    //绘图
    drawTestChart() {
      axios.get("http://localhost:9527/ranks").then(res => {
        this.testChart = echarts.init(this.$refs.testChart);
        this.testChart.setOption({
          xAxis: {
            max: 'dataMax'
          },
          yAxis: {
            type: 'category',
            data: res.data.x,
            inverse: true,
            animationDuration: 300,
            animationDurationUpdate: 300,
            max: 25
          },
          
          series: [
            {
              realtimeSort: true,
              name: 'Steam Score Top25',
              data: res.data.y,
              type: 'bar',
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
            animationDuration: 0,
            animationDurationUpdate: 2000,
            animationEasing: 'linear',
            animationEasingUpdate: 'linear'
        });
      });
    },
    fetchDataAndRefreshChart() {
      axios.get("http://localhost:9527/ranks").then(res => {
        this.drawTestChart(res.data);
      }).catch(error => {
        //打印错误
      });
    },

  // 评论消息
    fetchPlayerData() {
        axios.get('http://localhost:9527/user_commends')
          .then(response => {
            this.UserName.push({
              UserName: response.data.UserName,
              Comment: response.data.Commend
          });

          if (this.UserName.length > this.maxDisplay) {
            this.UserName.shift();
          }

          })
          .catch(error => {
            console.error('Error fetching player data:', error);
          });
      },

       //更新函数
    startRealtimeUpdates() {
      this.fetchDataAndRefreshChart();
      this.fetchPlayerData();
      setInterval(() => {
        this.fetchDataAndRefreshChart();
        this.fetchPlayerData();
      }, 2000);
    },

      drawCharts() {
      this.drawTestChart();
      this.startRealtimeUpdates();
    },

    getPlayerName(data) {
      return data.UserName;
    },
    getComment(data) {
      return data.Comment;
    },

  },

  mounted() {
    this.drawCharts();
  },
}
</script>
<style scoped>
.el-col {
  padding: 30px 20px;
}
.user-name{
  font-weight: 30px;
  font-size: 25px;
  color: blue;
}
.commend{
  font-weight: 10px;
}
.user-name{
  background: linear-gradient(to right, rgba(190, 104, 255, 0.2), rgba(118, 41, 138, 0.2));
}
.realtime-display{
  width: 600px;
  position: relative;
  top: 65%;
  left: 28%;
}
</style>