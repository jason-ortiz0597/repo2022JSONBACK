<template>

  <div class="q-pa-md">
    <q-card>
      <q-tabs v-model="tab" class="bg-orange text-white shadow-2" active-color="grey-14" indicator-color="green"
        align="justify" narrow-indicator>
        <q-tab name="provaiders" label="Proveedores" icon="fa-solid fa-chalkboard-user" />
        <q-tab name="typeProvaiders" label="Tipo Proveedores" icon="fa-solid fa-clipboard-question" />
      </q-tabs>

      <q-separator />

      <q-tab-panels v-model="tab" animated>
        <q-tab-panel name="provaiders">
          <q-table title="Proveedores" :separator="separator" :rows="productStore.provaiders" :columns="columns"
            no-data-label="No existen datos para mostrar" row-key="id" :filter="filter">
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
              <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
              <q-btn icon="add" color="green-14" to="add-provaider" class="q-ml-lg" />
            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-ma-none">
                <q-btn icon="edit" color="primary" flat round @click="myeditProv(props.row)" />
                <q-btn icon="delete" color="red" flat round @click="mydeleteProv(props.row)" />
              </q-td>
            </template>
            <template></template>
          </q-table>
        </q-tab-panel>
        <q-tab-panel name="typeProvaiders">
          <q-table title="Tipos de Proveedores" :rows="productStore.typeProvaiders" :columns="columns2"
            no-data-label="No existen datos para mostrar" row-key="id" :filter="filter2">
            <template v-slot:top-right>
              <q-input borderless dense debounce="300" v-model="filter2" placeholder="Search">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>

            </template>
            <template v-slot:body-cell-actions="props">
              <q-td :props="props" class="q-ma-none">
                <q-btn icon="edit" color="primary" flat round @click="myedit(props.row)" />
                <q-btn icon="delete" color="red" flat round @click="mydelete(props.row)" />
              </q-td>
            </template>
            <template></template>
          </q-table>
        </q-tab-panel>
      </q-tab-panels>
    </q-card>


  </div>

  <q-separator spaced inset vertical dark />

</template>
 <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
        <!-- <q-btn icon="add" color="primary" to="add-provaider" class="q-ml-lg" /> 
        v-if="Object.keys(productStore.typeProvaiders).length !== 0" -->

<script>
import { ref, defineComponent, onMounted } from "vue";
import { useProductStore } from "stores/product-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const columns = [
  {
    name: "legalReason",
    required: true,
    label: "Razon Social",
    align: "left",
    field: (row) => row.legalReason,
    format: (val) => `${val}`,
    sortable: true,
  },
  {
    name: "address",
    align: "left",
    label: "Direccion",
    field: (row) => row.address,
    sortable: true,
  },
  {
    name: "phone",
    label: "Telefono",
    field: "phone",
    align: "left",
    sortable: true,
  },
  { name: "email", label: "email", field: "email", align: "left", sortable: true },
  { name: "typeProvaider", label: "Tipo de Proveedor", align: "left", sortable: true, field: (row) => row.typeProvaider.name },
  {
    name: "contact",
    label: "Contacto",
    field: "contact",
    align: "left",
    sortable: true,
  },
  {
    name: "phoneContact",
    label: "Telefono Contacto",
    field: "phoneContact",
    align: "left",
    sortable: true,
  },
  {
    name: "status",
    label: "Estado",
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

const columns2 = [
  {
    name: "name",
    required: true,
    label: "Nombre",
    align: "left",
    field: (row) => row.name,
    format: (val) => `${val}`,
    sortable: true,
  },

  {
    name: "description",
    label: "Descripcion",
    field: "description",
    align: "left",
    sortable: true
  },

  {
    name: "status",
    label: "Estado",
    field: "status",
    align: "left",
    sortable: true
  },

  {
    name: "actions",
    label: "Acciones",
    align: "left",
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
      await productStore.getTypeProviders();
    });


    return {
      filter: ref(""),
      filter2: ref(""),
      columns,
      rows,
      productStore,
      router,
      columns2,
      tab: ref('provaiders'),
      separator: ref('cell'),


      myedit(row) {
        productStore.editTypeProvaider(row._id);
        router.push("edit-typeprovaider");


      },

      myeditProv(row) {
        productStore.editProvaider(row._id);
        router.push("edit-provaider");
      },

      mydeleteProv(row) {
        $q.dialog({
          title: "Eliminar",
          message: "¿Estas seguro de eliminar este proveedor?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await productStore.deleteProvaider(row._id);
          $q.notify({
            message: "Proveedor eliminado",
            color: "positive",
            icon: "check_circle",
          });
          await productStore.getProviders();
        });
      },

      mydelete(row) {
        $q.dialog({
          title: "Eliminar",
          message: "¿Estas seguro de eliminar este registro?",
          cancel: true,
          persistent: true,
        }).onOk(async () => {
          await productStore.deleteTypeProvider(row._id);
          $q.notify({
            message: "Registro eliminado",
            color: "positive",
            icon: "check_circle",
          });
          await productStore.getTypeProviders();
        });
      },
    };
  },
});
</script>
