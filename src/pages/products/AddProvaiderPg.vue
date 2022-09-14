<template>
  <div>
    <div class="q-gutter-y-md">
      <q-tabs v-model="tab" inline-label class="bg-orange text-white shadow-2" align="left">
        <q-tab name="data" label="Datos Proveedor" icon="switch_account" />

        <q-tab name="observations" label="Observaciones" icon="event_note" />
        <q-tab name="references" label="Referencias" icon="support_agent" />
      </q-tabs>

      <q-tab-panels v-model="tab" animated>

        <q-tab-panel name="data">
          <provaider-data-add />
        </q-tab-panel>

        <q-tab-panel name="observations">
          <div class="text-h6">Movies</div>
          Lorem ipsum dolor sit amet consectetur adipisicing elit.
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
import ProvaiderDataAdd from "src/components/products/ProvaiderDataAdd.vue";

import { useProductStore } from "stores/product-store";

export default defineComponent({
  name: "AddProvaiderPg",
  components: { ProvaiderDataAdd },
  setup() {
    const productStore = useProductStore();
    return {
      tab: ref("data"),
      productStore,
    };
  },
});
</script>
