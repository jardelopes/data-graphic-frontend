<template>
  <nav class="navbar d-flex justify-content-center">
    <div class="form-group p-2">
      <input v-model="firstName" type="text" class="form-control" placeholder="First name" required>
    </div>
    <div class="form-group p-2">
      <input v-model="lastName" type="text" class="form-control" placeholder="Last name" required>
    </div>
    <div class="form-group p-2">
      <input v-model="participation" type="number" class="form-control" placeholder="Participation" required>
    </div>
    <button class="btn btn-send" @click="registrarParticipante">SEND</button>
  </nav>
</template>

<script>
import axios from 'axios';

export default {
  name: 'HeaderComponent',
  data() {
    return {
      firstName: '',
      lastName: '',
      participation: null,
    };
  },
  methods: {
    async registrarParticipante() {
      // Verifica se todos os campos estão preenchidos
      if (!this.firstName || !this.lastName || !this.participation) {
        console.error('Todos os campos são obrigatórios');
        return;
      }

      try {
        const data = {
          firstName: this.firstName,
          lastName: this.lastName,
          participation: this.participation,
        };
        const response = await axios.post('http://localhost:3000/api/participants', data);
        console.log(response.data);
        window.dispatchEvent(new Event('postAdded'));
        data.firstName = '';
        data.lastName = '';
        data.participation = null;
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style scoped>
.navbar{
  height: 100px;
  background-color: rgb(8, 220, 209);
}
.btn-send{
  background-color: rgb(8, 220, 209);
  border: 1px solid;
  border-color: white;
  color: white;
  width: 100px;
}
.btn-send:hover{
  background-color: white;
  border: 1px solid;
  border-color: rgb(8, 220, 209);
  color: rgb(8, 220, 209);
  width: 100px;
}
</style>
