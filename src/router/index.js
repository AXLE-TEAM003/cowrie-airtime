import Vue from "vue";
import VueRouter from "vue-router";
import HomeRoutes from "../modules/airtime/router";

Vue.use(VueRouter);

const routes = [];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: routes.concat(HomeRoutes),
});

export default router;
