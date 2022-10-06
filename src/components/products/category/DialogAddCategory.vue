<template>
    <q-dialog v-model="dialog" persistent>
        <q-card flat bordered style="width: 500px; min-height: 100px">
            <q-card-section class="row">
                <h6 class="text-h6 q-ma-none">
                    <q-icon name="workspaces" color="blue-grey-8" size="1.3em" class="q-mr-xs" />
                    Categoria
                </h6>
            </q-card-section>
            <q-separator />

            <q-card-section class="q-ma-none q-pb-none">
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                    <q-input filled v-model="name" label="Nombre de la Categoria *"
                        hint="Mínimo 3, Máximo 30 caracteres" lazy-rules :rules="[
                          (val) => (val && val.length > 2) || 'Mínimo 3 caracteres',
                          (val) => val.length < 31 || 'Máximo 30 caracteres',
                        ]" />

                    <q-input filled v-model="abreviation" label="Abreviacion Categoria *"
                        hint="Mínimo 10, Máximo 50 caracteres" lazy-rules :rules="[
                          (val) => (val && val.length > 1) || 'Mínimo 11 caracteres',
                          (val) => val.length < 51 || 'Máximo 50 caracteres',
                        ]" />


                    <q-select filled v-model="status" label="Estado del  Proveedor *" :options="[
                      { label: 'active', value: 'active' },
                      { label: 'inactive', value: 'inactive' },
                      { label: 'pending', value: 'pending' },
                      { label: 'blocked', value: 'blocked' },
                      { label: 'deleted', value: 'deleted' },
                    ]" />

                    <q-separator />
                    <q-btn color="orange" label="Agregar" glossy class="q-mr-sm" @click="myFunction" />
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
    name: "CategoryAdd",
    emits: ["cancelEvent"],
    setup(props, { emit }) {
        const $q = useQuasar();
        const name = ref("");
        const abreviation = ref("");
        const status = ref("");

        const onReset = () => {
            name.value = "";
            abreviation.value = "";
            status.value = "";
        };

        return {
            name,
            abreviation,
            status,

            myFunction() {
                emit("addCategory", {
                    name: name.value,
                    abreviation: abreviation.value,
                    status: status.value.value,
                });

                emit("cancelEvent");

                onReset();

                $q.notify({
                    message: "Categoria Agregada",
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
