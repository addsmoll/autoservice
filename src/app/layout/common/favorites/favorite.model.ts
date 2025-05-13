import {IPlace} from "../../../modules/place-interface/place.interface";
import {ImageModel} from "../../../core/classes/image/image.model";

export class Favorite {
    pid: string;
    id?: string;
    label?: string;
    order?: number;
    link?: string;
    getInvite?: boolean;
    images?: ImageModel[];
    address?: any;


    /**
     * Constructor
     *
     * @param favorite
     * @param place
     */
    constructor(favorite?, place?: IPlace) {

        favorite = favorite || {};

        this.id = favorite.id || null;
        this.pid = favorite.pid || place?.id || null;
        this.label = favorite.label || place?.name || null;
        this.order = favorite.order || null;
        this.images = favorite.images || place?.images || null;
        this.link = favorite.link || `/place-details/${this.pid}`;
        this.address = favorite.address || place.address || null;
        this.getInvite = favorite.getInvite || false;
    }
}
