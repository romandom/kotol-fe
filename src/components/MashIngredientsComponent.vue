<template>
  <div class="box w-[900px] h-[550px] bg-white m-auto mt-[5%] flex flex-col">
    <h1 class="text-[40px] font-semibold text-center mt-[2%]">Ingrediencie pre chmeľovar</h1>
    <div class="flex flex-row justify-evenly mt-[5%]">
      <div class="flex flex-col gap-4 w-[40%]">
        <InputText type="text" placeholder="Názov chmeľu" v-model="data.name"/>
        <InputText type="number" placeholder="Množstvo v gramoch" v-model="data.grams"/>
        <div class="flex flex-row">
          <Button @click="add()" label="Pridať" class="p-button"></Button>
          <Button @click="remove()" label="Odobrať" class="p-button"></Button>
        </div>
      </div>
      <div class="flex flex-col gap-4 w-[40%]">
        <DataTable :value="localPost.hops_type">
          <template #header>
            <span class="text-xl text-900 font-bold">Pridané</span>
          </template>
          <Column field="name" header="Názov"></Column>
          <Column field="grams" header="Gram"></Column>
        </DataTable>
      </div>
    </div>
    <div class="text-right mr-[5%]">
      <Button @click="sendData(localPost);; sendBoolean(true)" label="Pokračovať" class="p-button"></Button>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  name: "MashIngredientsComponent",
  components: {
    InputText, Button, DataTable, Column
  },
  props: ["post"],
  data() {
    return {
      localPost: Object.assign({}, this.post),
      data: {
        name: '',
        grams: 0
      },
    }
  },
  methods: {
    add() {
      this.localPost.hops_type.push({
        name: this.data.name,
        grams: this.data.grams
      });
      this.data.name = '';
      this.data.grams = 0;
    },
    remove() {
      this.localPost.hops_type.pop();
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

</style>