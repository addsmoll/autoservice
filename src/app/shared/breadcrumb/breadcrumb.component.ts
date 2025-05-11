import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import {ActivatedRoute, Router, ActivatedRouteSnapshot, UrlSegment, NavigationEnd, RouterLink} from "@angular/router";
import { Title } from '@angular/platform-browser';
import {NgForOf} from "@angular/common";
import {MatIconModule} from "@angular/material/icon";
import {FuseNavigationService, FuseVerticalNavigationComponent} from "../../../@fuse/components/navigation";
import {NavigationService} from "../../core/navigation/navigation.service";
import {FuseMediaWatcherService} from "../../../@fuse/services/media-watcher";
import {takeUntil} from "rxjs/operators";
import {Navigation} from "../../core/navigation/navigation.types";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";


@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    imports: [
        NgForOf,
        RouterLink,
        MatIconModule
    ]
})
export class BreadcrumbComponent implements OnInit {

    public pageTitle:string;
    public breadcrumbs: {
        name: string;
        url: string
    }[] = [];
    isMobile: boolean;
    navigation: Navigation;
    isScreenSmall: boolean;
    private _activatedRoute = inject(ActivatedRoute)
    private _router = inject(Router)
    private _navigationService = inject(NavigationService)
    private _fuseMediaWatcherService = inject(FuseMediaWatcherService)
    private _fuseNavigationService = inject(FuseNavigationService)
    public title = inject(Title)
    private destroyRef = inject(DestroyRef);

    ngOnInit() {
        this._router.events.subscribe(event => {
            if (event instanceof NavigationEnd) {
                this.breadcrumbs = [];
                this.parseRoute(this._router.routerState.snapshot.root);
                this.pageTitle = "";
                this.breadcrumbs.forEach(breadcrumb => {
                    this.pageTitle += ' > ' + breadcrumb.name;
                })
                // this.title.setTitle(this.settings.name + this.pageTitle);
            }
        })




        // Subscribe to navigation data
        this._navigationService.navigation$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe((navigation: Navigation) => {
                this.navigation = navigation;
            });

        // Subscribe to media changes
        this._fuseMediaWatcherService.onMediaChange$
            .pipe(takeUntilDestroyed(this.destroyRef))
            .subscribe(({matchingAliases}) => {
                this.isMobile = matchingAliases.includes('sm');

                // Check if the screen is small
                this.isScreenSmall = !matchingAliases.includes('md');
            });
    }

    private parseRoute(node: ActivatedRouteSnapshot) {
        if (node.data['breadcrumb']) {
            if(node.url.length){
                let urlSegments: UrlSegment[] = [];
                node.pathFromRoot.forEach(routerState => {
                    urlSegments = urlSegments.concat(routerState.url);
                });
                let url = urlSegments.map(urlSegment => {
                    return urlSegment.path;
                }).join('/');
                this.breadcrumbs.push({
                    name: node.data['breadcrumb'],
                    url: '/' + url
                })
            }
        }
        if (node.firstChild) {
            this.parseRoute(node.firstChild);
        }
    }

    public closeSubMenus(){
        // if(this.settings.menu == "vertical")
        //     this.menuService.closeAllSubMenus();
    }

    /**
     * Toggle navigation
     *
     * @param name
     */
    toggleNavigation(name: string): void
    {
        // Get the navigation
        const navigation = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>(name);

        if ( navigation )
        {
            // Toggle the opened status
            navigation.toggle();
        }
    }


}
