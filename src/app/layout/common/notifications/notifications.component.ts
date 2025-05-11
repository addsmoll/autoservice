import {
    AfterViewInit,
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component, DestroyRef, inject,
    OnDestroy,
    OnInit, signal,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import {Overlay, OverlayRef} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {MatButton} from '@angular/material/button';
import {switchMap} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import {Notification} from 'app/layout/common/notifications/notifications.types';
import {NotificationsService} from 'app/layout/common/notifications/notifications.service';
import {EventsService} from "../../../modules/event-interface/events.service";
import {UserService} from "../../../core/user/user.service";
import {Event} from "../../../modules/event-interface/event";
import {User} from "../../../core/user/user.types";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";
import {ActivatedRoute, Router} from "@angular/router";
import {APP_ROUTES} from "../../../app.env";
import {LastActiveAtService} from "../../../core/services/last-active-at.service";

@Component({
    selector: 'notifications',
    templateUrl: './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'notifications',
    standalone: false
})
export class NotificationsComponent implements OnInit, AfterViewInit, OnDestroy
{
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;
    user = signal<User>(null);
    events = signal<Event[]>(null);
    private destroyRef = inject(DestroyRef);
    notificationsChecked: boolean = false;
    markerAnimation: boolean = false;
    notifications: Notification[];
    unreadCount: number = 0;
    private _overlayRef: OverlayRef;

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _notificationsService: NotificationsService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,
        private _userService: UserService,
        private _eventsService: EventsService,
        private _lastActiveAtService: LastActiveAtService,
        private _router: Router
    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this._userService.user$
            .pipe(
                map((user) => {
                    if (user){
                        this._lastActiveAtService.resetTimer()
                    }
                    return this.user.set(user);
                }),
                switchMap(user => this._eventsService.getEventsByUser(this.user())),
                takeUntilDestroyed(this.destroyRef)
                )
            .subscribe();

        // Subscribe to notification changes
        this._notificationsService.notifications$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((notifications: Notification[]) => {
                // Calculate the unread count
                this._calculateUnreadCount();
            });
    }

    ngAfterViewInit(): void {
        this._eventsService.userEvents$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((events: Event[]) => {
                this.events.set(events);
                this.triggerForSingleNotifyEvent();
                this._lastActiveAtService.startTracking()
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Dispose the overlay
        if ( this._overlayRef )
        {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    getCurrentRouteAsArray() {
        const currentUrl = this._router.routerState.snapshot.url;
        const routeArray = currentUrl.split('/') //.filter(Boolean);

        if (routeArray.length > 0) {
            const currentRoute = routeArray[1];
            switch (currentRoute) {
                case APP_ROUTES.HOME:
                    return APP_ROUTES.HOME;
                case APP_ROUTES.PLACES:
                    return APP_ROUTES.PLACES;
                case APP_ROUTES.USERS:
                    return APP_ROUTES.USERS;
                case APP_ROUTES.PLACE_DETAIL:
                    return APP_ROUTES.PLACE_DETAIL;
                default:
                    return null; // Маршрут не соответствует ни одной константе
            }
        }
    }

    getRouteConstant() {
        const currentUrl = this._router.routerState.snapshot.url;
        const routeArray = currentUrl.split('/').filter(Boolean);
        if (routeArray.length > 0) {
            const currentRoute = routeArray[0];
            for (const key of Object.keys(APP_ROUTES)) {
                if (APP_ROUTES[key] === currentRoute) {
                    return key;
                }
            }
        }
        return null; // Маршрут не соответствует ни одной константе
    }

    goToEventByHome() {

    }

    /**
     * Open the notifications panel
     */
    openPanel(): void
    {
        // Return if the notifications panel or its origin is not defined
        if ( !this._notificationsPanel || !this._notificationsOrigin )
        {
            return;
        }

        // Create the overlay if it doesn't exist
        if ( !this._overlayRef )
        {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

    triggerForSingleNotifyEvent() {
        this._notificationsOrigin?._elementRef?.nativeElement?.classList?.add("portal-notification-active");
        this.markerAnimation = true;
        setTimeout(() => {
            this.markerAnimation = false;
            this._notificationsOrigin?._elementRef?.nativeElement?.classList.remove(...["portal-notification-active"]);
        }, 1000);
    }

    /**
     * Close the messages panel
     */
    closePanel(): void
    {
        this._overlayRef.detach();
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): void
    {

    }

    /**
     * Toggle read status of the given notification
     */
    toggleRead(notification: Notification): void
    {
        // Toggle the read status
        notification.read = !notification.read;

        // Update the notification

    }

    /**
     * Delete the given notification
     */
    delete(notification: Notification): void
    {
        // Delete the notification

    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop     : true,
            backdropClass   : 'fuse-backdrop-on-mobile',
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                                  .withLockedPosition(true)
                                  .withPush(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'start',
                                          originY : 'top',
                                          overlayX: 'start',
                                          overlayY: 'bottom'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'bottom',
                                          overlayX: 'end',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'top',
                                          overlayX: 'end',
                                          overlayY: 'bottom'
                                      }
                                  ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    /**
     * Calculate the unread count
     *
     * @private
     */
    private _calculateUnreadCount(): void
    {
        let count = 0;

        if ( this.notifications && this.notifications.length )
        {
            count = this.notifications.filter(notification => !notification.read).length;
        }

        this.unreadCount = count;
    }
}
