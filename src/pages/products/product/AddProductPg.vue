<template>
    <div>
        <div class="q-gutter-y-md">
            <q-tabs v-model="tab" inline-label class="bg-orange text-white shadow-2" align="left">
                <q-tab name="data" label="Datos del Producto" icon="switch_account" />

                <q-tab name="observations" label="Observaciones" icon="event_note" />
                <q-tab name="references" label="Referencias" icon="support_agent" />
            </q-tabs>

            <q-tab-panels v-model="tab" animated>

                <q-tab-panel name="data">
                    <product-data-add />
                </q-tab-panel>

                <q-tab-panel name="observations">
                    <!---  <provaider-update />   -->
                </q-tab-panel>

                <q-tab-panel name="references">
                    <div class="text-h6">Movies</div>
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                </q-tab-panel>
            </q-tab-panels>
        </div>
    </div>
</template>
<script>
import { ref, defineComponent } from "vue";

import ProductDataAdd from "src/components/products/product/ProductDataAdd.vue";

import { useProductStore } from "stores/product-store";

export default defineComponent({
    name: "AddProductPg",
    components: { ProductDataAdd },
    setup() {
        const productStore = useProductStore();
        return {
            tab: ref("data"),
            productStore,
        };
    },
});
</script>
  