<template>
  <div class="q-pa-md">
    <q-table title="Proveedores" :rows="productStore.provaiders" :columns="columns"
      no-data-label="No existen datos para mostrar" row-key="id" :filter="filter">
      <template v-slot:top-right>
        <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>
        <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
        <q-btn icon="add" color="primary" to="add-provaider" class="q-ml-lg" />
      </template>
      <template v-slot:body-cell-actions="props">
        <q-td :props="props" class="q-ma-none">
          <q-btn icon="edit" color="primary" flat round @click="myedit(props.row)" />
          <q-btn icon="delete" color="red" flat round @click="mydelete(props.row)" />
        </q-td>
      </template>
      <template></template>
    </q-table>
  </div>
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import { useProductStore } from "stores/product-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const columns = [
  {
    name: "legalReason",
    required: true,
    label: "legalReason",
    align: "left",
    field: (row) => row.legalReason,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "address",
    align: "left",
    label: "address",
    field: (row) => row.address,
    sortable: true,
  },
  {
    name: "phone",
    label: "phone",
    field: "phone",
    align: "left",
    sortable: true,
  },
  { name: "email", label: "email", field: "email", align: "left", sortable: true },
  { name: "typeProvaider", label: "typeProvaider", field: "typeProvaider", align: "left", sortable: true, field: (row) => row.typeProvaider.name },
  {
    name: "contact",
    label: "contact",
    field: "contact",
    align: "left",
    sortable: true,
  },
  {
    name: "phoneContact",
    label: "phoneContact",
    field: "phoneContact",
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "status",
    field: "status",
    align: "left",
    sortable: true,
  },
  {
    name: "actions",
    label: "Acciones",
    align: "right",
    sortable: false,
  },
];

export default defineComponent({
  name: "ProvaiderPg",

  setup() {
    const $q = useQuasar();
    const rows = ref([]);
    const productStore = useProductStore();
    const router = useRouter();

    onMounted(async () => {
      await productStore.getProviders();
    });

    return {
      filter: ref(""),
      columns,
      rows,
      productStore,
      router,

      myedit(row) {
        userStore.editUser(row._id);
        router.push("edit-user");
      },
      mydelete(row) {
        $q.dialog({
          title: "Confirm",
          message: `${row.first_name.toUpperCase()} ${row.last_name.toUpperCase()} sera eliminada, esta seguro?`,
          cancel: true,
          persistent: true,
        })
          .onOk(() => {
            userStore.deleteUser(row._id);
            router.push("users");
          })
          .onOk(() => {
            // console.log('>>>> second OK catcher')
          })
          .onCancel(() => {
            // console.log('>>>> Cancel')
          })
          .onDismiss(() => {
            // console.log('I am triggered on both OK and Cancel')
          });
      },
    };
  },
});
</script>
