import { defineStore } from 'pinia'
import { api } from 'boot/axios'

export const useProductStore = defineStore('ProductStore', {

    state: () => ({
        provaiders: [],
        newProvaider: [],
        typeProviders: [],
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
                const { data } = await api.get("api/typeProvider/listActive")

                this.typeProviders = data

            } catch (error) {
                console.log(error)
            }
        },

        addProvaider(provaider) {
            this.provaiders.push(provaider)
            this.newProvaider = provaider
        },
    }
})
