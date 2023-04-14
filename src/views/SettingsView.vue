<template>
  <body class="bg-col">
  <NavigationComponent></NavigationComponent>
  <div class="w-[685px] h-[364px] place-items-center box flex flex-col bg-white m-auto mt-[5%]">
    <h1 class="mt-[4%] font-bold text-3xl">Vaše produkty</h1>
    <div class="flex flex-row mt-[5%] w-full">
      <div class=" w-[50%] pl-[10%] flex flex-col">
        <h2 class="text-lg font-medium mb-[3%]">Pridať produkt</h2>
        <InputText v-model="productID" placeholder="Produkt ID"></InputText>
        <div class="flex flex-row justify-evenly mt-[5%]">
          <Button label="Pridať" class="p-button" @click="add()"></Button>
          <Button label="Odobrať" class="p-button" @click="remove()"></Button>
        </div>
      </div>
      <div class="w-[50%] px-[5%]">
        <DataTable :value="table">
          <Column field="id" header="ID"></Column>
          <Column field="name" header="Názov"></Column>
          <Column field="online" header="Online"></Column>
        </DataTable>
      </div>
    </div>
  </div>
  <FooterComponent></FooterComponent>
  </body>
</template>

<script>
import FooterComponent from "@/components/FooterComponent";
import NavigationComponent from "@/components/NavigationComponent";
import DataTable from "primevue/datatable";
import Column from "primevue/column";
import InputText from "primevue/inputtext";
import Button from "primevue/button";

export default {
  name: "SettingsView",
  components: {NavigationComponent, FooterComponent, DataTable, Column, InputText, Button},
  data() {
    return {
      products: [],
      productID: '',
      table: []
    }
  },
  mounted() {
    this.fetch();
  },
  methods: {
    add() {
      const oauth2Token = localStorage.getItem('authToken');
      const data = {
        user_id: localStorage.getItem('userId'),
        product_id: this.productID
      }
      this.$http.post('/product/add', data, {
        headers: {
          'Authorization': `Bearer ${oauth2Token}`,
        }
      })
          .then(response => {
            this.fetch();
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    },
    remove() {
      const oauth2Token = localStorage.getItem('authToken');
      this.$http.delete('/product/delete/' + this.productID, {
        headers: {
          'Authorization': `Bearer ${oauth2Token}`,
        }
      })
          .then(response => {
            this.fetch();
            console.log(response);
          })
          .catch(error => {
            console.log(error);
          });
    },
    fetch() {
      const oauth2Token = localStorage.getItem('authToken');
      const user_id = localStorage.getItem('userId');
      this.$http.get('/product/all/' + user_id, {
        headers: {
          'Authorization': `Bearer ${oauth2Token}`,
        }
      })
          .then(response => {
            this.table = response.data;
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
</style>