import {
    ChangeDetectionStrategy,
    Component, DestroyRef, inject, Input,
    OnDestroy,
    OnInit, signal,
    TemplateRef,
    ViewChild,
    ViewContainerRef,
    ViewEncapsulation
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Favorite } from 'app/layout/common/favorites/favorites.types';
import {UserService} from "../../../core/user/user.service";
import {User} from "../../../core/user/user.types";
import {Router} from "@angular/router";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
    selector: 'favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.scss'],
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs: 'favorites',
    standalone: false
})
export class FavoritesComponent implements OnInit, OnDestroy
{
    @ViewChild('favoritesOrigin') private _favoritesOrigin: MatButton;
    @ViewChild('favoritesPanel') private _favoritesPanel: TemplateRef<any>;
    @Input() showArrow: boolean;
    user: User;
    mode: 'view' | 'modify' | 'add' | 'edit' = 'view';
    favoriteForm: FormGroup;
    favorites = signal<Favorite[]>(null);
    private destroyRef = inject(DestroyRef);
    public toggle: boolean;
    private _overlayRef: OverlayRef;

    /**
     * Constructor
     */
    constructor(
        private _router: Router,
        private _formBuilder: FormBuilder,
        private _userService: UserService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
    )
    { }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // Initialize the form
        this.favoriteForm = this._formBuilder.group({
            id         : [null],
            pid         : [null],
            label      : ['', Validators.required],
            description: [''],
            link       : ['', Validators.required],
            getInvite  : ['', Validators.required]
        });

        // // Get the favorites
        this._userService.user$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((user: User) => {
                this.user = user;

            });

        // Get the favorites
        this._userService.favorites$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((favorites: Favorite[]) => {
                this.favorites.set(favorites);
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

    /**
     * Open the favorites panel
     */
    openPanel(): void
    {
        if (this.user?.id) {
            this._userService.getAllFavorites(this.user.id).subscribe();
        }

        // Return if the favorites panel or its origin is not defined
        if ( !this._favoritesPanel || !this._favoritesOrigin )
        {
            return;
        }

        // Make sure to start in 'view' mode
        this.mode = 'view';

        // Create the overlay if it doesn't exist
        if ( !this._overlayRef )
        {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._favoritesPanel, this._viewContainerRef));
    }

    /**
     * Close the messages panel
     */
    closePanel(): void
    {
        this._overlayRef.detach();
    }

    public onDropdownOpened(){
        this.toggle = true;
    }
    public onDropdownClosed(){
        this.toggle = false;
    }

    onFavoriteSelect(item): void {
        this._userService.favorite = item;
        if ( this.mode === 'view') {
            this._router.navigate(['place-details', item?.pid])
        }
    }

    /**
     * Place select
     */
    onPlaceSelect(select): void {
        console.log('select', select);
        this.favoriteForm.patchValue({
            pid: select.id,
            label: select.name,
            description: select.address.location,
            link: select.slug,

        })
    }

    /**
     * Change the mode
     */
    changeMode(mode: 'view' | 'modify' | 'add' | 'edit'): void
    {
        // Change the mode
        this.mode = mode;
    }

    /**
     * Prepare for a new favorite
     */
    newFavorite(): void
    {
        // Reset the form
        this.favoriteForm.reset();

        // Enter the add mode
        this.mode = 'add';
    }

    /**
     * Edit a favorite
     */
    editFavorite(favorite: Favorite): void
    {
        // Reset the form with the favorite
        this.favoriteForm.reset(favorite);

        // Enter the edit mode
        this.mode = 'edit';
    }

    /**
     * Save favorite
     */
    save(): void
    {
        // Get the data from the form
        const favorite = this.favoriteForm.value;

        // If there is an id, update it...
        if ( favorite.pid )
        {
            this._userService.updateUserFavoritePlace(this.user.id, favorite).subscribe();
        }
        // Otherwise, create a new favorite...
        else
        {
            this._userService.addUserFavoritePlace(this.user.id, favorite).subscribe();
        }

        // Go back the modify mode
        this.mode = 'modify';
    }

    /**
     * Delete favorite
     */
    delete(): void
    {
        // Get the data from the form
        const favorite = this.favoriteForm.value;
        console.log('favoriteBeforeRm', favorite)

        // Delete
        this._userService.rmUserFavoritePlace(this.user.id, favorite).subscribe();

        // Go back the modify mode
        this.mode = 'modify';
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item?.id || index;
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
                                  .flexibleConnectedTo(this._favoritesOrigin._elementRef.nativeElement)
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
}
