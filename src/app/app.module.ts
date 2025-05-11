import {APP_ID, LOCALE_ID, NgModule} from '@angular/core';
import { HammerModule} from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ExtraOptions, PreloadAllModules, RouterModule } from '@angular/router';

import { AppComponent } from 'app/app.component';
import { appRoutes } from 'app/app.routing';
// import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

import localeRu from '@angular/common/locales/ru';
import { registerLocaleData } from '@angular/common';
import {MatIconModule} from "@angular/material/icon";
import {provideHttpClient, withFetch} from "@angular/common/http";
import { FuseModule } from '../@fuse';
import { appConfig } from './core/config/app.config';
import { FuseConfigModule } from '../@fuse/services/config';
import { SharedModule } from './shared/shared.module';
import { CoreModule } from './core/core.module';
import { LayoutModule } from './layout/layout.module';
import { ServiceWorkerModule } from '@angular/service-worker';
import { FuseLoadingBarModule } from '../@fuse/components/loading-bar';


registerLocaleData(localeRu);

const routerConfig: ExtraOptions = {
    preloadingStrategy       : PreloadAllModules,
    scrollPositionRestoration: 'enabled',
    initialNavigation: "enabledBlocking"
};

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [

        BrowserAnimationsModule,
        RouterModule.forRoot(appRoutes, routerConfig),
        HammerModule,
        FuseModule,
        FuseConfigModule.forRoot(appConfig),
        CoreModule,
        LayoutModule,



        ServiceWorkerModule.register('ngsw-worker.js', {
            enabled: environment.production,
            // Register the ServiceWorker as soon as the app is stable
            // or after 30 seconds (whichever comes first).
            registrationStrategy: 'registerWhenStable:30000'
        }),

        MatIconModule,
        FuseLoadingBarModule,

    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'ru' },
        { provide: APP_ID, useValue: 'serverApp'},
         provideHttpClient(withFetch()),
    ],
    bootstrap   : [
        AppComponent
    ]
})
export class AppModule
{
}
