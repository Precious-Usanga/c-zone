import { AppRoutes } from '@core/interfaces/app-route.interface';
import { APP_BASE_ROUTES_DEFINITION } from '../app.routes';
import { AdminComponent } from './admin.component';


const ADMIN_BASE = APP_BASE_ROUTES_DEFINITION.ADMIN;

export const ADMIN_ROUTES_DEFINITION = {
  COUNTRIES: `${ADMIN_BASE}/countries`,
};

export const ADMIN_ROUTES: AppRoutes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'countries',
        loadChildren: () => import('./modules/countries/countries.routes').then((m) => m.COUNTRIES_ROUTES),
        data: {
          title: 'Countries',
          toolbar: {
            displayTitle: true
          }
        }
      },
      {
        path: 'continents',
        loadComponent: () => import('./modules/continents/continents.component').then((c) => c.ContinentsComponent),
        data: {
          title: 'Continents',
          toolbar: {
            displayTitle: true
          }
        }
      },
      {
        path: '',
        redirectTo: 'countries',
        pathMatch: 'full'
      }
    ]
  }
];
