import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import User from '@/components/Login'
import Destination from '@/components/Destination'
import Trip from '@/components/Trip'
import MyTrips from '@/components/MyTrips'
import MyDestination from '@/components/UserDestination'
import ToDos from '@/components/ToDos'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/login',
      name: 'User',
      component: User
    },
    {
      path: '/destination',
      name: 'Destination',
      component: Destination
    },
    {
      path: '/trip/:id',
      name: 'Trip',
      component: Trip
    },
    {
      path: '/mytrips',
      name: 'myTrips',
      component: MyTrips
    },
    {
      path: '/mydestination/:id',
      name: 'myDestination',
      component: MyDestination
    },
    {
      path: '/todos',
      name: 'ToDos',
      component: ToDos
    }
  ]
})
