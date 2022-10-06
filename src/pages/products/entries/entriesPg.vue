<template>
    <div class="q-pa-md">
        <q-table title="Entradas de Productos" :rows="productStore.entries" :columns="columns" row-key="id"
            :filter="filter">

            <template v-slot:top-right>
                <q-input borderless dense debounce="300" v-model="filter" placeholder="Search">
                    <template v-slot:append>
                        <q-icon name="search" />
                    </template>
                </q-input>
                <!-- BOTON PARA AGREGAR NUEVO USUARIO  -->
                <!--<q-btn icon="add" color="primary" to="add-product" class="q-ml-lg" /> -->
                <q-btn icon="add" color="green-14" to="add-product" class="q-ml-lg" />
            </template>

        </q-table>

        <div class="q-mt-md">

        </div>
    </div>
</template>
  
<script>
import { ref, defineComponent, onMounted } from "vue";
import { useProductStore } from "stores/product-store";

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
        label: "Fecha",
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
        align: "right",
        sortable: false,
    }
]


export default defineComponent({
    setup() {
        const rows = ref([]);
        const productStore = useProductStore();
        onMounted(async () => {
            await productStore.getEntries();
        });
        return {

            columns,
            rows,
            filter: ref(""),
            productStore,
        }
    }
})
</script>
  