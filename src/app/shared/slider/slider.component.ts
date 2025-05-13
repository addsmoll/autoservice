import {
    AfterViewInit,
    ChangeDetectionStrategy,
    Component, Input,
    OnInit, Renderer2,
} from '@angular/core';
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {ScrollableDirective} from "../../core/directives/scrollable.directive";
import {User} from "../../core/user/user.model";
import {TranslateModule} from "@ngx-translate/core";
import {AvatarModule} from "../../modules/user-interface/avatar/avatar.module";

@Component({
    selector: 'app-slider',
    templateUrl: './slider.component.html',
    imports: [
        CommonModule,
        NgIf,
        NgForOf,
        ScrollableDirective,
        TranslateModule,
        AvatarModule
    ],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderComponent implements OnInit, AfterViewInit {
    @Input() source: User[];
    @Input() isMobile: boolean;
    slider: HTMLElement;
    slide: number;
    sizes: {
        slider: string;
        card: number;
        thresholds: {
            prev: number;
            next: number;
        }
    }


    constructor(private renderer: Renderer2) {

    }

    ngOnInit() {
        const sourceD = this.source.concat(...this.source)
        this.source = sourceD

        this.slide = 0;
        this.sizes = {
            slider: `${this.source.length * 100}%`,
            card: 215,
            thresholds: {
                prev: 0.1,
                next: 0.6
            }
        };
    }

    ngAfterViewInit() {

    }

    onSliderPanMove(event) {
        const startPoint = this.slide * this.sizes.card * -1;
        const slider = document.getElementById('slider');

        slider.style.transform = `translateX(${startPoint + event.deltaX}px)`;
    }

    onSliderPanEnd(event) {
        const target = this.fetchPanEndSlideTarget(event);
        const endPoint = target * this.sizes.card * -1;
        const slider = document.getElementById('slider');

        this.renderer.addClass(slider, 'animating');
        slider.style.transform = `translateX(${endPoint}px)`;
        setTimeout(() => this.renderer.removeClass(slider, 'animating'), 300);

        this.slide = target;
    }

    private fetchPanEndSlideTarget(event) {
        const offset = this.slide * this.sizes.card * -1;
        const currentTranslation = offset + event.deltaX;
        const currentSlideAsFloat=  Math.abs(currentTranslation / this.sizes.card);
        const currentSlide = Math.floor(currentSlideAsFloat);

        let delta = currentSlideAsFloat - currentSlide;
        let target = currentSlide;

        if (delta > this.sizes.thresholds.next) {
            target += 1;
        } else if (delta < this.sizes.thresholds.prev) {
            target -= 1
        }

        // If we are at page 0 and the target would go to -1 we'll reset it to 0
        if (target < 0 || currentTranslation > 0) {
            target = 0
        }

        // If the user wants to scroll over the last slide we'll reset it
        if (target >= this.source.length) {
            target = this.source.length - 1;
        }

        return target;
    }


}
