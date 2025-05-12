import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {FavoritesComponent} from "./favorites.component";
import {PlaceSelectorModule} from "../../../modules/place-interface/place-selector/place-selector.module";
import {TranslateModule} from "@ngx-translate/core";
import {PipesModule} from "../../../core/pipes/pipes.module";

@NgModule({
    declarations: [
        FavoritesComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule,
        OverlayModule,
        PortalModule,
        MatButtonModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatSlideToggleModule,
        MatTooltipModule,
        PlaceSelectorModule,
        TranslateModule,
        PipesModule
    ],
    exports     : [
        FavoritesComponent
    ]
})
export class FavoritesModule
{
}
