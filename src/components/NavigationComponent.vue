<template>
  <div class=" sticky">
    <div class="flex flex-row w-full justify-between px-[5%]"
         :class="scrolling? 'bg-[#D0CECE]' : 'bg-transparent'">
      <div @click="menu = true, close = false"
           class="flex flex-col gap-3 hover:cursor-pointer hover:scale-[1.1] transition-[1000] delay-150 mt-[3%]">
        <div class="bg-[#174840] w-[102.96px] h-[12.96px] rounded-2xl"></div>
        <div class="bg-[#174840] w-[102.96px] h-[12.96px] rounded-2xl"></div>
        <div class="bg-[#174840] w-[102.96px] h-[12.96px] rounded-2xl"></div>
      </div>
      <div class="mt-[2.3%] ml-[10%]">
        <span  v-if="$route.path === '/recepty/'" class="p-input-icon-left">
            <i class="pi pi-search"/>
            <InputText v-model="search" class="p-inputtext-lg" placeholder="Hľadať medzi receptami"/>
        </span>
      </div>
      <h1 class="text-[#174840] font-bold text-[70px] mt-[1.5%]">BeerMe</h1>
    </div>
    <MenuPanelComponent v-if="menu && !close" @boolean-sent="handleBoolean"></MenuPanelComponent>
  </div>
</template>

<script>
import InputText from 'primevue/inputtext';
import MenuPanelComponent from "@/components/MenuPanelComponent";

export default {
  name: "NavigationComponent",
  components: {
    MenuPanelComponent,
    InputText
  },
  data() {
    return {
      search: '',
      scrolling: false,
      lastScrollPosition: 0,
      menu: false,
      close: false
    }
  },
  created() {
    window.addEventListener("scroll", this.onScroll);
  },
  methods: {
    handleBoolean(value) {
      this.close = value;
      this.menu = false;
    },
    onScroll() {
      const currentScrollPosition =
          window.scrollY || document.documentElement.scrollTop;
      if (currentScrollPosition == 0) {
        this.scrolling = false;
        return;
      } // Stop executing this function if the difference between
      // current scroll position and last scroll position is less than some offset
      if (currentScrollPosition > 0) {
        this.scrolling = true;
        return;
      }
      this.lastScrollPosition = currentScrollPosition;
    },
  }
}
</script>

<style scoped>
.p-inputtext-lg {
  border-radius: 40px;
  width: 639px;
  height: 82px;
}

.p-inputtext-lg::placeholder, .p-inputtext-lg:focus {
  font-size: 30px;
}

.pi {
  font-size: 2rem;
}

.p-input-icon-left > i, .p-input-icon-right > i {
  top: 35%;
  left: 5%;
}

.p-input-icon-left > .p-inputtext {
  padding-left: 5rem;
}

.p-input-icon-left > i:first-of-type {
  left: 1.5rem;
}

.sticky {
  position: sticky;
  top: 0;
  z-index: 2;
}

</style>