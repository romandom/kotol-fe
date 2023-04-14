<template>
  <div class="box w-[900px] h-[550px] bg-white m-auto mt-[5%] flex flex-col">
    <h1 class="text-[40px] font-semibold text-center mt-[2%]">Pridať recept</h1>
    <div class="flex flex-row justify-evenly mt-[2%]">
      <div class="flex flex-col gap-4 w-[40%]">
        <InputText type="text" placeholder="Názov" v-model="localPost.name"/>
        <InputText type="text" placeholder="Tag" v-model="localPost.tag"/>
        <InputText type="text" placeholder="Druh piva" v-model="localPost.beer_type"/>
        <InputText type="text" placeholder="Stupne" v-model="localPost.degrees"/>
        <InputText type="text" placeholder="Štýl" v-model="localPost.style"/>
        <InputText type="text" placeholder="IBU" v-model="localPost.ibu"/>
        <InputText type="text" placeholder="Mladina" v-model="localPost.mladina"/>
      </div>
      <div class="flex flex-col gap-4 w-[40%]">
        <InputText type="text" placeholder="Farba" v-model="localPost.color"/>
        <InputText type="text" placeholder="Alkohol" v-model="localPost.alcohol"/>
        <InputText type="text" placeholder="Info" v-model="localPost.info"/>
        <InputText type="text" placeholder="Pozámka" v-model="localPost.note"/>
        <SelectButton @change="set" v-model="selectedValue" :options="types"
                      optionLabel="name" aria-labelledby="basic"/>
        <div class="flex align-items-center">
          <Checkbox v-model="localPost.shared" inputId="shared" name="shared" :binary="true" />
          <label for="shared" class="ml-2"> Zdieľať medzi ostatných </label>
        </div>
      </div>
    </div>
    <div class="text-right mr-[5%] mt-[-1.5%]">
      <Button @click="sendData(localPost); sendBoolean(true)" label="Pokračovať" class="p-button"></Button>
    </div>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import Checkbox from 'primevue/checkbox';

export default {
  name: "RecipeComponent",
  components: {
    InputText, SelectButton, Button, Checkbox
  },
  props: ["post"],
  created() {
    // Create a copy of the post data
    this.localPost = Object.assign({}, this.post);
  },
  data() {
    return {
      localPost: {},
      selectedValue: null,
      isChecked: false,
      types: [
        {name: 'Dekokcia', value: 'decoction'},
        {name: 'Infúzia', value: 'infusion'}
      ],
    }
  },
  methods: {
    set() {
      if (this.selectedValue.value == 'decoction') {
        this.localPost.decoction = true;
        this.localPost.infusion = false;
      } else {
        this.localPost.decoction = false;
        this.localPost.infusion = true;
      }
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