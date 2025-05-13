import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {ShareModule} from "ngx-sharebuttons";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShareModule,
        NgOptimizedImage,

    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        ShareModule,
        NgOptimizedImage
    ],
    declarations: [


    ]

})
export class SharedModule
{
}
