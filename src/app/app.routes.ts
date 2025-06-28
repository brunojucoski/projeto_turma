
import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then((m) => m.HomePage),
  },

  {
    path: 'professor',
    loadComponent: () => import('./componentes/professor/professor.component'). then((m) => m.ProfessorComponent)
  },

  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
