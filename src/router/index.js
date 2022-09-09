import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Register from "../views/Register.vue";
import Create from "../views/Create.vue";
import ViewWorkout from "../views/ViewWorkout.vue";
import {supabase} from "../supabase/init";
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta:{
      title:"Home",
      Auth:false,
    }
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    meta:{
      title:"Login",
      Auth:false,
    }
  },
  {
    path: "/create",
    name: "Create",
    component: Create,
    meta:{
      title:"Create",
      Auth:false,
    }
  },
{
  path: "/view-workout/:workoutID",
  name: "View-Workout",
  component: ViewWorkout,
  meta:{
    title:"View Workout",
    Auth:false,
  }
},

  {
    path: "/register",
    name: "Register",
    component: Register,
    meta:{
      title:"Register",
      Auth:false,
    }
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

// Change document titles

router.beforeEach((to,from,next)=>{
  document.title=`${to.meta.title}| Giri Active Traker`;
  next();
});

// Route guard for auth routes

router.beforeEach((to,from,next)=>
{
  const user=supabase.auth.user();
if(to.matched.some((res)=>res.meta.auth)){ 
  if(user){
    next();
    return
  }
  next({name:"Login"})
  return
}
next(); 
})

export default router;
