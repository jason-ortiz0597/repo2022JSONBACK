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


            <q-tab-panels v-model="tab" animated>

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

                                <q-select filled v-model="status" label="Estado del Producto *" :options="[
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
                            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md" v-if="show2">
                                <seladdSin v-model="product" v-bind:model="'name'" v-bind:label="'Productos'"
                                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'category'" v-bind:data="
                                      productStore.entries.map((item) => ({
                                        label: item.name,
                                        value: item._id,
                                      }))
                                    " @myDialog="myFunction" />

                                <seladdSin v-model="typeExits" v-bind:model="'name'" v-bind:label="'Tipo de Salida'"
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
                            :filter="filter">
                            <template v-slot:top-right>
                                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                                    <template v-slot:append>
                                        <q-icon name="search" />
                                    </template>
                                </q-input>

                                <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
                                <!--<q-btn icon="add" color="primary" to="add-product" class="q-ml-lg" /> -->
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
import { ref, onMounted, watch } from "vue";
import { useProductStore } from "stores/product-store";
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
        label: "Cantidad",
        field: "quantity",
        align: "left",
        sortable: true,
    },

    {
        name: "price",
        label: "Precio",
        field: "price",
        align: "left",
        sortable: true,
    },

    {
        name: "total",
        label: "Total",
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
        name: "status",
        label: "Estado",
        field: "status",
        align: "left",
        sortable: true,
    },
];

const columns2 = [


    {
        name: "typeExits",
        label: "Tipo de Salida",
        align: "left",
        sortable: true,
        field: (row) => row.typeExits.name,
    },

    {
        name: "quantity",
        label: "Cantidad",
        field: "quantity",
        align: "left",
        sortable: true,
    },

    {
        name: "price",
        label: "Precio",
        field: "price",
        align: "left",
        sortable: true,
    },

    {
        name: "total",
        label: "Total",
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
        name: "status",
        label: "Estado",
        field: "status",
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
        const product = ref("");
        const typeEntries = ref("");
        const price = ref("");
        const quantity = ref("");
        const date = ref("");
        const status = ref("");
        const addTE = ref(false);
        //const unit = ref("");
        const $q = useQuasar();

        onMounted(async () => {

            await productStore.getEntries();
            await productStore.getTypeEntry();
            await productStore.getExits();
            await productStore.getTypeExit();
        });









        return {
            columns,
            columns2,
            rows,
            filter: ref(""),
            productStore,
            show,
            product,
            typeEntries,
            price,
            quantity,
            date,
            status,
            tab: ref("entries"),
            addTE,
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
