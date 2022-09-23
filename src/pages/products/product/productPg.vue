<template>
    <div class="q-pa-md">
        <q-table title="Productos" :rows="productStore.products" :columns="columns"
            no-data-label="No existen datos para mostrar" row-key="id" :filter="filter">
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
                <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
                <q-btn icon="add" color="primary" to="add-product" class="q-ml-lg" />
            </template>
            <template v-slot:body-cell-actions="props">
                <q-td :props="props" class="q-ma-none">
                    <q-btn icon="visibility" color="secondary" flat round
                        @click="myview(props.row), (confirm = true)" />
                    <q-btn icon="edit" color="primary" flat round @click="myeditProd(props.row)" />
                    <q-btn icon="delete" color="red" flat round @click="mydeleteProd(props.row)" />
                </q-td>
            </template>

            <!--  <template v-slot:body-cell-image="props">
                <q-td :props="props" class="q-ma-none">
                    <q-img :src="props.row.image.secure_url" style="width: 100px; height: 100px;" />

                </q-td>
            </template> -->
        </q-table>
        <q-dialog v-model="confirm">
            <q-card class="my-card">
                <q-card-section class="row">
                    <h6 class="text-h6 q-ma-none">
                        <q-icon name="description" color="blue-grey-8" size="1.3em" class="q-mr-xs" />
                        Detalles del Producto
                    </h6>
                </q-card-section>
                <q-img :src="productStore.imageProduct.image.secure_url" />

                <q-card-section class="q-pt-none">
                    <q-list bordered>

                        <q-separator spaced inset vertical dark />
                        <q-item-section class="text-h6">Fecha de Expiracion
                        </q-item-section>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon color="blue-grey-8" name="calendar_month" />
                            </q-item-section>

                            <q-item-section>
                                {{ productStore.imageProduct.dateOfExpiration }}
                            </q-item-section>
                        </q-item>
                        <q-item-section class="text-h6 ">Ubicacion del Producto
                        </q-item-section>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon color="blue-grey-8" name="place" />
                            </q-item-section>
                            <q-item-section> {{ productStore.imageProduct.warehouse.name }}
                            </q-item-section>
                            <q-item-section>Pasillo {{ productStore.imageProduct.hallway }}
                            </q-item-section>
                            <q-item-section>Estante {{ productStore.imageProduct.shelf }}
                            </q-item-section>
                        </q-item>
                        <q-item-section class="text-h6">Margen de Dia de Expiracion
                        </q-item-section>
                        <q-item clickable v-ripple>
                            <q-item-section avatar>
                                <q-icon color="blue-grey-8" name="schedule" />
                            </q-item-section>

                            <q-item-section>
                                {{ productStore.imageProduct.dayMargin }} dias
                            </q-item-section>
                        </q-item>
                    </q-list>
                </q-card-section>

                <!---<q-card-actions align="right">
                    <q-btn color="orange" label="volver" glossy class="q-mr-sm" v-close-popup />
                </q-card-actions> -->
            </q-card>
        </q-dialog>
    </div>

    <div class="q-pa-md">
        <q-table title="Almacenes" :rows="productStore.warehouses" :columns="columns2"
            no-data-label="No existen datos para mostrar" row-key="id" :filter="filter2">
            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter2" placeholder="Search">
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
        </q-table>
    </div>

    <q-separator spaced inset vertical dark />
</template>

<script>
import { ref, defineComponent, onMounted } from "vue";
import { useProductStore } from "stores/product-store";
import { useRouter } from "vue-router";
import { useQuasar } from "quasar";

const columns = [
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
        name: "provaider",
        label: "Proveedores",
        align: "left",
        sortable: true,
        field: (row) => row.provaider.legalReason,
    },
    {
        name: "tyProduct",
        label: "Tipo de Producto",
        align: "left",
        sortable: true,
        field: (row) => row.typeProduct.name,
    },


    {
        name: "price",
        label: "Precio",
        align: "left",
        sortable: true,
        field: (row) => row.price,
    },
    {
        name: "stock",
        label: "Stock Minimo Requerido",
        align: "left",
        sortable: true,
        field: (row) => row.stock,
    },

    {
        name: "status",
        label: "Estado",
        align: "left",
        sortable: true,
        field: (row) => row.status,
    },
    {
        name: "actions",
        label: "Acciones",
        align: "left",
        sortable: true,
        field: (row) => row.actions,
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
        name: "address",
        align: "left",
        label: "Direccion",
        field: (row) => row.address,
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

export default defineComponent({
    name: "ProductPg",

    setup() {
        const $q = useQuasar();
        const rows = ref([]);
        const productStore = useProductStore();
        const router = useRouter();
        const confirm = ref(false);

        onMounted(async () => {
            await productStore.getProducts();
            await productStore.getWarehouses();
            await productStore.getProviders();
            await productStore.getTypeProducts();
        });

        return {
            filter: ref(""),
            filter2: ref(""),
            columns,
            columns2,
            rows,
            productStore,
            router,
            confirm,

            myeditProd(row) {
                productStore.editProduct(row._id);
                router.push("edit-product");
            },
            myview(row) {
                productStore.viewImage(row._id);
            },

            mydeleteProd(row) {
                $q.dialog({
                    title: "Eliminar",
                    message: "¿Estas seguro de eliminar este producto?",
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await productStore.deleteProduct(row._id);
                    $q.notify({
                        message: "Producto eliminado",
                        color: "positive",
                        icon: "check_circle",
                    });
                    await productStore.getProducts();
                });
            }
        };
    },
});
</script>

<style lang="sass" scoped>
.my-card
  width: 100%
  max-width: 350px
</style>
