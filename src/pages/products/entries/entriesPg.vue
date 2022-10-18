<template>
    <div class="q-pa-md">
        <q-card class="my-card">
            <q-tabs v-model="tab" class="bg-orange text-white shadow-2" active-color="grey-14" indicator-color="green"
                align="justify" narrow-indicator>
                <q-tab name="entries" label="Entradas de Productos" icon="fa-solid fa-people-carry-box" />
                <q-tab name="exits" label="Salidas de Productos" icon="fa-solid fa-dolly" />
                <q-tab name="inventory" label="Inventario de Productos" icon="inventory" />
            </q-tabs>

            <q-separator />


            <q-tab-panels v-model="tab">

                <q-tab-panel name="entries">

                    <div class=" row ">
                        <div class="q-ma-none q-gutter-md">
                            <q-btn color="green-14" v-if="!show" icon="add" @click="show = true" />
                            <q-btn color="red-14" v-else icon="close" @click="show = false" />
                        </div>
                    </div>

                    <div class="row justify-center">
                        <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
                            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md" v-if="show">
                                <seladdSin v-model="product" v-bind:model="'name'" v-bind:label="'Productos'"
                                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'category'" v-bind:data="
                                      productStore.products.map((item) => ({
                                        label: item.name,
                                        value: item._id,
                                      }))
                                    " @myDialog="myFunction" />

                                <seladdSin v-model="typeEntries" v-bind:model="'name'" v-bind:label="'Tipo de entrada'"
                                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'library_books'" v-bind:data="
                                      productStore.typeEntry.map((item) => ({
                                        label: item.name,
                                        value: item._id,
                                      }))
                                    " @myDialog="myFunction" />

                                <q-input filled v-model="price" type="number" prefix="Bs" label="Precio" lazy-rules
                                    :rules="[
                                      (val) => (val !== null && val !== '') || 'Ingrese un precio',
                                      (val) =>
                                        (val > 0 && val < 99999999) || 'Ingrese un precio válido',
                                    ]">
                                    <template v-slot:prepend>
                                        <q-icon name="fa-solid fa-money-bill-1-wave" />
                                    </template>
                                </q-input>

                                <q-input filled v-model.number="quantity" type="number" label="Cantidad" lazy-rules
                                    :rules="[
                                      (val) => (val !== null && val !== '') || 'Ingrese una cantidad',
                                      (val) =>
                                        (val > 0 && val < 99999999) || 'Ingrese una cantidad válida',
                                    ]">
                                    <template v-slot:prepend>
                                        <q-icon name="production_quantity_limits" />
                                    </template>
                                </q-input>

                                <!--  <seladdSin v-model="unit" v-bind:model="'name'" v-bind:label="'Unidad'"
v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'fa-solid fa-scale-unbalanced-flip'"
v-bind:data="
  productStore.units.map((item) => ({
    label: item.name,
    value: item._id,
  }))
" @myDialog="myFunction3" /> -->

                                <q-input filled v-model="date" type="date" hint="Fecha de Entrada" />

                                <q-select filled v-model="status" label="Estado de la Salida *" :options="[
                                  { label: 'active', value: 'active' },
                                  { label: 'inactive', value: 'inactive' },
                                  { label: 'pending', value: 'pending' },
                                  { label: 'blocked', value: 'blocked' },
                                  { label: 'deleted', value: 'deleted' },
                                ]" />
                                <div>
                                    <q-btn label="Guardar" type="submit" color="orange" />
                                    <q-btn label="Cancelar" type="reset" color="grey-6" class="q-ml-sm" />
                                </div>
                            </q-form>
                        </div>
                    </div>
                    <div class="q-pa-md">
                        <q-table title="Entradas de Productos" :rows="productStore.entries" :columns="columns"
                            row-key="id" :filter="filter">
                            <template v-slot:top-right>
                                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>

                                <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
                                <!--<q-btn icon="add" color="primary" to="add-product" class="q-ml-lg" /> -->
                            </template>

                            <template v-slot:body-cell-total="props">
                                <q-td :props="props">
                                    <!-- {{ props.row.price * props.row.quantity }} -->

                                    <q-badge color="red" v-if="props.row.total ===0 "> {{ props.row.total }}
                                    </q-badge>
                                    <q-badge color="green" v-else> {{ props.row.total }} </q-badge>


                                </q-td>
                            </template>

                            <template v-slot:body-cell-message="props">
                                <q-td :props="props">
                                    <!-- {{ props.row.price * props.row.quantity }} -->

                                    <q-badge color="red" v-if="props.row.total ===0 "> "No hay Stock disponible"
                                    </q-badge>
                                    <q-badge color="green" v-else> "Stock Disponible" </q-badge>


                                </q-td>
                            </template>

                            <template v-slot:body-cell-actions="props">
                                <q-td :props="props" class="q-ma-none">
                                    <q-btn icon="delete_sweep" color="red" flat round
                                        @click="mydeleteEntry(props.row)" />
                                </q-td>
                            </template>

                        </q-table>
                    </div>
                </q-tab-panel>

                <q-tab-panel name="exits">

                    <div class=" row ">
                        <div class="q-ma-none q-gutter-md">
                            <q-btn color="green-14" v-if="!show2" icon="add" @click="show2 = true" />
                            <q-btn color="red-14" v-else icon="close" @click="show2 = false" />
                        </div>
                    </div>

                    <div class="row justify-center">
                        <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
                            <q-form @submit="onSubmit2" @reset="onReset2" class="q-gutter-lg q-mt-md" v-if="show2">
                                <seladdSin v-model="entry" v-bind:model="'name'" v-bind:label="'Productos de Salida'"
                                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'category'" v-bind:data="
                                      productStore.entries.map((item) => ({
                                        label: item.product.name,
                                        value: item._id,
                                      }))
                                    " @myDialog="myFunction" />

                                <seladdSin v-model="typeExits" v-bind:model="'name'" v-bind:label="'Tipo de Salida'"
                                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'library_books'" v-bind:data="
                                      productStore.typeExit.map((item) => ({
                                        label: item.name,
                                        value: item._id,
                                      }))
                                    " @myDialog="myFunction" />

                                <q-input filled v-model="price" type="number" prefix="Bs" label="Precio" lazy-rules
                                    :rules="[
                                      (val) => (val !== null && val !== '') || 'Ingrese un precio',
                                      (val) =>
                                        (val > 0 && val < 99999999) || 'Ingrese un precio válido',
                                    ]">
                                    <template v-slot:prepend>
                                        <q-icon name="fa-solid fa-money-bill-1-wave" />
                                    </template>
                                </q-input>

                                <q-input filled v-model.number="quantity" type="number" label="Cantidad" lazy-rules
                                    :rules="[
                                      (val) => (val !== null && val !== '') || 'Ingrese una cantidad',
                                      (val) =>
                                        (val > 0 && val < 99999999) || 'Ingrese una cantidad válida',
                                    ]">
                                    <template v-slot:prepend>
                                        <q-icon name="production_quantity_limits" />
                                    </template>
                                </q-input>


                                <!--  <seladdSin v-model="unit" v-bind:model="'name'" v-bind:label="'Unidad'"
                                v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'fa-solid fa-scale-unbalanced-flip'"
                                v-bind:data="
                                productStore.units.map((item) => ({
                                label: item.name,
                                 value: item._id,
                                }))
                                " @myDialog="myFunction3" /> -->

                                <q-input filled v-model="date" type="date" hint="Fecha de Salida" />

                                <q-select filled v-model="status" label="Estado de la Salida *" :options="[
                                  { label: 'active', value: 'active' },
                                  { label: 'inactive', value: 'inactive' },
                                  { label: 'pending', value: 'pending' },
                                  { label: 'blocked', value: 'blocked' },
                                  { label: 'deleted', value: 'deleted' },
                                ]" />
                                <div>
                                    <q-btn label="Guardar" type="submit" color="orange" />
                                    <q-btn label="Cancelar" type="reset" color="grey-6" class="q-ml-sm" />
                                </div>
                            </q-form>
                        </div>
                    </div>


                    <div class="q-pa-md">
                        <q-table title="Salida de Productos" :rows="productStore.exits" :columns="columns2" row-key="id"
                            :filter="filter2">
                            <template v-slot:top-right>
                                <q-input borderless dense debounce="300" v-model="filter2" placeholder="Search">
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>

                                <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
                                <!--<q-btn icon="add" color="primary" to="add-product" class="q-ml-lg" /> -->
                            </template>
                            <template v-slot:body-cell-actions="props">
                                <q-td :props="props" class="q-ma-none">
                                    <q-btn icon="delete_sweep" color="red" flat round
                                        @click="mydeleteExit(props.row)" />
                                </q-td>
                            </template>

                        </q-table>
                    </div>

                </q-tab-panel>

                <q-tab-panel name="inventory">
                    <div class="q-pa-md">
                        <q-table title="Inventario de Productos" :rows="productStore.inventory" :columns="columns3"
                            row-key="id" :filter="filter3">
                            <template v-slot:top-right>
                                <q-input borderless dense debounce="300" v-model="filter3" placeholder="Search">
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>

                                <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
                                <!--<q-btn icon="add" color="primary" to="add-product" class="q-ml-lg" /> -->
                            </template>

                            <template v-slot:body-cell-totalS="props">
                                <q-td :props="props">
                                    <!-- {{ props.row.price * props.row.quantity }} -->


                                    <q-badge color="red" v-if="props.row.totalS <= 0 "> {{
                                    props.row.totalS }}
                                    </q-badge>
                                    <q-badge color="green" v-else> {{ props.row.totalS }} </q-badge>


                                </q-td>
                            </template>

                            <template v-slot:body-cell-message="props">
                                <q-td :props="props">
                                    <!-- {{ props.row.price * props.row.quantity }} -->


                                    <q-badge color="red" v-if="props.row.totalS <= 0 "> Agotado se requiere reposicion
                                    </q-badge>
                                    <q-badge color="green" v-else> Disponible </q-badge>

                                </q-td>
                            </template>


                        </q-table>
                    </div>
                </q-tab-panel>

            </q-tab-panels>

        </q-card>


        <dialog-add-type-entry v-model="addTE" @cancelEvent="addTE = 'false'" @addTypeEntry="addTypeEntry" />
    </div>


</template>

<script>
import { ref, onMounted } from "vue";
import { useProductStore } from "stores/product-store";
import { useRouter } from "vue-router";
import seladdSin from "src/components/users/seladdSin.vue";
import DialogAddTypeEntry from "src/components/products/entries/DialogAddTypeEntry.vue";
import { api } from "src/boot/axios";
import { useQuasar } from "quasar";

const columns = [
    {
        name: "product",
        label: "Producto",
        align: "left",
        sortable: true,
        field: (row) => row.product.name,
    },

    {
        name: "typeEntries",
        label: "Tipo de entrada",
        align: "left",
        sortable: true,
        field: (row) => row.typeEntries.name,
    },

    {
        name: "quantity",
        label: "Cantidad Egresada",
        field: "quantity",
        align: "left",
        sortable: true,
    },

    {
        name: "price",
        label: "Precio de Compra",
        field: "price",
        align: "left",
        sortable: true,
    },

    {
        name: "total",
        label: "Total Entrada",
        field: "total",
        align: "left",
        sortable: true,
    },

    {
        name: "date",
        label: "Fecha Entrada",
        field: "date",
        align: "left",
        sortable: true,
    },

    {
        name: "message",
        label: "Alerta",
        field: "message",
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
        field: "actions",
        align: "left",
        sortable: true,
    },
];

const columns2 = [

    {
        name: "entry",
        label: "Nombre Producto",
        align: "left",
        sortable: true,
        field: (row) => row.entry.product.name,
    },

    {
        name: "typeExits",
        label: "Tipo de Salida",
        align: "left",
        sortable: true,
        field: (row) => row.typeExits.name,
    },

    {
        name: "quantity",
        label: "Cantidad de Salida",
        field: "quantity",
        align: "left",
        sortable: true,
    },

    {
        name: "price",
        label: "Precio de Venta",
        field: "price",
        align: "left",
        sortable: true,
    },

    {
        name: "total",
        label: "Total Disponible",
        field: "total",
        align: "left",
        sortable: true,
    },

    {
        name: "date",
        label: "Fecha Salida",
        field: "date",
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
        field: "actions",
        align: "left",
        sortable: true,
    },
];

const columns3 = [

    {
        name: "product",
        label: "Nombre Producto",
        align: "left",
        sortable: true,
        field: (row) => row.product,
    },

    {
        name: "totalEntry",
        label: "Entradas",
        field: "totalEntry",
        align: "left",
        sortable: true,
    },

    {
        name: "totalExit",
        label: "Salidas",
        field: "totalExit",
        align: "left",
        sortable: true,
    },

    {
        name: "totalS",
        label: "Total Inventario",
        field: "totalS",
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
        name: "minStock",
        label: "Stock Minimo",
        field: "minStock",
        align: "left",
        sortable: true,
    },
    {
        name: "maxStock",
        label: "Stock Maximo",
        field: "maxStock",
        align: "left",
        sortable: true,
    },


    {
        name: "message",
        label: "Alerta",
        field: "message",
        align: "left",
        sortable: true,
    },




];


export default {
    components: {
        seladdSin,
        DialogAddTypeEntry,
    },
    setup() {
        const rows = ref([]);
        const productStore = useProductStore();
        const show = ref(false);
        const show2 = ref(false);
        const product = ref("");
        const entry = ref("");
        const typeEntries = ref("");
        const typeExits = ref("");
        const price = ref("");

        const quantity = ref("");

        const date = ref("");

        const status = ref("");


        const addTE = ref(false);
        //const unit = ref("");
        const $q = useQuasar();

        const router = useRouter();

        onMounted(async () => {

            await productStore.getEntries();
            await productStore.getTypeEntry();
            await productStore.getExits();
            await productStore.getTypeExit();
            await productStore.getInventory();
        });









        return {
            columns,
            columns2,
            columns3,
            rows,
            filter: ref(""),
            filter2: ref(""),
            filter3: ref(""),
            productStore,
            show,
            show2,
            product,
            entry,
            typeEntries,
            typeExits,
            price,
            quantity,
            date,
            status,
            tab: ref("entries"),
            addTE,
            router,
            //  unit,

            async onSubmit() {
                const response = await api.post("api/entries/create", {
                    product: product.value.value,
                    typeEntries: typeEntries.value.value,
                    price: price.value,
                    quantity: quantity.value,
                    date: date.value,
                    status: status.value.value,
                });
                if (response.status === 200) {
                    $q.notify({
                        message: "Entrada de producto agregada",
                        color: "positive",
                        position: "top",
                    });
                    await productStore.getEntries();
                    show.value = false;
                    router.push("entries");
                }
            },

            onReset() {
                product.value = "";
                typeEntries.value = "";
                price.value = "";
                quantity.value = "";
                date.value = "";
                status.value = "";
            },

            async onSubmit2() {
                const response = await api.post("api/exits/createExits", {
                    entry: entry.value.value,
                    typeExits: typeExits.value.value,
                    price: price.value,
                    quantity: quantity.value,
                    date: date.value,
                    status: status.value.value,
                });
                if (response.status === 201) {
                    $q.notify({
                        message: "Salida de producto agregada",
                        color: "positive",
                        position: "top",
                    });
                    await productStore.getExits();
                    show2.value = false;
                }
                // console.log(entry.value.value, typeExits.value.value, price.value, quantity.value, date.value, status.value.value);
            },

            onReset2() {
                entry.value = "";
                typeExits.value = "";
                price.value = "";
                quantity.value = "";
                date.value = "";
                status.value = "";
            },


            mydeleteEntry(row) {
                $q.dialog({
                    title: "Eliminar",
                    message: "¿Estas seguro de eliminar esta Entrada?",
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await productStore.deleteEntry(row._id);
                    $q.notify({
                        message: "Entrada eliminado",
                        color: "positive",
                        icon: "check_circle",
                    });
                    await productStore.getEntries();
                    router.go();
                });
            },

            mydeleteExit(row) {
                $q.dialog({
                    title: "Eliminar",
                    message: "¿Estas seguro de eliminar esta Salida?",
                    cancel: true,
                    persistent: true,
                }).onOk(async () => {
                    await productStore.deleteExit(row._id);
                    $q.notify({
                        message: "Salida eliminado",
                        color: "positive",
                        icon: "check_circle",
                    });
                    await productStore.getExits();
                });
            },




            myEntry(row) {
                productStore.viewProduct(row._id);
            },

            myFunction(data) {
                addTE.value = true;
            },

            addTypeEntry(data) {
                productStore.addTypeEntry(data.name, data.description, data.status);
            },


        };
    },
};
</script>
