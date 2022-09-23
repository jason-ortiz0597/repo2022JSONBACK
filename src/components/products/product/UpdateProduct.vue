<template>
    <div class="row justify-center">
        <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
            <h6 class="q-ma-none">
                <!--{{ productStore.typeProvaiders.name }} -->
                {{ name }}
                {{ provaider}}
                {{ typeProduct}}
                {{ warehouse }}
                {{ shelf}}
                {{ hallway}}
                {{ stock }}
                {{dayMargin}}
                {{ dateOfExpiration}}
                {{ price }}
                {{ status}}
                {{ image}}
            </h6>

            <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">

                <q-input filled v-model="name" label="Nombre del Producto *" hint="Mínimo 3, Máximo 30 caracteres"
                    lazy-rules :rules="[
                      (val) =>
                        (val && val.length > 2) || 'Nombre(s), Mínimo 3 caracteres',
                      (val) => val.length < 31 || 'Nombre(s), Máximo 30 caracteres',
                    ]" />


                <sel-add v-model="provaider" v-bind:model="'legalReason'" v-bind:label="'Proveedor'"
                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'assignment_ind'" v-bind:data="
                      productStore.provaiders.map((item) => ({
                        label: item.legalReason,
                        value: item._id,
                      }))
                    " />


                <seladdSin v-model="typeProduct" v-bind:model="'name'" v-bind:label="'Tipo de Producto'"
                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'dns'" v-bind:data="
                      productStore.typeProducts.map((item) => ({
                        label: item.name,
                        value: item._id,
                      }))
                    " @myDialog="myFunction" />

                <seladdSin v-model="warehouse" v-bind:model="'name'" v-bind:label="'Almacén'"
                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'factory'" v-bind:data="
                      productStore.warehouses.map((item) => ({
                        label: item.name,
                        value: item._id,
                      }))
                    " @myDialog="myFunction" />

                <q-input filled v-model="shelf" type="text" label="Estante" />

                <q-input filled v-model="hallway" type="text" label="Pasillo" />

                <q-input filled v-model="stock" type="number" label="Stock Minimo" lazy-rules :rules="[
                  (val) => (val !== null && val !== '') || 'Ingrese un stock',
                  (val) => (val > 0 && val < 99999999) || 'Ingrese un stock válido',
                ]" />
                <q-input filled v-model="dateOfExpiration" type="date" hint="Fecha de Vencimiento" />

                <q-input filled v-model="price" type="number" label="Precio" lazy-rules :rules="[
                  (val) => (val !== null && val !== '') || 'Ingrese un precio',
                  (val) => (val > 0 && val < 99999999) || 'Ingrese un precio válido',
                ]" />

                <q-input filled v-model="dayMargin" type="number" label="Margen de Dias de Vencimiento" />




                <!---<q-input filled v-model="status" label="Estado del Tipo de Proveedor *"
            hint="Usar active o inactive o pending o blocked o deleted" lazy-rules :rules="[
              (val) => (val && val.length > 1) || 'Mínimo 2 caracteres',
              (val) => val.length < 8 || 'Máximo 5 caracteres',
            ]" /> -->


                <q-select filled v-model="status" label="Estado del Producto *" :options="[
                  { label: 'active', value: 'active' },
                  { label: 'inactive', value: 'inactive' },
                  { label: 'pending', value: 'pending' },
                  { label: 'blocked', value: 'blocked' },
                  { label: 'deleted', value: 'deleted' },
                ]" />

                <q-file color="teal" filled v-model="image" label="Imagen del Producto">
                    <template v-slot:append>
                        <q-icon name="cloud_upload" />
                    </template>
                </q-file>




                <div>
                    <q-btn label="Guardar" type="submit" color="orange" />
                    <q-btn label="Cancelar" type="reset" color="grey-6" class="q-ml-sm" />
                </div>
            </q-form>
        </div>
    </div>
    <!--me quede aqui mañana seguir por favor-->
    <dialog-add-provaider v-model="addProv" @cancelEvent="addProv = 'false'" @addTypeProvaider="addTypeProvaider" />
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import seladdSin from "src/components/users/seladdSin.vue";
import selAdd from "src/components/users/selAdd.vue";
import { useProductStore } from "stores/product-store";
import DialogAddProvaider from "../typeProvaider/DialogAddTypeProvaider.vue";
import { api } from "src/boot/axios";

export default {
    name: "EditProduct",
    components: {
        seladdSin,
        DialogAddProvaider,
        selAdd,
    },
    setup() {
        const $q = useQuasar();
        const router = useRouter();

        const productStore = useProductStore();

        const addProv = ref(false);

        const name = ref(productStore.newProduct.name) || "";
        const provaider = ref(productStore.newProduct.provaider.legalReason) || "";
        const typeProduct = ref(productStore.newProduct.typeProduct.name) || "";
        const warehouse = ref(productStore.newProduct.warehouse.name) || "";
        const shelf = ref(productStore.newProduct.shelf) || "";
        const hallway = ref(productStore.newProduct.hallway) || "";
        const stock = ref(productStore.newProduct.stock) || "";
        const dateOfExpiration = ref(productStore.newProduct.dateOfExpiration);
        const price = ref(productStore.newProduct.price) || "";
        const dayMargin = ref(productStore.newProduct.dayMargin) || "";
        const status = ref(productStore.newProduct.status) || "";
        const image = ref([productStore.newProduct.image]) || "";


        return {
            router,
            $q,
            productStore,
            addProv,

            name,
            provaider,
            typeProduct,
            warehouse,
            shelf,
            hallway,
            stock,
            dateOfExpiration,
            price,
            dayMargin,
            status,
            image,


            async onSubmit() {
                try {
                    const data = {
                        name: name.value,
                        provaider: provaider.value,
                        typeProduct: typeProduct.value,
                        warehouse: warehouse.value,
                        shelf: shelf.value,
                        hallway: hallway.value,
                        stock: stock.value,
                        dateOfExpiration: dateOfExpiration.value,
                        price: price.value,
                        dayMargin: dayMargin.value,
                        status: status.value,
                        image: image.value,
                    };
                    console.log(data);

                } catch (error) {
                    console.log(error);
                }
            },




            onReset() {
                name.value = "";
                provaider.value = "";
                typeProduct.value = "";
                warehouse.value = "";
                shelf.value = "";
                hallway.value = "";
                stock.value = "";
                dateOfExpiration.value = "";
                price.value = "";
                dayMargin.value = "";
                status.value = "";
                image.value = [];
            },

            myFunction(data) {
                addProv.value = true;
            },

            addTypeProvaider(data) {
                productStore.addTypeProvider(data.name, data.description, data.status);
            },
        };
    },
};
</script>
  