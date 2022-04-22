import Vue from 'vue'
import VueRouter from 'vue-router'
import FreeViews from '../views/FreeViews/FreeViews.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: FreeViews,
    children: [
      {
        path: '/login',
        name: 'Login',
        component: () => import('../views/FreeViews/Login.vue')
      },
      {
        path: '',
        name: 'Register',
        component: () => import('../views/FreeViews/Register.vue')
      }
    ]
  },
  {
    path: '/client',
    component: () => import('../views/client/Client.vue'),
    children: [
      {
        path: '',
        name: 'Home-client',
        component: () => import('../views/client/Home.vue')
      },
      {
        path: 'appliance',
        name: 'Appliance',
        component: () => import('../views/client/Appliances.vue')
      },
      {
        path: 'plan',
        name: 'Plan',
        component: () => import('../views/client/Plan.vue')
      },
      {
        path: 'reservation',
        name: 'reservation',
        component: () => import('../views/client/Reservation.vue')
      },
      {
        path: 'notifications',
        name: 'Notifications-client',
        component: () => import('../views/client/Notifications.vue')
      },
      {
        path: 'profile',
        name: 'Profile-client',
        component: () => import('../views/client/Profile.vue')
      }
    ]
  },
  {
    path: '/technician',
    component: () => import('../views/technician/Technician.vue'),
    children: [
      {
        path: '',
        name: 'Route',
        component: () => import('../views/technician/Route.vue')
      },
      {
        path: 'reports',
        name: 'Reports-technician',
        component: () => import('../views/technician/Reports')
      },
      {
        path: 'Requests',
        name: 'Requests-technician',
        component: () => import('../views/technician/Requests')
      },
      {
        path: 'notifications',
        name: 'Notifications-technician',
        component: () => import('../views/technician/Notifications')
      },
      {
        path: 'profile',
        name: 'Profile-technician',
        component: () => import('../views/technician/Profile.vue')
      }
    ]
  },
  {
    path: '/administrator',
    component: () => import('../views/administrator/Administrator.vue'),
    children: [
      {
        path: '',
        name: 'Business',
        component: () => import('../views/administrator/Business.vue')
      },
      {
        path: 'spare-parts-requests',
        name: 'Spare-parts-requests',
        component: () => import('../views/administrator/Spare-parts-requests.vue')
      },
      {
        path: 'technicians-statics',
        name: 'Technicians-statics',
        component: () => import('../views/administrator/Technicians-statics.vue')
      },
      {
        path: 'announcements',
        name: 'Announcements',
        component: () => import('../views/administrator/Announcements.vue')
      },
      {
        path: 'technicians',
        name: 'Technicians',
        component: () => import('../views/administrator/Technicians.vue')
      },
      {
        path: 'reports',
        name: 'Reports',
        component: () => import('../views/administrator/Reports.vue')
      },
      {
        path: 'products',
        name: 'Products',
        component: () => import('../views/administrator/Products.vue'),
      },
      {
        path: 'products/:productId/models',
        name: 'Models',
        component: () => import('../components/administrator/Appliance-models.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
