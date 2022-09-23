<template>
    <div class="row justify-center">
        <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">
                <q-input filled v-model="name" label="Tipo de Proveedor *" hint="Mínimo 3, Máximo 30 caracteres"
                    lazy-rules :rules="[
                      (val) =>
                        (val && val.length > 2) || 'Tipo Proveedor, Mínimo 3 caracteres',
                      (val) => val.length < 31 || 'Tipo Proveedor, Máximo 30 caracteres',
                    ]" />
                <q-input filled v-model="description" label="Descripcion  *" hint="Mínimo 3, Máximo 30 caracteres"
                    lazy-rules :rules="[
                      (val) => (val && val.length > 2) || 'Mínimo 6 caracteres',
                      (val) => val.length < 31 || 'Máximo 30 caracteres',
                    ]" />

                <!--<q-input filled v-model="status" label="Estado del Tipo de Proveedor *"
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

    {{ productStore.newProvaider }}
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useProductStore } from "stores/product-store";
import { api } from "boot/axios";

export default {
    name: "EditTypeProvaider",

    setup() {
        const $q = useQuasar();
        const router = useRouter();
        const productStore = useProductStore();

        const name = ref(productStore.newTypeProvider.name) || ref("");
        const description =
            ref(productStore.newTypeProvider.description) || ref("");
        const status = ref(productStore.newTypeProvider.status) || ref("");

        return {
            name,
            description,
            status,
            productStore,
            router,
            $q,

            async onSubmit() {
                try {
                    const response = await api.put(
                        `/api/typeProvaider/update/${productStore.newTypeProvider._id}`,
                        {
                            name: name.value,
                            description: description.value,
                            status: status.value,
                        }
                    );
                    console.log(response);
                    $q.notify({
                        message: "Tipo de Proveedor Actualizado",
                        color: "positive",
                        position: "top",
                    });
                    router.push("/admin/provaiders");
                } catch (error) {
                    console.log(error);
                    $q.notify({
                        message: "Error al Actualizar Tipo de Proveedor",
                        color: "negative",
                        position: "top",
                    });
                }
            },

            onReset() {
                name.value = "";
                description.value = "";
                status.value = "";
            },
        };
    },
};
</script>
