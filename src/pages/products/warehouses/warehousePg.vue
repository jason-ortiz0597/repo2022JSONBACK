<template>
    <div class="q-pa-md">

        <q-card>
            <q-tabs v-model="tab" class="bg-orange text-white shadow-2" active-color="grey-14" indicator-color="green"
                align="justify" narrow-indicator>

                <q-tab name="warehouses" label="Productos por Almacen" icon="fa-solid fa-boxes" />



            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>


                <q-tab-panel name="warehouses">

                    <q-table title="Almacenes" :rows="productStore.detail" :columns="columns2" :grid="$q.screen.xs"
                        no-data-label="No existen datos para mostrar" row-key="id" :filter="filter2">
                        <template v-slot:top-right>
                            <q-input borderless dense debounce="300" v-model="filter2" placeholder="Search">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                            <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
                            <q-btn icon="update" color="primary" to="products" class="q-ml-lg" />
                        </template>
                        <template v-slot:body-cell-actions="props">
                            <q-td :props="props" class="q-ma-none">

                                <q-btn icon="edit" color="primary" flat round @click="myedit(props.row)" />
                                <q-btn icon="delete" color="red" flat round @click="mydeleteWarehouse(props.row)" />
                            </q-td>
                        </template>
                    </q-table>

                </q-tab-panel>



            </q-tab-panels>
        </q-card>


    </div>


    <q-separator spaced inset vertical dark />

</template>



<script>
import { ref, defineComponent, onMounted } from "vue";
import { useProductStore } from "stores/product-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

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
        name: "minStock",
        label: "Minimo Stock",
        align: "left",
        sortable: true,
        field: (row) => row.minStock,
    },

    {
        name: "warehouse",
        label: "Almacen",
        align: "left",
        sortable: true,
        field: (row) => row.warehouse.name,
    },

    {
        name: "maxStock",
        label: "Maximo Stock",
        align: "left",
        sortable: true,
        field: (row) => row.maxStock,
    },


    {
        name: "status",
        label: "Estado",
        align: "left",
        sortable: true,
        field: (row) => row.status,
    },

];


export default defineComponent({
    name: "ProductPg",

    setup() {
        const $q = useQuasar();
        const rows = ref([]);
        const productStore = useProductStore();
        const router = useRouter();



        onMounted(async () => {
            await productStore.getDetail();
        });

        return {

            filter2: ref(""),
            columns2,
            rows,
            productStore,
            router,
            confirm,
            tab: ref('warehouses'),

            myeditProd(row) {
                productStore.editProduct(row._id);
                router.push("edit-product");
            },





            mydeleteWarehouse(row) {
                $q.dialog({
                    title: "Eliminar",
                    message: "¿Estas seguro de eliminar este almacen?",
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await productStore.deleteWarehouse(row._id);
                    $q.notify({
                        message: "Almacen eliminado",
                        color: "positive",
                        icon: "check_circle",
                    });
                    await productStore.getWarehouses();
                });
            },

        };
    },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
