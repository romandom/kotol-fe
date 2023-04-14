<template>
  <div class="w-[685px] h-[364px] place-items-center box flex flex-col">
    <h1 class="text-[60px] leading-normal font-semibold text-[#464646] text-center mb-[4%]">Vítajte</h1>
    <InputText id="username" type="text" class="p-inputtext w-[35%]" placeholder="Prihlasovacie meno"
               v-model="username"/>
    <Password v-model="password" class="mt-[2%]" placeholder="Heslo" :feedback="false" toggleMask></Password>
    <Button label="Prihlásiť sa" class="p-button" @click="login()"></Button>
    <p class="font-semibold text-[18px] mt-[4%]">Nemáte ešte účet?
      <router-link to="/register"><span class="underline hover:cursor-pointer">Založte si ho</span></router-link>
    </p>
  </div>
</template>

<script>
import Password from 'primevue/password';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import {defineComponent} from "vue";

export default defineComponent({
  name: "LoginComponent",
  components: {
    Password,
    InputText,
    Button
  },
  data() {
    return {
      username: null,
      password: null,
      token: null
    }
  },
  methods: {
    async login() {
      try {
        const form = new FormData()

        form.append('username', this.username)
        form.append('password', this.password)
        await this.$http.post("http://127.0.0.1:8000/token", form).then(
            res => {
              localStorage.setItem('authToken', res.data.token);
              localStorage.setItem('userId', res.data.user_id)
            }
        );
        // Once the user is registered, you can authenticate them
        // const authResponse = await this.$auth.loginWith('local', {
        //   data: { username: this.username, password: this.password }
        // });
        // Store the token in local storage
        this.$router.push('/recepty');
      } catch (error) {
        console.log(error);
      }

    }

  }
});
</script>

<style scoped>

::v-deep(.p-password input) {
  width: 15rem
}

::v-deep(.p-inputtext input) {
  width: 15rem
}

.box {
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
}

.p-button {
  background-color: #1E5950;
  border-radius: 20px;
  margin-top: 3%;
}

</style>