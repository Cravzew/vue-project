import { createRouter, createWebHistory } from "vue-router";
import Main from "@/pages/Main";
import PostPage from "@/pages/PostPage";
import PostPageComposition from "@/pages/PostPageComposition";
import PostPageVuex from "@/pages/PostPageVuex";
import About from "@/pages/About";
import PostIdPage from "@/pages/PostIdPage";

const routes = [
  {
    path: "/",
    component: Main,
  },
  {
    path: "/page",
    component: PostPage,
  },
  {
    path: "/composition",
    component: PostPageComposition,
  },
  {
    path: "/store",
    component: PostPageVuex,
  },
  {
    path: "/about",
    component: About,
  },
  {
    path: "/page/:id",
    component: PostIdPage,
  },
];

const router = createRouter({
  routes,
  history: createWebHistory(process.env.BASE_URL),
});

export default router;
