import { defineStore } from 'pinia'
import { api } from 'boot/axios'
import { date } from "Quasar"
import { watch } from 'vue'

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
        entries: [],
        exits: [],
        inventory: [],
        newEntry: [],
        typeEntry: [],
        typeExit: [],
        categories: [],
        subcategories: [],
        detail: [],
        units: [],
    }),

    actions: {



        //* list all providers     
        async getProviders() {
            try {
                const { data } = await api.get("api/provaider/listActive")

                this.provaiders = data

            } catch (error) {
                console.log(error)
            }
        },
        //* list all type providers

        async getTypeProviders() {
            try {
                const { data } = await api.get("api/typeProvaider/listActive")

                this.typeProvaiders = data

            } catch (error) {
                console.log(error)
            }
        },
        //* list all warehouses

        async getWarehouses() {
            try {
                const { data } = await api.get("api/warehouse/listActive")

                this.warehouses = data

            } catch (error) {
                console.log(error)
            }
        },

        //* list all Products

        async getProducts() {
            try {
                const { data } = await api.get("api/product/list")

                /*data.forEach(element => {
                    element.dateOfExpiration = date.formatDate(element.dateOfExpiration)
                });*/

                console.log(data)
                this.products = data

            } catch (error) {
                console.log(error)
            }
        },

        //* list all type products

        async getTypeProducts() {
            try {
                const { data } = await api.get("api/typeProduct/listActive")

                this.typeProducts = data

            } catch (error) {
                console.log(error)
            }
        },

        //* list all entries        

        async getEntries() {
            try {
                const { data } = await api.get("api/entries/list")
                console.log(data)
                this.entries = data
            } catch (error) {
                console.log(error)
            }
        },

        //* list all exits

        async getExits() {
            try {
                const { data } = await api.get("api/exits/getExits")

                console.log(data)
                this.exits = data

            } catch (error) {
                console.log(error)
            }
        },

        async getInventory() {
            try {
                const { data } = await api.get("api/exits/getInventory")

                console.log(data)
                this.inventory = data

            } catch (error) {
                console.log(error)
            }
        },

        //* list all categories

        async getCategories() {
            try {
                const { data } = await api.get("api/category/listCategory")
                console.log(data)
                this.categories = data
            } catch (error) {
                console.log(error)
            }
        },
        //* list all subcategories

        async getSubcategories() {
            try {
                const { data } = await api.get("api/category/listSubcategory")
                console.log(data)
                this.subcategories = data
            } catch (error) {
                console.log(error)
            }
        },
        //* list all warehouses detail

        async getDetail(id) {
            try {
                const { data } = await api.get(`api/product/listbywarehouse/${id}`)
                console.log(data)
                this.detail = data
            } catch (error) {
                console.log(error)
            }
        },

        //* list all units        
        async getUnit() {
            try {
                const { data } = await api.get("api/unit/listUnit")
                console.log(data)
                this.units = data
            } catch (error) {
                console.log(error)
            }
        },

        async getTypeEntry() {
            try {
                const { data } = await api.get("api/entries/type")
                console.log(data)
                this.typeEntry = data
            } catch (error) {
                console.log(error)
            }
        },

        async getTypeExit() {
            try {
                const { data } = await api.get("api/exits/getTypeExit")
                console.log(data)
                this.typeExit = data
            } catch (error) {
                console.log(error)
            }
        },



        //? create new a type provider

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

        //? create new a product

        async addTypeProduct(name, status) {
            try {
                const { data } = await api.post("api/typeProduct/create", {
                    name,
                    status
                })
                this.typeProducts.push(data)

            } catch (error) {
                console.log(error)
            }
        },

        //? create new a warehouse

        async addWarehouse(name, address, status) {
            try {
                const { data } = await api.post("api/warehouse/create", {
                    name,
                    address,
                    status
                })
                this.warehouses.push(data)

            } catch (error) {
                console.log(error)
            }
        },
        //? create new a category

        async addCategory(name, abreviation, status) {
            try {
                const { data } = await api.post("api/category/createSubcategory", {
                    name,
                    abreviation,
                    status
                })
                this.subcategories.push(data)

            } catch (error) {
                console.log(error)
            }
        },

        //? create new family or subcategory
        async addFamily(name, description, abreviation, subCategory, status) {
            try {
                const { data } = await api.post("api/category/createCategory", {
                    name,
                    description,
                    abreviation,
                    subCategory,
                    status
                })
                this.categories.push(data)


            } catch (error) {
                console.log(error)
            }
        },

        async addUnit(name, abreviation) {
            try {
                const { data } = await api.post("api/unit/createUnit", {
                    name,
                    abreviation
                })
                this.units.push(data)

            } catch (error) {
                console.log(error)
            }
        },

        async addTypeEntry(name, description, status) {
            try {
                const { data } = await api.post("api/entries/type/create", {
                    name,
                    description,
                    status
                })
                this.typeEntry.push(data)

            } catch (error) {
                console.log(error)
            }
        },


        //! delete a type provider
        async deleteTypeProvider(id) {
            try {
                const { data } = await api.delete(`api/typeProvaider/delete/${id}`)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },

        //! delete a provaider
        async deleteProvaider(id) {
            try {
                const { data } = await api.delete(`api/provaider/delete/${id}`)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        //! delete a product
        async deleteProduct(id) {
            try {
                const { data } = await api.delete(`api/product/delete/${id}`)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },
        //! delete a warehouse
        async deleteWarehouse(id) {
            try {
                const { data } = await api.delete(`api/warehouse/delete/${id}`)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },

        async deleteEntry(id) {
            try {
                const { data } = await api.delete(`api/entries/delete/${id}`)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },

        async deleteExit(id) {
            try {
                const { data } = await api.delete(`api/exits/deleteExits/${id}`)
                console.log(data)
            } catch (error) {
                console.log(error)
            }
        },


        //+ this function cath the id of the type provider and send to variable newTypeProvider in the store

        editTypeProvaider(id) {
            const data = this.typeProvaiders.find((typeProvaider) => typeProvaider._id === id);
            this.newTypeProvider = data;
        },
        //+ this function cath the id of the provaider and send to variable newProvaider in the store
        editProvaider(id) {
            const data = this.provaiders.find((provaider) => provaider._id === id);
            this.newProvaider = data;
        },
        //+ this function cath the id of the product and send to variable newProduct in the store
        editProduct(id) {
            const data = this.products.find((product) => product._id === id);

            this.newProduct = data;
        },
        //+ this function cath the id of the product then send to variable imageProduct in the store
        viewImage(id) {
            const data = this.products.find((product) => product._id === id);
            this.imageProduct = data;
        },

        viewProduct(id) {
            const data = this.entries.find((entry) => entry._id === id);
            this.newEntry = data;
            console.log(data)
        },


        /*detailProduct(id) {
            const data = this.products.find((product) => product._id === id);
            this.detail = data;
        },*/







    }
})
