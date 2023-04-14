<template>
  <div class="w-[651.55px] h-[391.5px] box flex flex-col bg-white hover:scale-[1.02] hover:cursor-pointer transition">
    <h1 class="text-[35px] font-bold text-[#23552E] text-center mt-[1%]">{{name}}</h1>
    <div class="flex flex-row mt-[3%]">
      <div class="flex flex-col w-[50%] pl-[3%] text-center">
        <div class="flex flex-col gap-4">
          <div>
            <h4>Sladek</h4>
            <h3 class="font-bold">{{author}}</h3>
          </div>
          <div>
            <h4>Autorov tag</h4>
            <h3 class="font-bold text-lg mt-[1%]">{{tag}}</h3>
          </div>
          <div>
            <h4>Alkohol ABV</h4>
            <h3 class="font-bold">{{alcohol}}</h3>
          </div>
          <div>
            <h4>Horkost IBU</h4>
            <h3 class="font-bold">{{ibu}}</h3>
          </div>
        </div>
      </div>
      <div class="w-[48%] mr-[3%]">
        <img src="@/assets/about/nahladovka.svg">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardComponent",
  props: ['name','author','tag','alcohol','ibu']
}
</script>

<style scoped>
.box {
  box-shadow: 0px 2.85768px 2.85768px rgba(0, 0, 0, 0.25);
  border-radius: 5.71536px;
}

h4 {
  font-size: 15px;
}

h3 {
  font-size: 25px
}
</style>