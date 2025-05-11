import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { LogoComponent } from './logo.component';
import {RouterModule} from "@angular/router";



@NgModule({
    declarations: [
        LogoComponent
    ],
    exports: [
        LogoComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        NgOptimizedImage
    ]
})
export class LogoModule { }
