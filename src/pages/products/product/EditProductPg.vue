<template>
    <div>
        <div class="q-gutter-y-md">
            <q-tabs v-model="tab" inline-label class="bg-orange text-white shadow-2" align="left">
                <q-tab name="data" label="Actualizar Datos Producto" icon="switch_account" />

            </q-tabs>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="data">
                    <UpdateProduct />
                </q-tab-panel>

            </q-tab-panels>
        </div>
    </div>
</template>
<script>
import { ref, defineComponent } from "vue";



import { useProductStore } from "src/stores/product-store";


import UpdateProduct from "src/components/products/product/UpdateProduct.vue";
export default defineComponent({
    name: "EditProductPg",
    components: { UpdateProduct },
    setup() {
        const useProduct = useProductStore();
        return {
            tab: ref("data"),
            useProduct,
        };
    },
});
</script>
  