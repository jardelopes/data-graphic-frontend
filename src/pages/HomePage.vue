<template>
    <div class="container pt-5">
      <h1 class="pb-4">Data</h1>
      <div class="d-flex justify-content-center" v-if="dados">
        <div class="container">
          <div class="row">
            <div class="col-md-6">
              <table class="table table-bordered table-striped">
                <thead>
                  <tr>
                    <th scope="col">First name</th>
                    <th scope="col">Last name</th>
                    <th scope="col">Participation</th>
                    <th scope="col">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="item in dados" :key="item._id">
                    <td>{{ item.firstName }}</td>
                    <td>{{ item.lastName }}</td>
                    <td>{{ item.participation }}</td>
                    <td>
                      <button class="btn btn-danger" @click="removerParticipante(item._id)">
                        Remove
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="col">
              <div class="teste">
                <donut-chart :labels="labels" :data="data" :key="chartKey" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { ref, onMounted, watch } from 'vue';
  import DonutChart from '../components/DonutChart.vue';
  
  export default {
    name: 'HomePage',
    components: {
      DonutChart,
    },
    setup() {
      const dados = ref(null);
      const chartKey = ref(0);
  
      async function buscarDados() {
        try {
          const response = await axios.get('http://localhost:3000/api/participants');
          dados.value = response.data;
        } catch (error) {
          console.error(error);
        }
      }
  
      async function removerParticipante(participanteId) {
        try {
          await axios.delete(`http://localhost:3000/api/participants/${participanteId}`);
          buscarDados();
        } catch (error) {
          console.error(error);
        }
      }
  
      onMounted(buscarDados);
  
      watch(dados, () => {
        chartKey.value += 1;
      });
  
      window.addEventListener('postAdded', () => {
        buscarDados();
      });
  
      return {
        dados,
        chartKey,
        removerParticipante,
      };
    },
    computed: {
      labels() {
        return this.dados ? this.dados.map(item => item.firstName + ' ' + item.lastName) : [];
      },
      data() {
        return this.dados ? this.dados.map(item => item.participation) : [];
      },
    },
  };
  </script>
  
  
<style>
.teste {
    max-height: 400px;
    padding-left: 50px;
}
</style>
