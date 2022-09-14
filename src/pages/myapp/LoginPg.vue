<template>
  <div class="row q-pa-md justify-center">
    <div class="col-4">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <h6 class="q-mb-sm">Datos de acceso</h6>
        <q-input
          filled
          v-model="username"
          label="Tu usuario o email *"
          hint="tu usuario Sii-Pi"
          lazy-rules
          :rules="[
            (val) => (val && val.length > 0) || 'Ingresa tu usuario o email',
          ]"
        />

        <q-input
          filled
          type="password"
          v-model="password"
          label="Tu password *"
          lazy-rules
          :rules="[(val) => (val && val.length > 0) || 'Ingresa tu password']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
      <q-separator class="q-mt-lg" />
      <q-btn
        to="/myapp/recover"
        icon="key"
        flat
        label="Olvido su password"
        class="col-4 q-my-md"
      />
      <q-btn
        to="/myapp/register"
        icon="person"
        flat
        label="Registrate"
        class="col-4 q-my-md"
      />
    </div>
  </div>
  {{ roleStore.user }}
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useRoleStore } from "stores/RoleStore";

export default {
  data() {
    const $q = useQuasar();
    const router = useRouter();
    const roleStore = useRoleStore();
    const username = ref("");
    const password = ref("");

    return {
      username,
      password,
      roleStore,
      onSubmit() {
        const val = roleStore.login(username.value, password.value);
        if (val) {
          $q.localStorage.set("security", "Yo soy un genio");
          $q.notify({
            color: "positive",
            textColor: "white",
            message: "Bienvenido",
          });
          router.push("/");
        } else {
          $q.localStorage.remove("security");
          $q.notify({
            color: "red",
            textColor: "white",
            message: "Datos incorrectos",
          });
        }
      },

      onReset() {
        username.value = null;
        password.value = null;
      },
    };
  },
};
</script>
