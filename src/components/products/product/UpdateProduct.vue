<template>
  <div class="row justify-center">
    <div class="col-xs-10 col-sm-6 col-md-5 col-lg-5 col-xl-2">
      <h6 class="q-ma-none">



        <!-- {{productStore.newProduct}}-->
        {{name}} {{provaider}} {{typeProduct}} {{warehouse}} {{shelf}} {{hallway}} {{stock}} {{dateOfExpiration}}
        {{price}} {{dayMargin}}
      </h6>

      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-lg q-mt-md">

        <q-input filled v-model="name" label="Nombre del Producto *" hint="Mínimo 3, Máximo 30 caracteres" lazy-rules
          :rules="[
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

        <seladdSin v-model="subCategory" v-bind:model="'name'" v-bind:label="'Categoria'"
          v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'fact_check'" v-bind:data="
            productStore.subcategories.map((item) => ({
              label: item.name,
              value: item._id,
            }))
          " @myDialog="myFunction3" />

        <seladdSin v-model="category" v-bind:model="'name'" v-bind:label="'Familia'"
          v-bind:noData="'Sin datos, agregue uno'" v-bind:Icon="'fact_check'" v-bind:data="
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
    const subCategory = ref(productStore.newProduct.subCategory.name) || "";
    const category = ref(productStore.newProduct.category.name) || "";
    const unit = ref(productStore.newProduct.unit) || "";
    const shelf = ref(productStore.newProduct.shelf) || "";
    const hallway = ref(productStore.newProduct.hallway) || "";
    const minStock = ref(productStore.newProduct.minStock) || "";
    const maxStock = ref(productStore.newProduct.maxStock) || "";
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
      subCategory,
      category,
      unit,
      shelf,
      hallway,
      minStock,
      maxStock,
      dateOfExpiration,
      price,
      dayMargin,
      status,
      image,


      async onSubmit() {
        try {
          const data = new FormData();
          data.set("name", name.value);
          data.set("provaider", provaider.value.value);
          data.set("typeProduct", typeProduct.value.value);
          data.set("warehouse", warehouse.value.value);
          data.set("category", category.value.value);
          data.set("subCategory", subCategory.value.value);
          data.set("unit", unit.value.value);
          data.set("shelf", shelf.value);
          data.set("hallway", hallway.value);
          data.set("minStock", minStock.value);
          data.set("maxStock", maxStock.value);
          data.set("dateOfExpiration", dateOfExpiration.value);
          data.set("price", price.value);
          data.set("dayMargin", dayMargin.value);
          data.set("status", status.value);
          data.set("image", image.value);

          console.log(data.get("name"));
          console.log(data.get("provaider", provaider.value.value));
          console.log(data.get("typeProduct", typeProduct.value.value));
          console.log(data.get("warehouse", warehouse.value.value));
          console.log(data.get("category", category.value.value));
          console.log(data.get("subCategory", subCategory.value.value));
          console.log(data.get("shelf"));
          console.log(data.get("hallway"));
          console.log(data.get("minStock"));
          console.log(data.get("maxStock"));
          console.log(data.get("dateOfExpiration"));
          console.log(data.get("price"));
          console.log(data.get("dayMargin"));
          console.log(data.get("status"));
          console.log(data.get("image"));

          const response = await api.put(
            `/api/product/update/${productStore.newProduct._id}`,
            data
          );
          console.log(response);
          $q.notify({
            message: "Producto Actualizado",
            color: "positive",
            position: "top",
          });
          router.push("/admin/products");

        } catch (error) {
          console.log(error);
          $q.notify({
            message: "Error al Actualizar Producto",
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
        subCategory.value = "";
        category.value = "";
        shelf.value = "";
        hallway.value = "";
        minStock.value = "";
        maxStock.value = "";
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
  