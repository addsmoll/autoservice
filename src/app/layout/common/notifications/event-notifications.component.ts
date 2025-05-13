import {
    AfterViewInit, ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    OnDestroy,
    OnInit,
    Renderer2, ViewChild,
    ViewContainerRef, ViewEncapsulation
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {UntypedFormBuilder} from "@angular/forms";
import {Overlay} from "@angular/cdk/overlay";
import {UserService} from "../../../core/user/user.service";
import {FuseConfirmationService} from "../../../../@fuse/services/confirmation";
import {NotificationsService} from "./notifications.service";
import {EventDetailsComponent} from "../../../modules/event-interface/event-details/event-details.component";
import {EventsService} from "../../../modules/event-interface/events.service";
import {PlacesService} from "../../../modules/place-interface/places.service";
import {MetaService} from "../../../core/meta/meta.service";
import {MatDialog} from "@angular/material/dialog";
import {PaymentService} from "../../../modules/payment-interface/payment.service";
import {Meta, Title} from "@angular/platform-browser";
import {EventInterfaceModule} from "../../../modules/event-interface/event-interface.module";

@Component({
    selector: 'app-event-notifications',
    templateUrl: './event-notifications.component.html',
    styles: [
        `
            app-event-notifications {
                position: static;
                display: block;
                flex: none;
                width: auto;
            }

        `
    ],
    encapsulation: ViewEncapsulation.None,
    host: { ngSkipHydration: 'true' },
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [EventInterfaceModule]
})
export class EventNotificationsComponent extends EventDetailsComponent  implements OnInit, AfterViewInit, OnDestroy{
    @ViewChild('eventDrawer', {static: true}) eventDrawer;

    drawerMode: 'over' | 'side' = 'over';
    drawerOpened: boolean = false;
    isOpened: boolean;

    constructor(
      private eventService: EventsService

  ) {
      super(

      )
  }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
     ngOnInit(): void
    {
     super.ngOnInit();

        // Open the drawer
        this.eventService.notificationDriver.subscribe(() => {
            this.eventDrawer.toggle();
        })
    }

    ngAfterViewInit(): void {
        super.ngAfterViewInit();
    }

    ngOnDestroy(): void {
        super.ngOnDestroy();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    close(): void {
        if (this.isOpened) {
            this.eventDrawer.toggle();
        }
    }

}
