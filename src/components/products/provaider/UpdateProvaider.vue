<template>
    <div class="row justify-center">
        <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
                <q-input filled v-model="legalReason" label="Razon Social *" hint="Mínimo 3, Máximo 30 caracteres"
                    lazy-rules :rules="[
                      (val) =>
                        (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
                      (val) => val.length < 31 || 'Nombre(s), Máximo 30 caracteres',
                    ]" />

                <q-input filled v-model="address" label="Dirección *" hint="Mínimo 5, Máximo 50 caracteres" lazy-rules
                    :rules="[
                      (val) => (val && val.length > 4) || 'Mínimo 6 caracteres',
                      (val) => val.length < 51 || 'Máximo 50 caracteres',
                    ]" />

                <q-input filled type="number" v-model="phone" label="Numero de teléfono *"
                    hint="Mínimo 7, Máximo 8 dígitos" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Ingrese un número de teléfono',
                      (val) =>
                        (val > 20000000 && val < 89999999) || 'Ingrese un número válido',
                    ]" />

                <q-input filled v-model="email" type="email" label="Tu email *" hint="Mínimo 5, Máximo 50 caracteres"
                    lazy-rules :rules="[
                      (val) => val.length > 5 || 'Mínimo 6 caracteres',
                      (val) => val.length < 51 || 'Máximo 50 caracteres',
                      (val) => isValidEmail(val) || 'Email inválido',
                      (val) => emailValid(val) || 'Email ya registrado',
                    ]" />

                <seladdSin v-model="typeProvaider" v-bind:model="'name'" v-bind:label="'Tipo de Proveedor'"
                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'assignment_ind'" v-bind:data="
                      productStore.typeProvaiders.map((item) => ({
                        label: item.name,
                        value: item._id,
                      }))
                    " @myDialog="myFunction" />

                <q-input filled v-model="contact" label="Contacto *" hint="Mínimo 3, Máximo 30 caracteres" lazy-rules
                    :rules="[
                      (val) =>
                        (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
                      (val) => val.length < 31 || 'Nombre(s), Máximo 30 caracteres',
                    ]" />

                <q-input filled type="number" v-model="phoneContact" label="Numero de teléfono *"
                    hint="Mínimo 7, Máximo 8 dígitos" lazy-rules :rules="[
                      (val) =>
                        (val !== null && val !== '') || 'Ingrese un número de teléfono',
                      (val) =>
                        (val > 20000000 && val < 89999999) || 'Ingrese un número válido',
                    ]" />

                <!--  <q-input filled v-model="status" label="Estado del Tipo de Proveedor *"
                    hint="Usar active o inactive o pending o blocked o deleted" lazy-rules :rules="[
                      (val) => (val && val.length > 1) || 'Mínimo 2 caracteres',
                      (val) => val.length < 8 || 'Máximo 5 caracteres',
                    ]" /> -->

                <q-select filled v-model="status" label="Estado del  Proveedor *" :options="[
                  { label: 'active', value: 'active' },
                  { label: 'inactive', value: 'inactive' },
                  { label: 'pending', value: 'pending' },
                  { label: 'blocked', value: 'blocked' },
                  { label: 'deleted', value: 'deleted' },
                ]" />
                <q-separator />

                <div>
                    <q-btn label="Guardar" type="submit" color="orange" />
                    <q-btn label="Cancelar" type="reset" color="grey-6" class="q-ml-sm" />
                </div>
            </q-form>
        </div>
    </div>


</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useProductStore } from "stores/product-store";
import seladdSin from "src/components/users/seladdSin.vue";
import { api } from "boot/axios";

export default {
    name: "EditProvaider",
    components: {
        seladdSin,
    },

    setup() {
        const $q = useQuasar();
        const router = useRouter();
        const productStore = useProductStore();

        const legalReason = ref(productStore.newProvaider.legalReason) || ref("");
        const address = ref(productStore.newProvaider.address) || ref("");
        const phone = ref(productStore.newProvaider.phone) || ref("");
        const email = ref(productStore.newProvaider.email) || ref("");
        const typeProvaider =
            ref(productStore.newProvaider.typeProvaider.name) || ref("");
        const contact = ref(productStore.newProvaider.contact) || ref("");
        const phoneContact = ref(productStore.newProvaider.phoneContact) || ref("");
        const status = ref(productStore.newProvaider.status) || ref("");

        return {
            legalReason,
            address,
            phone,
            email,
            typeProvaider,
            contact,
            phoneContact,
            status,
            productStore,
            router,
            $q,

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
                    const response = await api.put(
                        `/api/provaider/update/${productStore.newProvaider._id}`,
                        {
                            legalReason: legalReason.value,
                            address: address.value,
                            phone: phone.value,
                            email: email.value,
                            typeProvaider: typeProvaider.value.value,
                            contact: contact.value,
                            phoneContact: phoneContact.value,
                            status: status.value.value,
                        }
                    );
                    console.log(response);
                    $q.notify({
                        message: " Proveedor Actualizado",
                        color: "positive",
                        position: "top",
                    });
                    router.push("/admin/provaiders");
                } catch (error) {
                    console.log(error);
                    $q.notify({
                        message: "Error al Actualizar Proveedor",
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
        };
    },
};
</script>
