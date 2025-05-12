import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import { NotificationsComponent } from 'app/layout/common/notifications/notifications.component';
import { SharedModule } from 'app/shared/shared.module';
import { EventNotificationsComponent } from "./event-notifications.component";
import { EventInterfaceModule } from "../../../modules/event-interface/event-interface.module";
import { EventNotificationsItemComponent } from '../../../modules/event-interface/event-notifications-item/event-notifications-item.component';
import {FuseDrawerModule} from "../../../../@fuse/components/drawer";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatDividerModule} from "@angular/material/divider";
import {TranslateModule} from "@ngx-translate/core";
import {MemberInterfaceModule} from "../../../modules/member-interface/member-interface.module";
import {FuseCardModule} from "../../../../@fuse/components/card";
import {PipesModule} from "../../../core/pipes/pipes.module";

@NgModule({
    declarations: [
        NotificationsComponent,
        EventNotificationsItemComponent
    ],
    imports: [
        RouterModule,
        OverlayModule,
        PortalModule,
        MatButtonModule,
        MatIconModule,
        MatTooltipModule,
        MatSidenavModule,
        MatDividerModule,
        SharedModule,
        FuseDrawerModule,
        EventInterfaceModule,
        TranslateModule,
        MemberInterfaceModule,
        FuseCardModule,
        PipesModule,
    ],
    exports: [
        NotificationsComponent,
    ]
})
export class NotificationsModule
{
}
