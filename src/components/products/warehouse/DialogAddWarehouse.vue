<template>
    <q-dialog v-model="dialog" persistent>
        <q-card flat bordered style="width: 500px; min-height: 100px">
            <q-card-section class="row">
                <h6 class="text-h6 q-ma-none">
                    <q-icon name="group_add" color="blue-grey-8" size="1.3em" class="q-mr-xs" />
                    Almacen
                </h6>
            </q-card-section>
            <q-separator />

            <q-card-section class="q-ma-none q-pb-none">
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                    <q-input filled v-model="name" label="Nombre Almacen *" hint="Mínimo 3, Máximo 30 caracteres"
                        lazy-rules :rules="[
                          (val) => (val && val.length > 2) || 'Mínimo 3 caracteres',
                          (val) => val.length < 31 || 'Máximo 30 caracteres',
                        ]" />


                    <!--<q-input filled v-model="status" label="Estado del Tipo de Proveedor *"
                        hint="Usar active o inactive o pending o blocked o deleted" lazy-rules :rules="[
                          (val) => (val && val.length > 1) || 'Mínimo 2 caracteres',
                          (val) => val.length < 8 || 'Máximo 5 caracteres',
                        ]" /> -->
                    <q-input filled v-model="address" label="Dirección *" hint="Mínimo 5, Máximo 50 caracteres"
                        lazy-rules :rules="[
                          (val) => (val && val.length > 4) || 'Mínimo 6 caracteres',
                          (val) => val.length < 51 || 'Máximo 50 caracteres',
                        ]" />

                    <q-select filled v-model="status" label="Estado del Almacen *" :options="[
                      { label: 'active', value: 'active' },
                      { label: 'inactive', value: 'inactive' },
                      { label: 'pending', value: 'pending' },
                      { label: 'blocked', value: 'blocked' },
                      { label: 'deleted', value: 'deleted' },
                    ]" />

                    <q-separator />
                    <q-btn color="orange" label="Agregar" glossy class="q-mr-sm" @click="myFunction2" />
                    <q-btn color="grey-6" label="Cancelar" type="reset" glossy @click="CancelEvent" />
                </q-form>
            </q-card-section>

            <q-separator class="q-mt-md" />
        </q-card>
    </q-dialog>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";

export default defineComponent({
    name: "WarehouseAdd",
    emits: ["cancelEvent"],
    setup(props, { emit }) {
        const $q = useQuasar();
        const name = ref("");
        const address = ref("");
        const status = ref("");

        const onReset = () => {
            name.value = "";
            address.value = "";
            status.value = "";
        };

        return {
            name,
            address,
            status,

            myFunction2() {
                emit("addWarehouse", {
                    name: name.value,
                    address: address.value,
                    status: status.value.value,
                });

                emit("cancelEvent");

                onReset();

                $q.notify({
                    message: "Almacen Agregado",
                    color: "positive",
                    position: "top",
                    timeout: 2000,
                });
            },

            CancelEvent() {
                emit("cancelEvent");
                onReset();
            },
        };
    },
});
</script>
