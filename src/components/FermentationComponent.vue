<template>
  <div class="box w-[1400px] h-[650px] bg-white m-auto mt-[5%]">
    <h1 class="text-[40px] font-semibold text-center mt-[2%]">Fermentacia</h1>
    <div class="flex flex-row justify-evenly">
      <div class="w-[30%] flex flex-col mt-[4%] gap-4">
        <InputText v-model="object.time" type="text" placeholder="Čas"/>
        <InputNumber v-model="object.degrees" prefix="&uarr; " suffix="℃" :min="0" :max="100" />
        <Textarea v-model="object.info" placeholder="Ďalšie info" rows="5" cols="30"/>
        <InputText v-model="object.note" type="text" placeholder="Poznámka"/>
        <div class="flex flex-row">
          <Button @click="add()" label="Pridať" class="p-button"></Button>
          <Button @click="remove()" label="Odobrať" class="p-button"></Button>
        </div>
      </div>
      <div class="w-[60%] mt-[4%]">
        <DataTable :value="this.localPost.fermentation">
          <template #header>
            <span class="text-xl text-900 font-bold">Pridané</span>
          </template>
          <Column field="time" header="Čas"></Column>
          <Column field="degrees" header="Stupne"></Column>
          <Column field="info" header="Info"></Column>
          <Column field="note" header="Poznámka"></Column>
        </DataTable>
      </div>
    </div>
    <div class="text-center">
      <Button @click="sendData(localPost); sendBoolean(localPost)" label="Ulozit" class="p-button"></Button>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import Textarea from 'primevue/textarea';
import InputNumber from "primevue/inputnumber";

export default {
  name: "FermentationComponent",
  components: {
    InputText, Button, DataTable, Column, Textarea, InputNumber
  },
  props: ["post"],
  data() {
    return {
      localPost: Object.assign({}, this.post),
      object: {
        time: '',
        degrees: 0,
        info: '',
        note: ''
      }
    }
  },
  methods: {
    add() {
      this.localPost.fermentation.push({
        time: this.object.time,
        degrees: this.object.degrees,
        info: this.object.info,
        note: this.object.note
      });
    },
    remove() {
      this.localPost.fermentation.pop();
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