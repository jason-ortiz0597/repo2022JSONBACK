<template>
  <q-layout container style="height: 100vh" class="shadow-2 rounded-borders">
    <q-header elevated class="bg-blue-grey-3">
      <q-toolbar class="justify-between">
        <div class="row items-center">
          <div>
            <q-btn glossy @click="drawer = !drawer" round dense icon="menu" color="blue-grey-9" class="q-mr-sm" />
          </div>
          <q-btn round to="/admin/">
            <q-avatar size="50px">
              <img src="../assets/image/logo-sii-pi-verde.svg" style="height: 6vh" class="q-my-xs" />
            </q-avatar>
          </q-btn>
          <!----   <img src="../assets/image/logo-sii-pi-verde.svg" style="height: 6vh" class="q-my-xs" /> ---->
          <!----   <q-avatar size="50px">
            <img src="../assets/image/logo-sii-pi-verde.svg" style="height: 6vh" class="q-my-xs" /> -->
        </div>
        <div class="row">
          <div v-if="!authStore.loggedIn" class="q-gutter-sm">
            <q-fab padding="xs" icon="manage_accounts" v-model="fab1" vertical-actions-align="right" color="blue-grey-9"
              glossy direction="down">
              <q-fab-action square color="blue-grey-8" icon="login" label="Ingresar" label-position="left"
                to="/signin" />
              <q-fab-action square color="blue-grey-8" to="signup" icon="assignment" label="Registrarme"
                label-position="left" />
            </q-fab>
          </div>

          <div v-else class="q-gutter-sm">
            <q-fab padding="xs" icon="manage_accounts" v-model="fab2" vertical-actions-align="right" color="blue-grey-9"
              glossy :label="authStore.loggedIn.username" direction="down">
              <q-fab-action square color="blue-grey-8" @click="onClick" icon="manage_accounts" label="Mi Perfil"
                label-position="left" to="profile" />
              <q-fab-action square color="blue-grey-8" @click="logout" icon="logout" label="Salir"
                label-position="left" />
            </q-fab>
          </div>
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer v-model="drawer" show-if-above :width="250" :breakpoint="500" bordered class="bg-grey-3">
      <q-scroll-area class="fit">
        <q-list>
          <template v-for="(menuItem, index) in menuList" :key="index">
            <q-item exact clickable :to="menuItem.to" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>
            <q-separator :key="'sep' + index" v-if="menuItem.separator" />
          </template>
        </q-list>
      </q-scroll-area>
    </q-drawer>

    <q-page-container>
      <q-page>
        <router-view />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useQuasar } from "quasar";
import { useRouter } from "vue-router";
import { useAuthStore } from "stores/auth-store";

const menuList = [
  {
    icon: "cottage",
    label: "Home",
    separator: true,
    to: "/admin",
  },
  {
    icon: "group_add",
    label: "Usuarios",
    separator: true,
    to: "/admin/users",
  },
  {
    icon: "airport_shuttle",
    label: "Proveedores",
    separator: true,
    to: "/admin/provaiders",
  },
  {
    icon: "local_cafe",
    label: "Productos",
    separator: true,
    to: "/admin/products",
  },
  {
    icon: "fa-solid fa-truck-ramp-box",
    label: "Movimiento de Productos",
    separator: true,
    to: "/admin/entries",
  },
  /*{
    icon: "first_page",
    label: "Salidas de productos",
    separator: true,
    to: "/admin/outputs",
  },
  {
    icon: "receipt_long",
    label: "Inventario",
    separator: true,
    to: "/admin/inventory",
  }*/
  /*{
    icon: "receipt_long",
    label: "Orden de Compra",
    separator: true,
    to: "/admin/inventory",
  }*/
];
export default defineComponent({
  setup() {
    const authStore = useAuthStore();
    const $q = useQuasar();
    const router = useRouter();
    const fab1 = ref(false);
    return {
      drawer: ref(false),
      fab1,
      menuList,
      authStore,

      logout() {
        $q.localStorage.remove("loggedIn");
        authStore.logout();
        router.push("/signin");
      },
    };
  },
});
</script>
