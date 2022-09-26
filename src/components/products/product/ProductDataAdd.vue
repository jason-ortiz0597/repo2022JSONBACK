<template>
    <div class="row justify-center">
        <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
            <h6 class="q-ma-none">
                <!--{{ productStore.typeProvaiders.name }} -->
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
                    " @myDialog="myFunction2" />

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

                <q-file label-color="orange" filled use-chips v-model="image" label="Imagen del Producto">
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

    <dialog-add-type-product v-model="addTP" @cancelEvent="addTP = 'false'" @addTypeProduct="addTypeProduct" />

    <dialog-add-warehouse v-model="addW" @cancelEvent="addW = 'false'" @addWarehouse="addWarehouse" />
</template>
<script>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import seladdSin from "src/components/users/seladdSin.vue";
import selAdd from "src/components/users/selAdd.vue";
import { useProductStore } from "stores/product-store";
import DialogAddTypeProduct from "src/components/products/warehouse/DialogAddTypeProduct.vue";
import DialogAddWarehouse from "src/components/products/warehouse/DialogAddWarehouse.vue";
import { api } from "src/boot/axios";

export default {
    name: "ProductAdd",
    components: {
        seladdSin,
        selAdd,
        DialogAddTypeProduct,
        DialogAddWarehouse,
    },
    setup() {
        const $q = useQuasar();
        const router = useRouter();

        const productStore = useProductStore();


        const addTP = ref(false);
        const addW = ref(false);

        const name = ref("");
        const provaider = ref("");
        const typeProduct = ref("");
        const warehouse = ref("");
        const shelf = ref("");
        const hallway = ref("");
        const stock = ref("");
        const dateOfExpiration = ref("");
        const price = ref("");
        const dayMargin = ref("");
        const status = ref("");
        const image = ref([]);


        return {
            router,
            $q,
            productStore,
            addTP,
            addW,
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
                    const formData = new FormData();
                    formData.append("name", name.value);
                    formData.append("provaider", provaider.value.value);
                    formData.append("typeProduct", typeProduct.value.value);
                    formData.append("warehouse", warehouse.value.value);
                    formData.append("shelf", shelf.value);
                    formData.append("hallway", hallway.value);
                    formData.append("stock", stock.value);
                    formData.append("dateOfExpiration", dateOfExpiration.value);
                    formData.append("price", price.value);
                    formData.append("dayMargin", dayMargin.value);
                    formData.append("status", status.value.value);
                    formData.append("image", image.value);
                    const response = await api.post("/api/product/create", formData);
                    $q.notify({
                        message: "Producto creado",
                        color: "positive",
                        position: "top",
                    });
                    router.push("/admin/products");
                } catch (error) {
                    console.log(error);
                    $q.notify({
                        message: "Error al crear el producto",
                        color: "negative",
                        position: "top",
                    });

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

                addTP.value = true;

            },

            myFunction2(data) {

                addW.value = true;
            },

            addTypeProvaider(data) {
                productStore.addTypeProvider(data.name, data.description, data.status);
            },

            addTypeProduct(data) {
                productStore.addTypeProduct(data.name, data.status);
            },

            addWarehouse(data) {
                productStore.addWarehouse(data.name, data.address, data.status);
            },
        };
    },
};
</script>
  