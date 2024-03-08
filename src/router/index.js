import Vue from 'vue'
import VueRouter from 'vue-router'
import Layout from '../layout/Index'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
    //公共布局下的路由
    {
        path: '/',
        component: Layout,
        children: [
            {
                path: '',
                redirect: 'home'
            },
            {
                path: 'home',
                component: Home
            },
            {
                path: 'gifts',
                component: () => import('../views/Gifts')
            },
            {
                path: 'rules',
                component: () => import('../views/Rules')
            },
            {
                path: 'rank',
                component: () => import('../views/Rank')
            },
            {
                path: 'me',
                component: () => import('../views/Me')
            },
        ]
    },
    {
        path: '/article/details/:id',
        name: 'ArticleDetails',
        component: () => import('../views/ArticleDetails')
    },
    {
        path: '/article/gift-vote/:id',
        name: 'GiftVote',
        component: () => import('../views/GiftVote')
    },
    {
        path: '/upload',
        name: 'Upload',
        component: () => import('../views/Upload')
    },
    {
        path: '/search',
        name: 'Search',
        component: () => import('../views/Search')
    },
    {
        path: '/login',
        name: 'Login',
        component: () => import('../views/Login')
    },
    {
        path: '/wx-login',
        name: 'WxLogin',
        component: () => import('../views/WxLogin')
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    if (to.name !== 'WxLogin' && !localStorage.getItem("uid")) next({name: 'WxLogin'})
    else next()
})

export default router
