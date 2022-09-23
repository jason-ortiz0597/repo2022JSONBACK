import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { date } from "Quasar"

export const useProductStore = defineStore('ProductStore', {

    state: () => ({
        provaiders: [],
        newProvaider: [],
        newTypeProvider: [],
        typeProvaiders: [],
        products: [],
        warehouses: [],
        typeProducts: [],
        newProduct: [],
        newWarehouse: [],
        imageProduct: [],
    }),

    actions: {
        async getProviders() {
            try {
                const { data } = await api.get("api/provaider/listActive")

                this.provaiders = data

            } catch (error) {
                console.log(error)
            }
        },

        async getTypeProviders() {
            try {
                const { data } = await api.get("api/typeProvaider/listActive")

                this.typeProvaiders = data

            } catch (error) {
                console.log(error)
            }
        },

        async getWarehouses() {
            try {
                const { data } = await api.get("api/warehouse/listActive")

                this.warehouses = data

            } catch (error) {
                console.log(error)
            }
        },


        async getProducts() {
            try {
                const { data } = await api.get("api/product/list")

                data.forEach(element => {
                    element.dateOfExpiration = date.formatDate(element.dateOfExpiration, 'DD/MM/YYYY')
                });
                console.log(data)
                this.products = data



            } catch (error) {
                console.log(error)
            }
        },

        async getTypeProducts() {
            try {
                const { data } = await api.get("api/typeProduct/listActive")

                this.typeProducts = data

            } catch (error) {
                console.log(error)
            }
        },

        async addTypeProvider(name, description, status) {
            try {
                const { data } = await api.post("api/typeProvaider/create", {
                    name,
                    description,
                    status
                })
                this.typeProvaiders.push(data)

            } catch (error) {
                console.log(error)
            }
        },

        async deleteTypeProvider(id) {
            try {
                const { data } = await api.delete(`api/typeProvaider/delete/${id}`)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },

        async deleteProvaider(id) {
            try {
                const { data } = await api.delete(`api/provaider/delete/${id}`)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },

        async deleteProduct(id) {
            try {
                const { data } = await api.delete(`api/product/delete/${id}`)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },



        editTypeProvaider(id) {
            const data = this.typeProvaiders.find((typeProvaider) => typeProvaider._id === id);
            this.newTypeProvider = data;
        },

        editProvaider(id) {
            const data = this.provaiders.find((provaider) => provaider._id === id);
            this.newProvaider = data;
        },

        editProduct(id) {
            const data = this.products.find((product) => product._id === id);
            this.newProduct = data;
        },

        viewImage(id) {
            const data = this.products.find((product) => product._id === id);
            this.imageProduct = data;
        }







    }
})
