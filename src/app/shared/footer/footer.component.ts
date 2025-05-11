import {Component, OnDestroy, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {UserService} from "../../core/user/user.service";
import {takeUntil} from "rxjs/operators";
import {FuseMediaWatcherService} from "../../../@fuse/services/media-watcher";
import {Subject} from "rxjs";
import {APP_VERSION} from "../../app.version";

@Component({
    selector: 'app-footer',
    templateUrl: './footer.component.html',
    styleUrls: ['./footer.component.scss'],
    standalone: false
})
export class FooterComponent implements OnInit,  OnDestroy {

    public version = APP_VERSION;

    public env;
    SWIPE_ACTION = { LEFT: 'swipeleft', RIGHT: 'swiperight' };
    public isMobile: boolean;
    private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
      private _router: Router,
      private _userService: UserService,
      private _fuseMediaWatcherService: FuseMediaWatcherService,

  ) { }

  ngOnInit(): void {

      // Subscribe to media changes
      this._fuseMediaWatcherService.onMediaChange$
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe(({matchingAliases}) => {
              // Check if the screen is small
              // this.isMobile = !matchingAliases.includes('sm');
          });

  }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }


    /**
     * Go to user settings
     */
    gotoSettings(): void {
        this._router.navigate(['settings']);
    }

    /**
     * Getter for current year
     */
    get currentYear(): number
    {
        return new Date().getFullYear();
    }


    swipe(action: String = this.SWIPE_ACTION.RIGHT) {
        if (action === this.SWIPE_ACTION.RIGHT) {
            // console.log('swipe-right', action);

        }

        if (action === this.SWIPE_ACTION.LEFT) {
            // console.log('swipe-left', action);
        }
    }


}
