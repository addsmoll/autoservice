import { Route } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const appRoutes: Route[] = [


    {
        path: '',
        component: LayoutComponent,
        data: {
            layout: 'empty'
        },
        children: [

            {path: '', loadChildren: () => import('app/modules/offers-interface/corporate/corporate.module').then(m => m.OffersCorporateModule)},

        ]
    },








];
