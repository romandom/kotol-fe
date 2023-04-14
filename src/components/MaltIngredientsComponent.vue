<template>
  <div class="box w-[900px] h-[550px] bg-white m-auto mt-[5%] flex flex-col">
    <h1 class="text-[40px] font-semibold text-center mt-[2%]">Ingrediencie pre sladovar</h1>
    <div class="flex flex-row justify-evenly mt-[5%]">
      <div class="flex flex-col gap-4 w-[40%]">
        <InputText type="text" placeholder="Rmutovacia voda v litroch" v-model="localPost.start_water"/>
        <InputText type="text" placeholder="Vysladzovacia voda v litroch" v-model="localPost.splash_water"/>
        <InputText type="text" placeholder="Názov sladu" v-model="mash_type.name"/>
        <InputText type="text" placeholder="Množstvo v kilogramoch" v-model="mash_type.kilograms"/>
        <div class="flex flex-row">
          <Button @click="add()" label="Pridať" class="p-button"></Button>
          <Button @click="remove()" label="Odobrať" class="p-button"></Button>
        </div>
      </div>
      <div class="flex flex-col gap-4 w-[40%]">
        <DataTable :value="localPost.mash_type">
          <template #header>
            <span class="text-xl text-900 font-bold">Pridané</span>
          </template>
          <Column field="name" header="Názov"></Column>
          <Column field="kilograms" header="Kg"></Column>
        </DataTable>
      </div>
    </div>
    <div class="text-right mr-[5%]">
      <Button @click="sendData(localPost); sendBoolean(true)" label="Pokračovať" class="p-button"></Button>
    </div>
  </div>
</template>

<script>
import InputText from "primevue/inputtext";
import Button from "primevue/button";
import DataTable from "primevue/datatable";
import Column from "primevue/column";

export default {
  name: "MaltIngredientsComponent",
  components: {
    InputText, Button, DataTable, Column
  },
  props: ["post"],
  created() {
    // Create a copy of the post data
    this.localPost = Object.assign({}, this.post);
  },
  data() {
    return {
      localPost: {},
      mash_type:
          {
            name: '',
            kilograms: ''
          },
    }
  },
  methods: {
    add() {
      this.localPost.mash_type.push({
        name: this.mash_type.name,
        kilograms: this.mash_type.kilograms
      });
      this.mash_type.name = '';
      this.mash_type.kilograms = '';
    },
    remove() {
      this.localPost.mash_type.pop();
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