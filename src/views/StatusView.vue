<template>
  <body class="bg-col">
  <NavigationComponent></NavigationComponent>
  <div class="w-[685px] h-[364px] place-items-center box flex flex-col bg-white m-auto mt-[5%]">
    <h1 class="mt-[4%] font-bold text-3xl">Stav kotla</h1>
    <div class="flex flex-col w-full">
      <div class="flex flex-row pl-[5%]">
        <h2 class="font-medium">Aktuálne sa varí:</h2>
        <h2 class="ml-[2%]">{{actualRecipe}}</h2>
      </div>
      <div class="flex flex-row pl-[5%]">
        <h2 class="font-medium">Fáza:</h2>
        <h2  class="ml-[2%]">{{fase}}</h2>
      </div>
      <div class="flex flex-row pl-[5%] mt-[2%]">
        <h2 class="mt-[1%] font-medium">Kotol:</h2>
        <div class="w-[15%] ml-[5%]">
          <Dropdown @change="changeReq" v-model="selectedType" placeholder="Vyber produkt" :options="products" optionLabel="name"/>
        </div>
      </div>
      <div class="flex flex-row justify-evenly mt-[5%]">
        <div class="flex flex-col">
          <h2  class="font-medium">Teplota kotla</h2>
          <p class="text-[45px] text-center">{{actualTemp}} &#8451;</p>
        </div>
        <div>
          <h2  class="font-medium">Požadovaná teplota</h2>
          <p class="text-[45px] text-center">{{reqTemp}} &#8451;</p>
        </div>
      </div>
      <div class="text-center mt-[2%]">
        <Button @click="stopBoil" label="Stop" class="p-button"></Button>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>
  </body>
</template>

<script>
import NavigationComponent from "@/components/NavigationComponent";
import FooterComponent from "@/components/FooterComponent";
import Dropdown from "primevue/dropdown";
import Button from "primevue/button";

export default {
  name: "StatusView",
  components: {FooterComponent, NavigationComponent, Dropdown, Button},
  data() {
    return {
      products: [],
      selectedType: null,
      actualRecipe: '',
      fase: '',
      actualTemp: 0,
      reqTemp: 0
    }
  },
  mounted() {
    this.fetchProducts();
    setInterval(() => {
      this.fetchTemp();
    }, 30000);
    setInterval(() => {
      this.fetchInfo();
    }, 600000);
  },
  methods: {
    changeReq() {
      this.fetchTemp();
      this.fetchInfo();
    },
    stopBoil() {
      if (this.selectedType == null) {
        return;
      }
      const oauth2Token = localStorage.getItem('authToken');
      this.$http.post('/product/stop_boiling/' + this.selectedType.key, {
        headers: {
          'Authorization': `Bearer ${oauth2Token}`,
        }
      })
          .then(response => {
            console.log(response);
            this.$router.push('/recepty');
          })
          .catch(error => {
            console.log(error);
          });
    },
    fetchProducts() {
      const oauth2Token = localStorage.getItem('authToken');
      const user_id = localStorage.getItem('userId');
      this.$http.get('/product/all/' + user_id, {
        headers: {
          'Authorization': `Bearer ${oauth2Token}`,
        }
      })
          .then(response => {
            for (const x in response.data)
              this.products.push({
                name: response.data[x].name,
                key: response.data[x].id
              })
          })
          .catch(error => {
            console.log(error);
          });
    },
    fetchInfo() {
      const oauth2Token = localStorage.getItem('authToken');
      this.$http.get('/product/get_boil_status/' + this.selectedType.key, {
        headers: {
          'Authorization': `Bearer ${oauth2Token}`,
        }
      })
          .then(response => {
            console.log(response);
            this.actualRecipe = response.data.recipe;
            this.fase = response.data.fase;
          })
          .catch(error => {
            console.log(error);
          });
    },
    fetchTemp() {
      const oauth2Token = localStorage.getItem('authToken');
      this.$http.get('/product/actual_temperature/' + this.selectedType.key, {
        headers: {
          'Authorization': `Bearer ${oauth2Token}`,
        }
      })
          .then(response => {
            console.log(response);
            this.actualTemp = response.data.actual;
            this.reqTemp = response.data.requested;
          })
          .catch(error => {
            console.log(error);
          });
    },
  }
}
</script>

<style scoped>
.bg-col {
  background: linear-gradient(180deg, #D0CECE 0%, #FFFFFF 52.64%);
  mix-blend-mode: normal;
}

.box {
  box-shadow: 0px 2.85768px 2.85768px rgba(0, 0, 0, 0.25);
  border-radius: 5.71536px;
}

.p-button {
  background-color: darkred;
  border-radius: 10px;
}
</style>