import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { PageNotFoundComponent } from './shared/components/page-not-found/page-not-found.component';

export const routes: Routes = [
     { path: '', loadChildren: () => import('./public/public.module').then(m => m.PublicModule), canActivate: [authGuard] },
     //{ path: '', redirectTo: 'home', pathMatch: 'full' },
     //{ path: 'home', loadChildren: () => import('./public/public.module').then(m => m.PublicModule), canActivate: [authGuard] },
     { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule), canActivate: [authGuard] },
     { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
     // Wildcard Route for 404 errors (Must be placed last)
     { path: '**', component: PageNotFoundComponent }
];