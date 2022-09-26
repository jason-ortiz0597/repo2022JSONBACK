<template>
  <div class="row justify-center">
    <div>
      <h6 class="q-ma-none">
        <!--{{ productStore.typeProvaiders.name }} -->

      </h6>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">

        <div class="q-pa-md">
          <div class="row q-col-gutter-x-md">
            <div class="col-6 ">
              <q-input filled v-model="legalReason" label="Razon Social *" hint="Mínimo 3, Máximo 30 caracteres"
                lazy-rules :rules="[
                  (val) =>
                    (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
                  (val) => val.length < 31 || 'Nombre(s), Máximo 30 caracteres',
                ]" />

            </div>

            <div class="col-6">
              <q-input filled v-model="address" label="Dirección *" hint="Mínimo 5, Máximo 50 caracteres" lazy-rules
                :rules="[
                  (val) => (val && val.length > 4) || 'Mínimo 6 caracteres',
                  (val) => val.length < 51 || 'Máximo 50 caracteres',
                ]" />
            </div>

            <div class="col-6">
              <q-input filled type="number" v-model="phone" label="Numero de teléfono *"
                hint="Mínimo 7, Máximo 8 dígitos" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Ingrese un número de teléfono',
                  (val) =>
                    (val > 20000000 && val < 89999999) || 'Ingrese un número válido',
                ]" />
            </div>

            <div class="col-6">
              <q-input filled v-model="email" type="email" label="Tu email *" hint="Mínimo 5, Máximo 50 caracteres"
                lazy-rules :rules="[
                  (val) => val.length > 5 || 'Mínimo 6 caracteres',
                  (val) => val.length < 51 || 'Máximo 50 caracteres',
                  (val) => isValidEmail(val) || 'Email inválido',
                  (val) => emailValid(val) || 'Email ya registrado',
                ]" />
            </div>

            <div class="col-6">
              <q-input filled v-model="contact" label="Contacto *" hint="Mínimo 3, Máximo 30 caracteres" lazy-rules
                :rules="[
                  (val) =>
                    (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
                  (val) => val.length < 31 || 'Nombre(s), Máximo 30 caracteres',
                ]" />
            </div>

            <div class="col-6">
              <q-input filled type="number" v-model="phoneContact" label="Numero de teléfono *"
                hint="Mínimo 7, Máximo 8 dígitos" lazy-rules :rules="[
                  (val) =>
                    (val !== null && val !== '') || 'Ingrese un número de teléfono',
                  (val) =>
                    (val > 20000000 && val < 89999999) || 'Ingrese un número válido',
                ]" />
            </div>

            <div class="col-6">
              <seladdSin v-model="typeProvaider" v-bind:model="'name'" v-bind:label="'Tipo de Proveedor'"
                v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'assignment_ind'" v-bind:data="
                  productStore.typeProvaiders.map((item) => ({
                    label: item.name,
                    value: item._id,
                  }))
                " @myDialog="myFunction" />
            </div>

            <div class="col-6">
              <q-select filled v-model="status" label="Estado del  Proveedor *" :options="[
                { label: 'active', value: 'active' },
                { label: 'inactive', value: 'inactive' },
                { label: 'pending', value: 'pending' },
                { label: 'blocked', value: 'blocked' },
                { label: 'deleted', value: 'deleted' },
              ]" />
            </div>


          </div>
        </div>

        <!---<q-input filled v-model="status" label="Estado del Tipo de Proveedor *"
          hint="Usar active o inactive o pending o blocked o deleted" lazy-rules :rules="[
            (val) => (val && val.length > 1) || 'Mínimo 2 caracteres',
            (val) => val.length < 8 || 'Máximo 5 caracteres',
          ]" /> -->


        <div class="row justify-center">
          <q-btn label="Guardar" type="submit" color="orange" />
          <q-btn label="Cancelar" type="reset" color="grey-6" class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>

  <dialog-add-provaider v-model="addProv" @cancelEvent="addProv = 'false'" @addTypeProvaider="addTypeProvaider" />
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import seladdSin from "src/components/users/seladdSin.vue";
import { useProductStore } from "stores/product-store";
import DialogAddProvaider from "../typeProvaider/DialogAddTypeProvaider.vue";
import { api } from "src/boot/axios";

export default {
  name: "ProvaiderAdd",
  components: {
    seladdSin,
    DialogAddProvaider,
  },
  setup() {
    const $q = useQuasar();
    const router = useRouter();

    const productStore = useProductStore();

    const addProv = ref(false);

    const legalReason = ref("");
    const address = ref("");
    const phone = ref("");
    const email = ref("");
    const typeProvaider = ref("");
    const contact = ref("");
    const phoneContact = ref("");
    const status = ref("");

    return {
      router,
      $q,
      productStore,
      addProv,

      legalReason,
      address,
      phone,
      email,
      typeProvaider,
      contact,
      status,
      phoneContact,

      isValidEmail: (val) => {
        const emailPattern =
          /^(?=[a-zA-Z0-9@._%+-]{6,254}$)[a-zA-Z0-9._%+-]{1,64}@(?:[a-zA-Z0-9-]{1,63}\.){1,8}[a-zA-Z]{2,63}$/;
        return emailPattern.test(val);
      },

      emailValid: (val) => {
        const result = productStore.provaiders.filter(
          (provaider) => provaider.email == val
        ).length;
        return result == 0 || productStore.newProvaider.email == val;
      },

      async onSubmit() {
        try {
          const response = await api.post("/api/provaider/create", {
            legalReason: legalReason.value,
            address: address.value,
            phone: phone.value,
            email: email.value,
            typeProvaider: typeProvaider.value.value,
            contact: contact.value,
            phoneContact: phoneContact.value,
            status: status.value.value,
          });
          console.log(response);
          $q.notify({
            message: "Proveedor agregado",
            color: "positive",
            position: "top",
          });
          router.push("/admin/provaiders");
        } catch (error) {
          $q.notify({
            message: "Error al agregar el proveedor",
            color: "negative",
            position: "top",
          });
        }
      },




      onReset() {
        legalReason.value = "";
        address.value = "";
        phone.value = "";
        email.value = "";
        typeProvaider.value = "";
        contact.value = "";
        phoneContact.value = "";
        status.value = "";
      },

      myFunction(data) {
        addProv.value = true;
      },

      addTypeProvaider(data) {
        productStore.addTypeProvider(data.name, data.description, data.status);
      },
    };
  },
};
</script>
