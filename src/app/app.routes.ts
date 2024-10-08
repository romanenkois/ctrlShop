import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'home',
        loadComponent: () => import('./pages/home/home.component')
    },
    {
        path: 'clothes',
        loadComponent: () => import('./pages/clothes/clothes.component')
    },
    {
        path: 'product/:id',
        loadComponent: () => import('./pages/product/product.component')
    },
    {
        path: 'cart',
        loadComponent: () => import('./pages/cart/cart.component')
    },
    {
        path: 'favorites',
        loadComponent: () => import('./pages/favorites/favorites.component')
    },
    {
        path: 'user',
        loadComponent: () => import('./pages/user/user.component')
    },
    {
        path: 'login',
        loadComponent: () => import('./pages/login/login.component')
    },
    {
        path: 'about-us',
        loadComponent: () => import('./pages/about-us/about-us.component')
    },
    {
        path: 'return-policy',
        loadComponent: () => import('./pages/return-policy/return-policy.component')
    },
    {
        path: 'contacts',
        loadComponent: () => import('./pages/contacts/contacts.component')
    },
    {
        path: 'privacy-policy',
        loadComponent: () => import('./pages/privacy-policy/privacy-policy.component')
    },
    {
        path: 'error404',
        loadComponent: () => import('./pages/error404/error404.component')
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: '**',
        redirectTo: 'error404'
    }    
];
