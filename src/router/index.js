import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      requireAuth: true,
      roles:['user']
    },     
  },
  {
    path: '/clientes',
    meta: {
      requireAuth: true,
      roles:['user']
    },    
    component: () => import('@/components/catalogos/Clientes.vue'),
    children: [
      {
        path:'/',
        name: 'indexcliente',
        component: () => import('@/components/catalogos/clientes/Index.vue'),
      },
      {
        path: 'create',
        name: 'createcliente',
        component: () => import('@/components/Create.vue'),
        props: true,
      },
      {
        path: 'update',
        name: 'updatecliente',
        component: () => import('@/components/Update.vue'),
        props: true
      },
      {
        path: 'view',
        name: 'viewcliente',
        component: () => import('@/components/catalogos/clientes/_detalles.vue'),
        props: true
      },                    
    ]
  },
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
