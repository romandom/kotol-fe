<template>
  <NavigationComponent></NavigationComponent>
  <div v-if="items" class="flex flex-col mt-[4%]">
    <div class="flex flex-row w-[80%] mx-auto justify-between">
      <h1 class="text-left font-bold text-[60px]">{{ items.name }}</h1>
      <div class="mt-[3%] mr-[3%] flex flex-row w-[10%] justify-between">
        <div>
          <Button @click="dialog = true" label="Variť" class="p-button"></Button>
        </div>
        <i @click="del()" class="hover:cursor-pointer hover:scale-[1.1] pi pi-trash mt-[10%]" style="font-size: 1.3rem"></i>
      </div>
    </div>
    <div class="border-t-8 border-x-2 border-black w-[80%] m-auto flex flex-row">
      <div class="flex flex-col w-[35%] items-center gap-2 pt-[1%] border-r-2 border-black">
        <h4>Sladek</h4>
        <h3 class="font-bold uppercase">{{ $route.query.author }}</h3>
      </div>
      <div class="flex flex-col w-[35%] items-center gap-2 pt-[1%] border-r-2 border-black">
        <h4>Autorov tag</h4>
        <h3 class="font-bold uppercase">{{ items.tag }}</h3>
      </div>
      <div class="flex flex-col w-[10%] items-center gap-2 pt-[1%] border-r-2 border-black">
        <h4>Alkohol ABV</h4>
        <h3 class="font-bold">{{ items.alcohol }}%</h3>
      </div>
      <div class="flex flex-col w-[10%] items-center gap-2 pt-[1%] border-r-2 border-black">
        <h4>Horkost IBU</h4>
        <h3 class="font-bold">{{ items.ibu }}</h3>
      </div>
      <div class="flex flex-col w-[10%] items-center gap-2 pt-[1%]">
        <h4>Farba EBC</h4>
        <h3 class="font-bold">{{ items.color }}</h3>
      </div>
    </div>
    <div class="w-[80%] mx-auto flex flex-col mt-[3%]">
      <div class="flex flex-row w-[68%] justify-between">
        <div class="w-[49%]">
          <h5>O pive</h5>
          <DataTable :value="aboutBeer">
            <template #header>
              <div class="flex flex-wrap align-items-center justify-content-between">
                <span class="text-900 font-bold">{{ items.info }}</span>
              </div>
            </template>
            <Column field="name"></Column>
            <Column field="text"></Column>
          </DataTable>
        </div>
        <div class="w-[49%]">
          <h5>Dekokcia</h5>
          <DataTable :value="items.malt.slice().reverse()">
            <Column field="degrees" header="Stupne"></Column>
            <Column field="time" header="Čas"></Column>
          </DataTable>
        </div>
      </div>
    </div>
    <div class="w-[80%] mx-auto flex flex-col mt-[2%]">
      <div class="flex flex-row w-[68%] justify-between">
        <div class="w-[49%]">
          <h5>Suroviny</h5>
          <DataTable :value="ingredients">
            <Column field="name"></Column>
            <Column field="text"></Column>
          </DataTable>
        </div>
        <div class="flex flex-col w-[49%]">
          <div>
            <h5>Chmelovar</h5>
            <DataTable :value="items.mash">
              <Column field="type" header="Názov"></Column>
              <Column field="amount" header="Množstvo"></Column>
              <Column field="time" header="Čas"></Column>
            </DataTable>
          </div>
          <div v-if="fermentation" class="mt-[2%]">
            <h5>Fermentacia</h5>
            <DataTable :value="fermentation">
              <Column field="time" header="Čas"></Column>
              <Column field="degrees" header="Stupne"></Column>
              <Column field="info" header="Info"></Column>
            </DataTable>
          </div>
        </div>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>
  <Dialog v-model:visible="dialog" modal header="Vyberte si prosím produkt" :style="{ width: '50vw' }">
    <div
        class="flex flex-row justify-evenly">
      <Dropdown v-model="selectedType" :options="products" optionLabel="name"/>
      <div class="flex flex-col">
        <Button @click="boil()" label="Variť" class="p-button"></Button>
      </div>
    </div>
    <p v-if="inUse" class="text-red-800">{{ message }}</p>
  </Dialog>
</template>

<script>
import NavigationComponent from "@/components/NavigationComponent";
import FooterComponent from "@/components/FooterComponent";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import Button from "primevue/button";
import Dialog from "primevue/dialog"
import Dropdown from "primevue/dropdown";

export default {
  name: "RecipeDetailView",
  components: {FooterComponent, NavigationComponent, DataTable, Column, Button, Dialog, Dropdown},
  data() {
    return {
      aboutBeer: [],
      ingredients: [],
      fermentation: [],
      items: null,
      dialog: false,
      products: [],
      selectedType: null,
      inUse: false,
      message: ''
    }
  },
  methods: {
    del() {
      const recipe_id = this.$route.query.id;
      const oauth2Token = localStorage.getItem('authToken');
      this.$http.delete('/recipe/delete/' + recipe_id, {
        headers: {
          'Authorization': `Bearer ${oauth2Token}`,
        }
      })
          .then(response => {
            console.log(response);
            this.$router.push('/recepty')
          })
          .catch(error => {
            console.log(error);
          });
    },
    boil() {
      const productRecipe = {
        product_id: this.selectedType.key,
        recipe_id: this.$route.query.id
      }
      const oauth2Token = localStorage.getItem('authToken');
      this.$http.post('/product/boiling', productRecipe, {
        headers: {
          'Authorization': `Bearer ${oauth2Token}`,
        }
      })
          .then(response => {
            console.log(response);
            if (response.data[0] === "IN_USE") {
              this.inUse = true;
              this.message = 'Produkt sa už používa!';
              return;
            }
            if (response.data[0] === "NOT_ONLINE") {
              this.inUse = true;
              this.message = 'Produkt nie je online!';
              return;
            }
            this.dialog = false;
            this.$router.push('/stav-kotla')
          })
          .catch(error => {
            console.log(error);
          });
    }
  },
  mounted() {
    const id = this.$route.query.id;
    const oauth2Token = localStorage.getItem('authToken');
    this.$http.get('/recipe/get/' + id, {
      headers: {
        'Authorization': `Bearer ${oauth2Token}`,
      }
    }).then((response) => {
      this.items = response.data;
      this.aboutBeer.push({name: 'Štýl', text: this.items.style})
      this.aboutBeer.push({name: 'Mladina', text: this.items.mladina})
      this.ingredients.push({name: 'Rmutovacia', text: this.items.start_water + 'l'})
      this.ingredients.push({name: 'Vysladzovacia', text: this.items.splash_water + 'l'})
      for (let x in this.items.mash_type) {
        this.ingredients.push({name: this.items.mash_type[x].name, text: this.items.mash_type[x].kilograms + 'kg'})
      }
      for (let x in this.items.hops_type) {
        this.ingredients.push({name: this.items.hops_type[x].name, text: this.items.hops_type[x].grams + 'g'})
      }
      for (let x in this.items.fermentation_type) {
        if (x.grams) {
          this.ingredients.push({
            name: this.items.fermentation_type[x].name,
            text: this.items.fermentation_type[x].amount + 'g'
          })
        }
        if (x.ml) {
          this.ingredients.push({
            name: this.items.fermentation_type[x].name,
            text: this.items.fermentation_type[x].amount + 'ml'
          })
        }
      }
      for (let x in this.items.fermentation) {
        this.fermentation.push({
          time: this.items.fermentation[x].time,
          degrees: this.items.fermentation[x].degrees,
          info: this.items.fermentation[x].info
        })
      }
    });
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
}
</script>

<style scoped>
:deep(.p-datatable .p-datatable-thead > tr > th) {
  color: white;
  background: #57585A;
}

:deep(.p-datatable .p-datatable-tbody > tr) {
  background: #D1D2D4;
  color: #495057;
}

:deep(.p-datatable-header) {
  background: #495057;
}

h5 {
  font-weight: bold;
  font-size: 22px;
}

.p-button {
  background-color: #1E5950;
  border-radius: 10px;
}
</style>