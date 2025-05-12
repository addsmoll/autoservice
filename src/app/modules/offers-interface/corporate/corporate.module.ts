import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {OffersCorporateComponent} from "./corporate.component";
import {offersCorporate} from "./corporate.routing";
import {
    MatDatepicker,
    MatDatepickerActions,
    MatDatepickerApply,
    MatDatepickerCancel, MatDatepickerInput
} from "@angular/material/datepicker";
import {MatError, MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatTooltip} from "@angular/material/tooltip";
import { NgOptimizedImage } from '@angular/common';


@NgModule({
    declarations: [
        OffersCorporateComponent
    ],
    imports: [
        RouterModule.forChild(offersCorporate),
        MatButtonModule,
        MatIconModule,
        MatDatepicker,
        MatDatepickerActions,
        MatDatepickerApply,
        MatDatepickerCancel,
        MatDatepickerInput,
        MatFormField,
        MatInput,
        MatError,
        MatLabel,
        MatTooltip,
        NgOptimizedImage,

    ],
})
export class OffersCorporateModule
{
}
