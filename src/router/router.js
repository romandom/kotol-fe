import { createRouter, createWebHistory } from 'vue-router'
import LoginView from "../views/LoginView";
import RegisterView from "@/views/RegisterView";
import RecipeView from "@/views/RecipesView";
import AddRecipeView from "@/views/AddRecipeView";
import RecipeDetailView from "@/views/RecipeDetailView";
import SettingsView from "@/views/SettingsView";
import StatusView from "@/views/StatusView";

const routes = [
    {
        path: '/',
        name: 'Login',
        component: LoginView
    },
    {
        path: '/register',
        name: 'Register',
        component: RegisterView
    },
    {
        path: '/pridat-recept',
        name: 'AddRecipe',
        component: AddRecipeView,
        meta: { requiresAuth: true }
    },
    {
        path: '/recepty',
        name: 'Recipe',
        component: RecipeView,
        meta: { requiresAuth: true }
    },
    {
        path: "/recept",
        name: "detail-receptu",
        component: RecipeDetailView,
        props: true,
        query: {
            id: {
                type: Number,
                required: true
            },
            author: {
                type: String,
                required: true
            }
        },
        meta: { requiresAuth: true },
    },
    {
        path: '/nastavenia',
        name: 'Settings',
        component: SettingsView,
        meta: {requiresAuth: true}
    },
    {
        path: '/stav-kotla',
        name: 'Status',
        component: StatusView,
        meta: {requiresAuth: true}
    }
]
const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !isAuthenticated()) {
        // If the user is not authenticated and the route requires authentication,
        // redirect to the login page
        next('/')
    } else {
        // Otherwise, allow access to the route
        next()
    }
})

function isAuthenticated() {
    // Check if the user is authenticated
    return localStorage.getItem('authToken') !== null
}

export default router