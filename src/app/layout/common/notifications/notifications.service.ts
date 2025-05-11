import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, ReplaySubject } from 'rxjs';
import { Notification } from 'app/layout/common/notifications/notifications.types';
import {map, switchMap, take} from 'rxjs/operators';
import {UserService} from "../../../core/user/user.service";
import {IUserOrder} from "../../../core/user/user.types";
import {User} from "../../../core/user/user.model";

@Injectable({
    providedIn: 'root'
})
export class NotificationsService
{
    private _notifications: ReplaySubject<IUserOrder[] | Notification[]> = new ReplaySubject<IUserOrder[] | Notification[]>(1);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _userService: UserService,

    )
    {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for notifications
     */
    get notifications$(): Observable<IUserOrder[] | Notification[]>
    {
        return this._notifications.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get all notifications
     */
    getAll(): Observable<any>
    {
      return this._userService.user$.pipe(
          take(1),
          map((user) => {
              // Update the notifications with the new notification
              this._notifications.next(user.events);

              // Return the new notification from observable
              return user.events;
          })
        );
    }

    changeUserEvents$(): Observable<User> {
        return this._userService.user$.pipe(
            take(1),
            map(user => {
                this._notifications.next(user?.events);
                return user
            })
        )
    }

    changeUserEvents(): any {
        return this._userService.user$.pipe(
            take(1),
            map(user => {
                console.log('userChange', user)
                this._notifications.next(user?.events);
                return new User(user)
            })
        ).subscribe()
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): Observable<boolean>
    {
        return this.notifications$.pipe(
            take(1),
            switchMap(notifications => this._httpClient.get<boolean>('api/common/notifications/mark-all-as-read').pipe(
                map((isUpdated: boolean) => {

                    // Go through all notifications and set them as read
                    notifications.forEach((notification, index) => {
                        // notifications[index].read = true;
                    });

                    // Update the notifications
                    this._notifications.next(notifications);

                    // Return the updated status
                    return isUpdated;
                })
            ))
        );
    }
}
