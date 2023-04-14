<template>
  <div class="flex flex-col bg-[#174840] text-[50px] text-white font-normal w-[25%] fixed top-0 left-0 pb-[5%] h-full">
    <i class="pi pi-times text-end mr-[5%] mt-[5%] hover:cursor-pointer hover:scale-[1.05] hover:mr-[7%]"
       style="font-size: 3rem" @click="sendBoolean(true)"></i>
    <div class="flex flex-col ml-[3%] mt-[10%] gap-5">
      <h1 @click="sendBoolean(false)" class="hover:cursor-pointer hover:scale-[1.1] hover:transition hover:delay-150 text-center"
          v-for="item in list" :key="item"
      >
        <router-link :to="'/' + item.url + '/'">{{ item.name }}</router-link>
      </h1>
    </div>
  </div>
</template>

<script>
export default {
  name: "MenuPanelComponent",
  data() {
    return {
      list: [
        {
          'name': 'Recepty',
          'url': 'recepty'
        },
        {
          'name': 'Stav kotla',
          'url': 'stav-kotla'
        },
        {
          'name': 'Nastavenia',
          'url': 'nastavenia'
        }
      ]
    }
  },
  methods: {
    sendBoolean(value) {
      this.$emit('boolean-sent', value);
    }
  }
}
</script>

<style scoped>

</style>