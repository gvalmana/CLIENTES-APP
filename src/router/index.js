import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Error404 from '../views/Error404.vue'
import Unauthorized from '../views/Unauthorized'
Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    component: Home,
    meta: {
      requireAuth: true,
      roles:['user']
    },
    children: [
      {
        path:'/',
        name: 'Index',
        component: () => import('@/components/Index.vue'),
        meta: {
          requireAuth: true,
          roles:['user']
        },        
      },
      {
        path: 'create',
        name: 'Create',
        component: () => import('@/components/Create.vue'),
        props: true,
        meta: {
          requireAuth: true,
          roles:['user']
        },        
      },
      {
        path: 'update',
        name: 'Update',
        component: () => import('@/components/Update.vue'),
        props: true,
        meta: {
          requireAuth: true,
          roles:['user']
        },        
      },                   
    ]         
  },
  { path: '*', name:'Error404', component: Error404}, // Not found
  { path: '/unauthorized/', name:'Unauthorized', component: Unauthorized}, // Unathorized
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next)=>{
  if(to.meta.requireAuth){
    if(Vue.prototype.$keycloak.authenticated){
      to.meta.roles.forEach(element => { 
        if(Vue.prototype.$keycloak.tokenParsed.realm_access.roles.includes(element)){
          next();
        } else{
          router.push('Unauthorized')
        }        
      });
    } else{
      router.push('Home')
    }
  }else{
    next()
  }
});

export default router
