<template>
    <div class="realtime-display">
      <div v-for="(player, index) in players" :key="index">
        <h3>{{ player.UserName }}</h3>
        <p>{{ player.Commend }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        players: [],
      };
    },
    methods: {
      fetchPlayerData() {
        axios.get('http://localhost:9527/user_commends')
          .then(response => {
            this.players = response.data;
            console.log(response.data.UserName+' '+response.data.Commend);

          })
          .catch(error => {
            console.error('Error fetching player data:', error);
          });
      },
      startRealtimeUpdates() {
        this.fetchPlayerData();
        
        setInterval(() => {
          this.fetchPlayerData();
        }, 2000); 
      },
    },
    mounted() {
      this.startRealtimeUpdates();
    },
  };
  </script>
  
  <style scoped>
  .realtime-display {
  }
  </style>
  