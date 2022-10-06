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

                <seladdSin v-model="subCategory" v-bind:model="'name'" v-bind:label="'Categoria'"
                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'workspaces'" v-bind:data="
                      productStore.subcategories.map((item) => ({
                        label: item.name,
                        value: item._id,
                      }))
                    " @myDialog="myFunction3" />

                <seladdSin v-model="category" v-bind:model="'name'" v-bind:label="'Familia'"
                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'view_in_ar'" v-bind:data="
                      productStore.categories.map((item) => ({
                        label: item.name,
                        value: item._id,
                      }))
                    " @myDialog="myFunction4" />

                <seladdSin v-model="unit" v-bind:model="'name'" v-bind:label="'Unidad de Medida'"
                    v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'settings'" v-bind:data="
                      productStore.units.map((item) => ({
                        label: item.name,
                        value: item._id,
                      }))
                    " @myDialog="myFunction5" />




                <q-input filled v-model="shelf" type="text" label="Estante" />

                <q-input filled v-model="hallway" type="text" label="Pasillo" />

                <q-input filled v-model="minStock" type="number" label="Stock Minimo" />
                <q-input filled v-model="maxStock" type="number" label="Stock Maximo" />
                <q-input filled v-model="dateOfExpiration" type="date" hint="Fecha de Vencimiento" />

                <q-input filled v-model="price" type="number" label="Precio" lazy-rules :rules="[
                  (val) => (val !== null && val !== '') || 'Ingrese un precio',
                  (val) => (val > 0 && val < 99999999) || 'Ingrese un precio válido',
                ]" />

                <q-input filled v-model="dayMargin" type="number" label="Margen de Dias de Vencimiento" />


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


    <dialog-add-category v-model="addC" @cancelEvent="addC = 'false'" @addCategory="addCategory" />

    <dialog-add-family-vue v-model="addF" @cancelEvent="addF = 'false'" @addFamily="addFamily" />

    <dialog-add-unit v-model="addU" @cancelEvent="addU = 'false'" @addUnit="addUnit" />

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
import DialogAddCategory from "src/components/products/category/DialogAddCategory.vue"
import DialogAddFamilyVue from "src/components/products/category/DialogAddFamily.vue";
import DialogAddUnit from "src/components/products/unit/DialogAddUnit.vue";
import { api } from "src/boot/axios";

export default {
    name: "ProductAdd",
    components: {
        seladdSin,
        selAdd,
        DialogAddTypeProduct,
        DialogAddWarehouse,
        DialogAddCategory,
        DialogAddFamilyVue,
        DialogAddUnit,
    },
    setup() {
        const $q = useQuasar();
        const router = useRouter();

        const productStore = useProductStore();


        const addTP = ref(false);
        const addW = ref(false);
        const addC = ref(false);
        const addF = ref(false);
        const addU = ref(false);


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
        const minStock = ref("");
        const maxStock = ref("");
        const category = ref("");
        const subCategory = ref("");
        const unit = ref("");






        return {
            router,
            $q,
            productStore,
            addTP,
            addW,
            addC,
            addF,
            addU,
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
            minStock,
            maxStock,
            category,
            subCategory,
            unit,








            async onSubmit() {
                try {
                    const formData = new FormData();
                    formData.append("name", name.value);
                    formData.append("provaider", provaider.value.value);
                    formData.append("typeProduct", typeProduct.value.value);
                    formData.append("warehouse", warehouse.value.value);
                    formData.append("category", category.value.value);
                    formData.append("subCategory", subCategory.value.value);
                    formData.append("unit", unit.value.value);
                    formData.append("shelf", shelf.value);
                    formData.append("hallway", hallway.value);
                    formData.append("minStock", minStock.value);
                    formData.append("maxStock", maxStock.value);
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
                category.value = "";
                subCategory.value = "";
                unit.value = "";
                shelf.value = "";
                hallway.value = "";
                minStock.value = "";
                maxStock.value = "";
                dateOfExpiration.value = "";
                price.value = "";
                dayMargin.value = "";
                status.value = "";
                image.value = [];
                minStock.value = "";
                maxStock.value = "";
            },

            myFunction(data) {

                addTP.value = true;

            },

            myFunction2(data) {

                addW.value = true;
            },

            myFunction3(data) {

                addC.value = true;
            },

            myFunction4(data) {

                addF.value = true;
            },

            myFunction5(data) {

                addU.value = true;
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

            addCategory(data) {
                productStore.addCategory(data.name, data.abreviation, data.status);
            },

            addFamily(data) {
                productStore.addFamily(data.name, data.description, data.abreviation, data.subCategory, data.status);
            },

            addUnit(data) {
                productStore.addUnit(data.name, data.abreviation);
            },
        };
    },
};
</script>
  