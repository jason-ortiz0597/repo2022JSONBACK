<template>
  <div class="row justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
        <q-input filled v-model="legalReason" label="Nombre Proveedor *" hint="Mínimo 3, Máximo 30 caracteres"
          lazy-rules :rules="[
            (val) => (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
            (val) => val.length < 31 || 'Nombre(s), Máximo 30 caracteres',
          ]" />
        <q-input filled v-model="address" label="Direccion Proveedor *" hint="Mínimo 3, Máximo 30 caracteres" lazy-rules
          :rules="[
            (val) => (val && val.length > 2) || 'Mínimo 6 caracteres',
            (val) => val.length < 31 || 'Máximo 30 caracteres',
          ]" />

        <q-input filled type="number" v-model="phone" label="Numero de teléfono *" hint="Mínimo 7, Máximo 8 dígitos"
          lazy-rules :rules="[
            (val) => (val !== null && val !== '') || 'Ingrese un número de teléfono',
            (val) => (val > 20000000 && val < 89999999) || 'Ingrese un número válido',
          ]" />

        <q-separator />

        <q-input filled v-model="email" type="email" label="Tu email *" hint="Mínimo 5, Máximo 50 caracteres" lazy-rules
          :rules="[
            (val) => val.length > 5 || 'Mínimo 6 caracteres',
            (val) => val.length < 51 || 'Máximo 50 caracteres',
            (val) => isValidEmail(val) || 'Email inválido',
            (val) => emailValid(val) || 'Email ya registrado',
          ]" />

        <q-input filled v-model="contact" label="Contacto *" hint="Mínimo 3, Máximo 30 caracteres" lazy-rules :rules="[
          (val) => (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
          (val) => val.length < 31 || 'Nombre(s), Máximo 30 caracteres',
        ]" />

        <q-input filled type="number" v-model="phoneContact" label="Numero de teléfono Contacto *"
          hint="Mínimo 7, Máximo 8 dígitos" lazy-rules :rules="[
            (val) => (val !== null && val !== '') || 'Ingrese un número de teléfono',
            (val) => (val > 20000000 && val < 89999999) || 'Ingrese un número válido',
          ]" />

        <q-input filled v-model="status" label="Estado Proveedor *" hint="Debe ser Active or Deletd or Pending"
          lazy-rules :rules="[
            (val) => (val && val.length > 2) || 'estado, Mínimo 3 caracteres'
          ]" />

        <sel-add-provaider v-model="typeProvaider" v-bind:model="'name'" v-bind:label="'Tipo Proveedor'"
          v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'assignment_ind'" v-bind:data="
            productStore.provaiders.map((item) => ({
              label: item.name,
              value: item._id,
            }))
          " @myDialog="myFunction" />

        <div>
          <q-btn label="Guardar" type="submit" color="orange" />
          <q-btn label="Cancelar" type="reset" color="grey-6" class="q-ml-sm" />
        </div>
      </q-form>
      {{ productStore.newProvaider }}
    </div>
  </div>
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useProductStore } from "stores/product-store"
import { api } from "boot/axios";
import SelAddProvaider from "./SelAddProvaider.vue";
//import DialogAddProvaider from "./DialogAddProvaider.vue";

export default {
  name: "ProvaiderDataAdd",
  components: { SelAddProvaider },

  setup() {
    const $q = useQuasar();
    const router = useRouter();
    const productStore = useProductStore();

    //const first_name = ref(userStore.newUser.first_name) || ref("");
    //const last_name = ref(userStore.newUser.last_name) || ref("");
    //const doc_id = ref(userStore.newUser.doc_id) || ref("");
    //const phone = ref(userStore.newUser.phone) || ref("");
    //const address = ref(userStore.newUser.address) || ref("");
    //const email = ref(userStore.newUser.email) || ref("");
    //const username = ref(userStore.newUser.username) || ref("");
    //const password = ref("");
    //const match_password = ref("");

    const legalReason = ref("");
    const address = ref("");
    const phone = ref("");
    const email = ref("");
    const contact = ref("");
    const phoneContact = ref("");
    const status = ref("");
    const typeProvaider = ref("");
    const addPos = ref(false);

    return {

      legalReason,
      address,
      phone,
      email,
      contact,
      phoneContact,
      status,
      typeProvaider,
      productStore,
      router,
      addPos,
      $q,

      isValidEmail: (val) => {
        const emailPattern = /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val);
      },

      emailValid: (val) => {
        const result = productStore.provaiders.filter((provaider) => provaider.email == val).length;
        return result == 0 || productStore.newProvaider.email == val;
      },



      async onSubmit() {

        try {
          const dataForm = {
            legalReason: this.legalReason,
            address: this.address,
            phone: this.phone,
            email: this.email,
            contact: this.contact,
            phoneContact: this.phoneContact,
            status: this.status,
          };
          const response = await api.post("/api/provaider/create", dataForm);
          productStore.addProvaider(response.data);
          this.$q.notify({
            message: "Proveedor agregado correctamente",
            color: "positive",
            position: "top",
          });
          // this.router.push("/provaider");

        } catch (error) {
          $q.dialog({
            title: "ERROR",
            message: error.message,
          }).onOk(() => { });
        }
      },

      onReset() {
        this.legalReason = "";
        this.address = "";
        this.phone = "";
        this.email = "";
        this.contact = "";
        this.phoneContact = "";
        this.status = "";
      },

      myFunction(data) {
        addPos.value = true;
      },

    };
  },
};
</script>
  