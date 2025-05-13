import {
    ChangeDetectionStrategy, ChangeDetectorRef,
    Component, inject, OnInit, ViewChild,
    ViewEncapsulation,
} from '@angular/core';
import {FormBuilder, FormGroup, NgForm, Validators} from "@angular/forms";

import {ActivatedRoute, Router} from "@angular/router";
import {Meta, Title} from "@angular/platform-browser";
import {OfferProduct} from "../offer";
import {OfferCorpFeatures, OfferProducts} from "../offer.env";
import {Cities} from "../offer-cities.enum";
import {OfferService} from "../offer.service";


@Component({
    selector: 'offers-corporate',
    templateUrl: './corporate.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false,

})
export class OffersCorporateComponent implements OnInit {
    @ViewChild('clientNgForm') clientNgForm: NgForm;
    private _formBuilder = inject(FormBuilder)
    private route = inject(ActivatedRoute)
    private _router = inject(Router)
    private _offerService = inject(OfferService)
    private _metaTagService = inject(Meta)
    private _title = inject(Title)
    private _changeDetectorRef = inject(ChangeDetectorRef)
    clientForm: FormGroup;
    alert;

    offerProducts: OfferProduct[];
    cityName: string | null = null;
    allowedDates = [
        new Date(2025, 3, 10), // 10 апреля 2025
        new Date(2025, 3, 15), // 15 апреля 2025
        new Date(2025, 3, 20), // 20 апреля 2025
    ];
    allowedDatesFilter;

    ngOnInit() {
            const cityKey = this.route.snapshot.paramMap.get('city-id');
            this.cityName = Cities[cityKey];
            this.loadPlacesByCity(this.cityName);

        this.offerProducts = OfferProducts
        this.clientForm = this._formBuilder.group({
            name: [''],
            email: ['', Validators.required],
            phone: ['', Validators.required],
            message: [''],
            selectedDate: [null],
            selectedOffer: [null],

        })
        this.allowedDatesFilter = this.createWeekendFilter()


        this._title.setTitle('Автоэлектрик Молодечно')

        this._metaTagService.addTags([
            {
                name: 'keywords',
                content: 'Автоэлектрик'
            },
            {name: 'robots', content: 'index, follow'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=5.0'},
            {charset: 'UTF-8'},
            {name: 'description', content: 'Диагностика и ремонт автоэлектрики в Молодечно'},

            {property: 'og:title', content: 'Автоэлектрик в Молодечно'},
            {property: 'og:description', content: 'Диагностика и ремонт автоэлектрики в Молодечно'},
            {property: 'og:image', content: 'https://sergeyshabunya.by/assets/images/offers/ad3.jpg'},
            {property: 'vk:image', content: 'https://sergeyshabunya.by/assets/images/offers/ad3.jpg'},
            {property: 'og:image:width', content: '418'},
            {property: 'og:image:height', content: '287'},
            {property: 'og:image:alt', content: 'Нет изображения...'},

            {property: 'og:site_name', content: 'Автомастерская'},
            {property: 'og:type', content: 'website'},

            {property: 'og:locale', content: 'ru'},
            {property: 'og:locale:alternate', content: 'en_GB'},

        ]);

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------



    myDateFilter = (d: Date | null): boolean => {
        if (!d) return false;

        return this.allowedDates.some(date =>
            date.getFullYear() === d.getFullYear() &&
            date.getMonth() === d.getMonth() &&
            date.getDate() === d.getDate()
        );
    };

    onlyWeekendsFilter = (d: Date | null): boolean => {
        if (!d) return false;

        const day = d.getDay(); // 0 — воскресенье, 6 — суббота
        return day === 0 || day === 6;
    };

    createWeekendFilter(): (d: Date | null) => boolean {
        return (d: Date | null): boolean => {
            if (!d) return false;
            const day = d.getDay();
            return day === 0 || day === 6;
        };
    }

    onSendForm(): void {

        if (this.clientForm.invalid){
            return;
        }
        console.log(this.clientForm.value)

        this._offerService.postData(this.clientForm.value).subscribe()






        // Set the alert
        this.alert = {
            type   : 'success',
            message: 'OFFER.MESSAGE_SEND_SUCCESS'
        };

        setTimeout(() => {
            this.alert = null

            // Mark for check
            this._changeDetectorRef.markForCheck();
        }, 7000);


    }

    loadPlacesByCity(cityId: string) {




    }

    clearForm(): void
    {
        // Reset the form
        this.clientNgForm.resetForm();
    }

    close(){
        this._router.navigate(['/'])
    }

    onSelectDate(index, $event): void {
        this.offerProducts[index].metaSelectedDate =  $event.value

        this.clientForm.get('selectedDate').setValue((new Date($event.value)))
    }

    goto(fullPath) {
        this._router.navigate([fullPath])
    }


    protected readonly OfferCorpFeatures = OfferCorpFeatures;
}
