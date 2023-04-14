<template>
  <div class="w-[685px] h-[364px] place-items-center box flex flex-col">
    <h1 class="text-[60px] leading-normal font-semibold text-[#464646] text-center mb-[4%]">Registrácia</h1>
    <InputText id="username" type="text" class="p-inputtext w-[37.5%]" placeholder="Prihlasovacie meno"
               v-model="username"/>
    <Password v-model="password" class="mt-[2%]" placeholder="Heslo" toggleMask></Password>
    <Password v-model="repeatedPassword" class="mt-[2%]" placeholder="Zopakuj heslo" toggleMask></Password>
    <Button label="Registrovať" class="p-button" @click="register()"></Button>
  </div>
</template>

<script>
import {defineComponent} from "vue";
import Password from "primevue/password";
import InputText from "primevue/inputtext";
import Button from "primevue/button";


export default defineComponent({
  name: "RegisterComponent",
  components: {
    Password,
    InputText,
    Button
  },
  data() {
    return {
      username: null,
      password: null,
      repeatedPassword: null,
      result: null
    }
  },
  methods: {
    async register() {
      if (this.password == this.repeatedPassword) {
        const register = {username: this.username, password: this.password};
        try {
          await this.$http.post("/register", register).then(
              res => {
                this.$router.push('/');
                console.log(res)
              }
          );
          // Once the user is registered, you can authenticate them
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log('Passwords do not match');
      }
    }
  }
});
</script>

<style scoped>
.box {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.p-button {
  background-color: #1E5950;
  border-radius: 20px;
  margin-top: 3%;
}
</style>