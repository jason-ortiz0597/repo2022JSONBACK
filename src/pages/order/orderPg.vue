<template>
    <div class="flex q-pa-md q-gutter-y-md">
        <q-chip>
            <q-avatar>
                <img
                    src="https://res.cloudinary.com/siibolivia/image/upload/v1665404111/product-imagesSiipi/Pagina-Principal_q0eyey.jpg">
            </q-avatar>
            Pedidos Siipi
        </q-chip>

    </div>
    <div class="q-pa-md" flex flex-center>



        <!-- <q-list bordered separator>

            <q-item v-for="({ name }, index) in productStore.subcategories" :key="index" clickable v-ripple>

                <q-item-section>
                    {{ index + 1 }}
                </q-item-section>
                <q-item-section>
                    {{name }}
                </q-item-section>

            </q-item>
        </q-list> -->

        <q-list bordered class="rounded-borders">
            <q-expansion-item v-for="({ _id, name }, i) in productStore.subcategories" :key="i" expand-separator
                icon="receipt_long" :label="name" @click="addProduct(_id)">
                <q-item v-for="({ _id,name }, j) in productStore.myproducts" :key="j">

                    <q-item-section>
                        {{name}}
                    </q-item-section>
                    <q-item-section side>
                        <q-btn dense flat icon="remove" @click="minOrder()"></q-btn>
                    </q-item-section>

                    <q-item-section side>
                        <q-input v-model="quantity[`${_id}`]" type="number" label="Ingrese la cantidad" filled />
                    </q-item-section>

                    <q-item-section side>
                        <q-btn dense flat icon="add" @click="addOrder(`${_id}`)"></q-btn>
                    </q-item-section>

                    <q-item-section side>
                        <q-btn dense flat icon="visibility"></q-btn>
                    </q-item-section>
                    <q-item-section side>
                        <q-btn dense flat icon="close"></q-btn>
                    </q-item-section>




                </q-item>

            </q-expansion-item>

        </q-list>

    </div>





</template>

<script>
import { ref, onMounted } from "vue";
import { useProductStore } from "stores/product-store";
import { useRouter } from "vue-router";
export default {
    name: "OrderPg",
    setup() {

        const router = useRouter();
        const productStore = useProductStore();
        const quantity = ref([]);



        onMounted(() => {
            productStore.getSubcategories();
            productStore.getProducts();
        });

        return {

            router,
            productStore,
            quantity,


            addProduct(id) {
                productStore.getProductById(id);
            },

            //add +1 

            addOrder(id) {

                //   console.log(i, j);
                // console.log(quantity.value[id] = 20);


                if (quantity.value[id] == undefined) {
                    quantity.value[id] = 1;
                } else {
                    quantity.value[id]++;
                }




            },


            minOrder() {


                quantity.value--;
                console.log(quantity.value);


            },


        };
    },
};


</script>