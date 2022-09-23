<template>
    <div>
        <div class="q-gutter-y-md">
            <q-tabs v-model="tab" inline-label class="bg-orange text-white shadow-2" align="left">
                <q-tab name="data" label="Datos Tipo Proveedor" icon="switch_account" />

            </q-tabs>

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="data">
                    <TypeProvaiderUpdate />
                </q-tab-panel>

            </q-tab-panels>
        </div>
    </div>
</template>
<script>
import { ref, defineComponent } from "vue";


import { useUserStore } from "stores/user-store";
import TypeProvaiderUpdate from "src/components/products/typeProvaider/TypeProvaiderUpdate.vue";
export default defineComponent({
    name: "EdittypeProvaiderPg",
    components: { TypeProvaiderUpdate },
    setup() {
        const userStore = useUserStore();
        return {
            tab: ref("data"),
            userStore,
        };
    },
});
</script>
  