<template>
  <h1 class="text-[60px] font-semibold ml-[82%] mt-[2%]">BeerMe</h1>
  <LoginComponent class="m-auto mt-[11%]"></LoginComponent>
  <FooterComponent></FooterComponent>
</template>

<script>
import LoginComponent from "@/components/LoginComponent";
import {defineComponent} from "vue";
import FooterComponent from "@/components/FooterComponent";

export default defineComponent({
  name: "LoginView",
  components: {
    FooterComponent,
    LoginComponent
  }
})
</script>

<style scoped>

</style>