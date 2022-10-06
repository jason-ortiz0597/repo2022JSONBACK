<template>
    <q-dialog v-model="dialog" persistent>
        <q-card flat bordered style="width: 500px; min-height: 100px">
            <q-card-section class="row">
                <h6 class="text-h6 q-ma-none">
                    <q-icon name="group_add" color="blue-grey-8" size="1.3em" class="q-mr-xs" />
                    Unidad de Medida
                </h6>
            </q-card-section>
            <q-separator />

            <q-card-section class="q-ma-none q-pb-none">
                <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
                    <q-input filled v-model="name" label="Nombre de Unidad *" hint="Mínimo 3, Máximo 30 caracteres"
                        lazy-rules :rules="[
                          (val) => (val && val.length > 2) || 'Mínimo 3 caracteres',
                          (val) => val.length < 31 || 'Máximo 30 caracteres',
                        ]" />

                    <q-input filled v-model="abreviation" label="Abreviacion *" hint="Mínimo 2, Máximo 5 caracteres"
                        lazy-rules :rules="[
                          (val) => (val && val.length > 1) || 'Mínimo 2 caracteres',
                          (val) => val.length < 5 || 'Máximo 5 caracteres',
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
    name: "UnitAdd",
    emits: ["cancelEvent"],
    setup(props, { emit }) {
        const $q = useQuasar();
        const name = ref("");
        const abreviation = ref("");


        const onReset = () => {
            name.value = "";
            abreviation.value = "";
        };

        return {
            name,
            abreviation,

            myFunction() {
                emit("addUnit", {
                    name: name.value,
                    abreviation: abreviation.value,
                });

                emit("cancelEvent");

                onReset();

                $q.notify({
                    message: "Unidad Agrergada",
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
