<template>
  <div class="bg-col relative">
    <NavigationComponent class="sticky"></NavigationComponent>
    <div class="flex flex-col">
      <div :class="bigger? 'scale-[1.05] transition': ''" @click="$router.push('/pridat-recept/')"
           @mouseenter="bigger = true"
           @mouseleave="bigger=false"
           class="hover:cursor-pointer w-[220px] h-[50px] bg-[#174840] mt-[2%] text-white text-[25px] font-normal flex flex-row justify-evenly rounded-[5px] m-auto">
        <i class="pi pi-plus mt-[5%]"
           style="font-size: 1.5rem; font-weight: bold"></i>
        <h3 class="mt-[2%]">Pridať recept</h3>
      </div>
      <div
          class="ml-[7%]">
        <Dropdown @change="changeType()" v-model="selectedType" :options="types" optionLabel="name"/>
      </div>
      <div class="m-auto grid grid-cols-2 justify-items-center gap-[15%] mt-[3%] h-[1000px]">
        <div v-for="(item, index) in items" :key="index">
          <router-link :to="{ name: 'detail-receptu', query: { id: item.recipe_uuid, author: item.author } }">
            <CardComponent :name="item.recipe_name" :author="item.author" :alcohol="item.alcohol" :ibu="item.ibu"
                           :tag="item.tag"></CardComponent>
          </router-link>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>
</template>

<script>
import CardComponent from "@/components/CardComponent";
import FooterComponent from "@/components/FooterComponent";
import NavigationComponent from "@/components/NavigationComponent";
import Dropdown from 'primevue/dropdown';

export default {
  components: {
    Dropdown,
    NavigationComponent,
    FooterComponent,
    CardComponent,
  },
  mounted() {
    this.changeType();
  },
  data() {
    return {
      items: [],
      bigger: false,
      selectedType: {name: 'Všetke', key: 'all'},
      types: [
        {name: 'Všetke', key: 'all'},
        {name: 'Vaše', key: 'your'},
        //{name: 'Obľúbené', path: '/favorite-recipes/'},
      ]
    }
  },
  methods: {
    changeType() {
      const userId = localStorage.getItem('userId');
      const oauth2Token = localStorage.getItem('authToken');
      if (this.selectedType.key == 'all') {
        this.$http.get('/recipe/all/', {
          headers: {
            'Authorization': `Bearer ${oauth2Token}`,
          }
        }).then((response) => {
          this.items = response.data;
          console.log(this.items)
        });
      } else {
        this.$http.get('/recipe/all/' + userId, {
          headers: {
            'Authorization': `Bearer ${oauth2Token}`,
          }
        }).then((response) => {
          this.items = response.data;
          console.log(this.items)
        });
      }
    }
  }

}
</script>

<style scoped>
.bg-col {
  background: linear-gradient(180deg, #D0CECE 0%, #FFFFFF 52.64%);
  mix-blend-mode: normal;
}

:deep(.p-dropdown) {
  background: #174840;
  border-radius: 5px;
  width: 8rem;
  text-align: center;
}

:deep(.p-dropdown-label) {
  color: white;
  font-weight: normal;
}


</style>