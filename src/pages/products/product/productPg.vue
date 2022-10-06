<template>
    <div class="q-pa-md">

        <q-card>
            <q-tabs v-model="tab" class="bg-orange text-white shadow-2" active-color="grey-14" indicator-color="green"
                align="justify" narrow-indicator>
                <q-tab name="products" label="Productos" icon="fa-solid fa-seedling" />
                <q-tab name="warehouses" label="Almacenes" icon="fa-solid fa-warehouse" />
                <q-tab name="typeProduct" label="Tipos de Productos" icon="fa-solid fa-clipboard-question" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab" animated>
                <q-tab-panel name="products">

                    <q-table title="Productos" :rows="productStore.products" :columns="columns" :grid="$q.screen.xs"
                        no-data-label="No existen datos para mostrar" row-key="id" :filter="filter">
                        <template v-slot:top-right>
                            <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                                <template v-slot:append>
                                    <q-icon name="search" />
                                </template>
                            </q-input>
                            <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
                            <q-btn icon="add" color="green-14" to="add-product" class="q-ml-lg" />
                        </template>
                        <template v-slot:body-cell-actions="props">
                            <q-td :props="props" class="q-ma-none">
                                <q-btn icon="cameraswitch" color="secondary" flat round
                                    @click="myview(props.row), (confirm = true)" />
                                <q-btn icon="border_color" color="primary" flat round @click="myeditProd(props.row)" />
                                <q-btn icon="delete_sweep" color="red" flat round @click="mydeleteProd(props.row)" />
                            </q-td>
                        </template>

                        <!--  <template v-slot:body-cell-image="props">
                <q-td :props="props" class="q-ma-none">
                    <q-img :src="props.row.image.secure_url" style="width: 100px; height: 100px;" />

                </q-td>
            </template> -->

                    </q-table>
                </q-tab-panel>

                <q-tab-panel name="warehouses">

                    <q-table title="Almacenes" :rows="productStore.warehouses" :columns="columns2" :grid="$q.screen.xs"
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
                                <q-btn icon="list_alt" color="secondary" flat round @click="myProduct(props.row)" />
                                <q-btn icon="edit" color="primary" flat round @click="myedit(props.row)" />
                                <q-btn icon="delete" color="red" flat round @click="mydeleteWarehouse(props.row)" />
                            </q-td>
                        </template>
                    </q-table>

                </q-tab-panel>

                <q-tab-panel name="typeProduct">

                    <q-table title="Tipo de Producto" :rows="productStore.typeProducts" :columns="columns3"
                        :grid="$q.screen.xs" no-data-label="No existen datos para mostrar" row-key="id"
                        :filter="filter3">
                        <template v-slot:top-right>
                            <q-input borderless dense debounce="300" v-model="filter3" placeholder="Search">
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
                </q-tab-panel>
            </q-tab-panels>
        </q-card>


        <q-dialog v-model="confirm">
            <q-card class="my-card">
                <q-card-section>
                    <h6 class="q-ma-none">
                        <q-icon name="speaker_notes" color="blue-grey-8" size="1.3em" class="q-mr-xs" />
                        Detalle del Producto
                    </h6>
                </q-card-section>
                <div class="col-6">
                    <q-img :src="productStore.imageProduct.image.secure_url" no-native-menu>
                        <div class="absolute-bottom text-subtitle1 text-center">
                            {{productStore.imageProduct.name}}
                        </div>
                    </q-img>
                </div>
                <q-list>
                    <q-item clickable>
                        <q-item-section avatar>
                            <q-icon color="primary" name="edit_calendar" />
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>Fecha de Expiracion</q-item-label>
                            <q-item-label caption>{{productStore.imageProduct.dateOfExpiration}}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable>
                        <q-item-section avatar>
                            <q-icon color="red" name="where_to_vote" />
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>Ubicacion del Producto</q-item-label>
                            <q-item-label caption>{{productStore.imageProduct.warehouse.name}}</q-item-label>
                            <q-item-label caption>Pasillo:{{productStore.imageProduct.hallway}}</q-item-label>
                            <q-item-label caption>Estante:{{productStore.imageProduct.shelf}}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable>
                        <q-item-section avatar>
                            <q-icon color="amber" name="workspaces" />
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>Clasificaion</q-item-label>
                            <q-item-label caption>Categoria: {{productStore.imageProduct.subCategory.name}}
                            </q-item-label>
                            <q-item-label caption>Familia: {{productStore.imageProduct.category.name}}</q-item-label>
                        </q-item-section>
                    </q-item>

                    <q-item clickable>
                        <q-item-section avatar>
                            <q-icon color="secondary" name="fa-solid fa-arrow-down-up-across-line" />
                        </q-item-section>

                        <q-item-section>
                            <q-item-label>Maximos y Minimos</q-item-label>
                            <q-item-label caption>Stock minimo: {{productStore.imageProduct.minStock}}</q-item-label>
                            <q-item-label caption>Stock maximo: {{productStore.imageProduct.maxStock}}</q-item-label>
                        </q-item-section>
                    </q-item>
                </q-list>
            </q-card>
        </q-dialog>

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
        label: "Precio Bs",
        align: "left",
        sortable: true,
        field: (row) => row.price,
    },

    {
        name: "unit",
        label: "Unidad de Medida",
        field: "unit",
        align: "left",
        sortable: true,
        field: (row) => row.unit.name,
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

const columns3 = [

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
    }

]

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
            await productStore.getCategories();
            await productStore.getSubcategories();
            await productStore.getUnit();
        });

        return {
            filter: ref(""),
            filter2: ref(""),
            filter3: ref(""),
            columns,
            columns2,
            columns3,
            rows,
            productStore,
            router,
            confirm,
            tab: ref('products'),

            myeditProd(row) {
                productStore.editProduct(row._id);
                router.push("edit-product");
            },
            myview(row) {
                productStore.viewImage(row._id);
            },

            myProduct(row) {
                productStore.getDetail(row._id);
                router.push("details-product");
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
