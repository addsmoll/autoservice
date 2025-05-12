

export class OfferProduct
    {
        label: string;
        slug: number;
        isActive: boolean;
        icon: string;
        description: string;
        cost: number;
        currency: string;
        type: string;
        paymentPlan: string;
        cityName: string;
        features: OfferFeature[];
        limit: string;
        metaSelectedDate?: Date;


    }


export class OfferFeature {
    id: number;
    name: string;
    description?: string;
    price?: number;
    images?: any[];
    icon: string;

}
