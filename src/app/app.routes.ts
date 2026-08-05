import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
     { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule), canActivate: [authGuard] },
     { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard] },
     { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }
];