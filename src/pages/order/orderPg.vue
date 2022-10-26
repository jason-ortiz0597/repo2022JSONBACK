<template>
    <!-- <div class="flex q-pa-md q-gutter-y-md">

        <h3>PEDIDOS SIIPI</h3>
        <div class="q-pa-md q-gutter-md">
            <q-btn color="teal">
                <q-icon left size="5em" name="map" />
                <div>Pedido Por Defectos</div>
            </q-btn>
        </div>
    </div> -->
    <div class="q-pa-md ">
        <q-card>
            <q-tabs v-model="tab" class="bg-orange text-white shadow-2" active-color="grey-14" indicator-color="green"
                align="justify" narrow-indicator>
                <q-tab name="orders" label="Pedidos Siipi" icon="fa-solid fa-clipboard-list" />
                <q-tab name="viewOrders" label="Ver Mi Pedido" icon="fa-solid fa-cart-shopping" />
                <q-tab name="allOrders" label="Historial del Pedidos" icon="fa-solid fa-clock-rotate-left" />
            </q-tabs>

            <q-separator />

            <q-tab-panels v-model="tab">
                <q-tab-panel name="orders">
                    <q-list bordered class="rounded-borders">

                        <q-expansion-item v-for="({ _id, name }, i) in productStore.subcategories" :key="i"
                            expand-separator icon="fact_check" :label="name" @click="addProduct(_id)">


                            <q-item v-for="({ _id, name }, j) in productStore.myproducts" :key="j">

                                <q-form @submit="onSubmit(`${_id}`)" @reset="onReset">
                                    <div class="q-pa-md ">
                                        <div class="row q-col-gutter-x-md ">

                                            <q-item-section>
                                                {{ name }}
                                            </q-item-section>


                                            <q-item-section side>
                                                <q-btn dense flat icon="remove" @click="minOrder(`${_id}`)"></q-btn>
                                            </q-item-section>


                                            <q-item-section side>
                                                <q-input v-model="quantity[`${_id}`]" type="number"
                                                    label="Ingrese la cantidad" filled />
                                            </q-item-section>



                                            <q-item-section side>
                                                <q-btn dense flat icon="add" @click="addOrder(`${_id}`)"></q-btn>
                                            </q-item-section>


                                            <q-item-section side>
                                                <q-btn type="submit" color="green-14" icon="check" />
                                            </q-item-section>


                                        </div>
                                    </div>

                                </q-form>

                            </q-item>


                        </q-expansion-item>



                    </q-list>

                </q-tab-panel>

                <q-tab-panel name="viewOrders">

                    <div v-if="!existeProductos()">
                        <q-card class="q-pa-md">
                            <q-card-section>
                                <div class="text-h6">Lista de pedidos</div>
                            </q-card-section>
                        </q-card>
                        <q-list bordered>
                            <q-item clickable v-ripple v-for="({ _id, products, quantity }, f) in productStore.myitems"
                                :key="f" expand-separator>
                                <q-item-section avatar>
                                    <q-icon name="shopping_cart" />
                                </q-item-section>
                                <q-item-section>
                                    {{ products.name }}
                                </q-item-section>

                                <q-item-section>
                                    {{ quantity }}
                                </q-item-section>

                                <q-item-section side>
                                    <q-btn icon="delete_sweep" color="red" flat round @click="deleteOrder(`${_id}`)">
                                    </q-btn>
                                </q-item-section>
                            </q-item>
                        </q-list>
                        <q-separator spaced inset vertical dark />
                        <div>
                            <q-btn color="orange-14" label="confirmar" @click="confirm" />

                        </div>

                    </div>


                </q-tab-panel>

                <q-tab-panel name="allOrders">

                    <h1>aqui puedes ver todos tus pedidos realizados</h1>

                </q-tab-panel>

            </q-tab-panels>

        </q-card>

        <!-- <pre>

            {{ productStore.myproducts }}
            {{ productStore.subcategories }}
        </pre> -->

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









    </div>



</template>

<script>
import { ref, onMounted } from "vue";
import { useProductStore } from "stores/product-store";
import { useRouter } from "vue-router";
import { useQuasar } from 'quasar'


import { api } from "src/boot/axios";
export default {
    name: "OrderPg",
    setup() {

        const router = useRouter();
        const productStore = useProductStore();
        const quantity = ref([]);
        const $q = useQuasar()


        onMounted(() => {
            productStore.getSubcategories();
            productStore.getProducts();
            productStore.getPurchased();
        });

        return {

            router,
            productStore,
            quantity,
            tab: ref('orders'),



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




            minOrder(_id) {

                if (quantity.value[_id] == undefined) {
                    quantity.value[_id] = 0;
                } else {
                    quantity.value[_id]--;
                }

            },

            onReset() {
                console.log("reset");
            },


            async onSubmit(_id) {
                console.log(quantity.value[_id]);
                console.log(_id);
                const data = {
                    quantity: quantity.value[_id],
                    products: _id
                }
                const response = await api.post("api/purchase/create", data);
                productStore.getPurchased();
                console.log(response);


            },

            async deleteOrder(_id) {
                const response = await api.delete(`api/purchase/delete/${_id}`);
                productStore.getPurchased();
                console.log(response);
            },

            existeProductos() {
                if (productStore.myitems == 0) {
                    return true;
                } else {
                    return false;
                }
            },

            confirm() {
                $q.dialog({
                    title: 'Confirmación',
                    message: '¿Desea confirmar el pedido?',
                    cancel: true,
                    persistent: true
                }).onOk(() => {
                    console.log('OK')
                }).onCancel(() => {
                    console.log('Cancel')
                }).onDismiss(() => {
                    console.log('Dismiss')
                })
            },







        };
    },
};


</script>