

export const OfferCorpFeatures = [
    {
        id: 0,
        name: 'Площадки: Политех, ТЭК',
        icon: 'heroicons_outline:check-circle',
        description: ''
    },
    {
        id: 1,
        name: 'OFFER.PRICING_PACKAGE_FEATURE_1',
        icon: 'heroicons_outline:check-circle',
        description: ''
    },
    {
        id: 2,
        name: 'OFFER.PRICING_PACKAGE_FEATURE_2',
        icon: 'heroicons_outline:check-circle',
        description: ''
    },
    {
        id: 3,
        name: 'OFFER.PRICING_PACKAGE_FEATURE_3',
        icon: 'heroicons_outline:check-circle',
        description: ''
    }
]


export const OfferProducts = [
    {
        label: 'OFFER.EVENT_TYPE_CORP_TOUR_LABEL_1',
        slug: 0,
        isActive: true,
        icon: 'heroicons_outline:shield-check',
        description: 'OFFER.EVENT_TYPE_CORP_TOUR_DESC',
        cost: 440,
        currency: 'BYN',
        type: 'OFFER.EVENT_TYPE_CORP_TOUR',
        paymentPlan: null,
        cityName: '1',
        favoritePlaceIds: [],
        favoritePlaces: [],
        features: [
            {
                id: 0,
                name: 'Площадки: ТЭК, Политех, СШ№14',
                icon: 'heroicons_outline:shield-check',
                description: ''
            },
            {
                id: 1,
                name: '2-х часовые тренировки с тренером',
                icon: 'heroicons_outline:shield-check',
                description: ''
            },


        ],
        limit: 'OFFER.QUANTITY_24'


    },
    {
        label: 'OFFER.EVENT_TYPE_CORP_TOUR_LABEL',
        slug: 2,
        isActive: false,
        icon: 'heroicons_outline:shield-check',
        description: 'OFFER.EVENT_TYPE_CORP_TOUR_DESC',
        cost: 540,
        currency: 'BYN',
        type: 'OFFER.EVENT_TYPE_CORP_TOUR',
        paymentPlan: null,
        cityName: '1',
        favoritePlaceIds: [],
        favoritePlaces: [],
        features: [{
           id: 1,
           name: '',
           icon: null,
           description: ''
        }],
        limit: null


    },
    {
        label: 'OFFER.EVENT_TYPE_CORP_TOUR_LABEL',
        slug: 3,
        isActive: false,
        icon: 'heroicons_outline:shield-check',
        description: 'OFFER.EVENT_TYPE_CORP_TOUR_DESC',
        cost: 640,
        currency: 'BYN',
        type: 'OFFER.EVENT_TYPE_CORP_TOUR',
        paymentPlan: null,
        cityName: '1',
        favoritePlaceIds: [],
        favoritePlaces: [],
        features: [{
           id: 2,
           name: '',
           icon: null,
           description: ''
        }],
        limit: null


    },
]
