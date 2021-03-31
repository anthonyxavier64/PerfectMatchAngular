import { OfferStatus } from "../enumeration/offer-status.enum";
import { Posting } from "./posting";
import { Student } from "./student";

export class Offer {
    offerId: number | undefined;
    offerMessage: string | undefined;
    offerStatus: OfferStatus | undefined;
    posting: Posting | undefined;
    student: Student | undefined;

    constructor(offerId?: number, offerMessage?: string,
        offerStatus?: OfferStatus) {
            this.offerId = offerId;
            this.offerMessage = offerMessage;
            this.offerStatus = offerStatus;
    }
}