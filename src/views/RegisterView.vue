<template>
  <h1 class="text-[60px] font-semibold ml-[82%] mt-[2%]">BeerMe</h1>
  <RegisterComponent class="m-auto mt-[11%]"></RegisterComponent>
  <FooterComponent></FooterComponent>
</template>

<script>
import RegisterComponent from "@/components/RegisterComponent";
import FooterComponent from "@/components/FooterComponent";
export default {
  name: "RegisterView",
  components: {
    FooterComponent,
    RegisterComponent
  }
}
</script>

<style scoped>

</style>