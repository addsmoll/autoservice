import { Routes } from '@angular/router';
import { LandingHomeComponent } from 'app/modules/landing/home/home.component';

export default [
    {
        path: '',
        component: LandingHomeComponent,
    },
    {
        path: ':slug',
        component: LandingHomeComponent,
    },
] as Routes;
