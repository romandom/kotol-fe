<template>
  <div class="box w-[1400px] h-[650px] bg-white m-auto mt-[5%]">
    <h1 class="text-[40px] font-semibold text-center mt-[2%]">Chmelovar</h1>
    <div class="flex flex-row justify-evenly">
      <div class="w-[30%] flex flex-col mt-[4%] gap-4">
        <InputText v-model="object.time" placeholder="Čas" type="number"/>
        <InputText v-model="object.type" type="text" placeholder="Chmel"/>
        <InputText v-model="object.amount" type="number" placeholder="Množstvo chmelu"/>
        <InputText v-model="object.info" type="text" placeholder="Ďalšie info"/>
        <InputText v-model="object.note" type="text" placeholder="Poznámka"/>
        <div class="flex flex-row">
          <Button @click="add()" label="Pridať" class="p-button"></Button>
          <Button @click="remove()" label="Odobrať" class="p-button"></Button>
        </div>
      </div>
      <div class="w-[60%] mt-[4%]">
        <DataTable :value="localPost.mash">
          <template #header>
            <span class="text-xl text-900 font-bold">Pridané</span>
          </template>
          <Column field="time" header="Čas"></Column>
          <Column field="type" header="Chmel"></Column>
          <Column field="amount" header="Množstvo"></Column>
          <Column field="info" header="Info"></Column>
          <Column field="note" header="Poznámka"></Column>
        </DataTable>
      </div>
    </div>
    <div class="text-center">
      <Button @click="sendData(localPost);; sendBoolean(true)" label="Pokračovať" class="p-button"></Button>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';

export default {
  name: "MashComponent",
  components: {
    InputText, Button, DataTable, Column
  },
  props: ["post"],
  data() {
    return {
      localPost: Object.assign({}, this.post),
      object: {
        time: '',
        type: '',
        amount: 0,
        info: '',
        note: ''
      },
    }
  },
  methods: {
    add() {
      this.localPost.mash.push({
        time: this.object.time,
        type: this.object.type,
        amount: this.object.amount,
        info: this.object.info,
        note: this.object.note
      });
      this.object.time = '';
      this.object.type = '';
      this.object.amount = 0;
      this.object.info = '';
      this.object.note = '';
      },
    remove() {
      this.localPost.mash.pop();
    },
    sendBoolean(value) {
      this.$emit('boolean-sent', value);
    },
    sendData(value) {
      this.$emit("post-updated", value);
    },
  }
}
</script>

<style scoped>
.p-button {
  background-color: #1E5950;
  border-radius: 20px;
  margin-top: 3%;
}
</style>