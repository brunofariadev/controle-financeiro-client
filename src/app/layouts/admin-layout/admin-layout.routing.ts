import { Routes } from '@angular/router';

export const AdminLayoutRoutes: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../../pages/dashboard/dashboard.module').then(m => m.DashboardModule)
    },
    {
        path: 'clientes',
        loadChildren: () => import('../../pages/clientes/clientes.module').then(m => m.ClientesModule)
    },
    {
        path: 'sessoes',
        loadChildren: () => import('../../pages/sessoes/sessoes.module').then(m => m.SessoesModule)
    },
    {
        path: 'receitas',
        loadChildren: () => import('../../pages/receitas/receitas.module').then(m => m.ReceitasModule)
    },
];