import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FooterComponent } from './footer.component';
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {RouterModule} from "@angular/router";
import {TranslateModule} from "@ngx-translate/core";
import {MatMenuModule} from "@angular/material/menu";
import {SettingsModule} from "../../layout/common/settings/settings.module";
import {LanguagesModule} from "../../layout/common/languages/languages.module";



@NgModule({
    declarations: [
        FooterComponent
    ],
    exports: [
        FooterComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        MatIconModule,
        MatButtonModule,
        TranslateModule,
        NgOptimizedImage,
        MatMenuModule,
        SettingsModule,
        LanguagesModule
    ]
})
export class FooterModule { }
