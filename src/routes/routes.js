import Home from "@/views/Home.vue";
import Login from "@/views/Login.vue";
import Signup from "@/views/Signup.vue";
import ForgotPassword from "@/views/ForgotPassword.vue";
import {createRouter, createWebHistory} from "vue-router";
import About from "@/views/About.vue";
import MyEvents from "@/views/MyEvents.vue";
import AppLayout from "@/views/layouts/AppLayout.vue";
import PastBookings from "@/views/PastBookings.vue";
import UserInfo from "@/views/UserInfo.vue";
import Participants from "@/views/Participants.vue";
import ResendEmail from "@/views/ResendEmail.vue";



const routes = [
    {
        path: '/',
        component: AppLayout,
        redirect: '/home',
        meta: {requiresAuth: true},
        children: [
            {
                path: '/home',
                name: 'Home',
                component: Home,
            },
            {
                path: '/about',
                name: "About",
                component: About,
            },
            {
                path: '/myEvents',
                name: "Events",
                component: MyEvents,
            },
            {
                path: '/pastBookings',
                name: "PastBookings",
                component: PastBookings,
            },
            {
                path: '/user/:id',
                name: "User",
                component: UserInfo
            },
            {
                path: '/events/:id/participants',
                name: "Participants",
                component: Participants
            }
        ]
    },
    {
        path: '/login',
        name: "Login",
        component: Login
    },
    {
        path: '/signup',
        name: "Signup",
        component: Signup
    },
    {
        path: '/forgotPassword',
        name: "ForgotPassword",
        component: ForgotPassword
    },
    {
        path: '/resendEmail',
        name: "ResendEmail",
        component: ResendEmail
    },
]

export default createRouter({
    history: createWebHistory(),
    routes,
})