<template>
    <div>
        <div class="q-gutter-y-md">
            <q-tabs v-model="tab" inline-label class="bg-orange text-white shadow-2" align="left">
                <q-tab name="data" label="Datos Proveedor" icon="switch_account" />

            </q-tabs>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="data">
                    <UpdateProvaider />
                </q-tab-panel>

            </q-tab-panels>
        </div>
    </div>
</template>
<script>
import { ref, defineComponent } from "vue";


import { useUserStore } from "stores/user-store";

import UpdateProvaider from "src/components/products/provaider/UpdateProvaider.vue";
export default defineComponent({
    name: "EditProvaiderPg",
    components: { UpdateProvaider },
    setup() {
        const userStore = useUserStore();
        return {
            tab: ref("data"),
            userStore,
        };
    },
});
</script>
  