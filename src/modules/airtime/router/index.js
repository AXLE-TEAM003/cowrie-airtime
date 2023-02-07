const Home = () => import("../views/indexView.vue");

const routes = [
  {
    path: "/",
    name: "home",
    component: Home,
    meta: {
      layout: "AppHomeLayout",
    },
  },
];

export default routes;
