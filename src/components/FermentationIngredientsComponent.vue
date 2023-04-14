<template>
  <div class="box w-[900px] h-[550px] bg-white m-auto mt-[5%] flex flex-col">
    <h1 class="text-[40px] font-semibold text-center mt-[2%]">Ingrediencie pre fermentáciu</h1>
    <div class="flex flex-row justify-evenly mt-[5%]">
      <div class="flex flex-col gap-4 w-[40%]">
        <InputText type="text" placeholder="Názov kvasiniek" v-model="object.name"/>
        <InputText type="number" placeholder="Množstvo" v-model="object.amount"/>
        <SelectButton @change="sign === 'g' ? isGram : isMl" v-model="sign" :options="types"
                      optionLabel="name" aria-labelledby="basic"/>
        <div class="flex flex-row">
          <Button @click="add()" label="Pridať" class="p-button"></Button>
          <Button @click="remove()" label="Odobrať" class="p-button"></Button>
        </div>
      </div>
      <div class="flex flex-col gap-4 w-[40%]">
        <DataTable :value="localPost.fermentation_type">
          <template #header>
            <span class="text-xl text-900 font-bold">Pridané</span>
          </template>
          <Column field="name" header="Kvasinky"></Column>
          <Column field="amount" header="Množstvo"></Column>
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
import SelectButton from "primevue/selectbutton";
import Button from "primevue/button";
import Column from "primevue/column";
import DataTable from "primevue/datatable";

export default {
  name: "FermentationIngredientsComponent",
  components: {
    InputText, SelectButton, Button, Column, DataTable
  },
  props: ["post"],
  data() {
    return {
      localPost: Object.assign({}, this.post),
      object: {
        name: '',
        amount: 0,
        grams: true,
        ml: true
      },
      sign: 'g',
      types: [
        {name: 'Gram', key: 'g'},
        {name: 'Mililiter', key: 'ml'}
      ]
    }
  },
  methods: {
    add() {
      this.localPost.fermentation_type.push(this.object);
      console.log(this.localPost.fermentation_type);
    },
    remove() {
      this.localPost.fermentation_type.pop();
    },
    sendBoolean(value) {
      this.$emit('boolean-sent', value);
    },
    isGram() {
      this.object.grams = true;
      this.localPost.ml = false;
    },
    isMl() {
      this.localPost.grams = false;
      this.localPost.ml = true;
    },
    sendData(value) {
      this.$emit("post-updated", value);
    },
  }
}
</script>

<style scoped>

</style>