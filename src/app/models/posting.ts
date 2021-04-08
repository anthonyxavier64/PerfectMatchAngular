import { Application } from "./application";
import { Offer } from "./offer";
import { Startup } from "./startup";

export abstract class Posting {
    postingId: number | undefined;
    offers: Offer[] | undefined;
    applications: Application[] | undefined;
    startup: Startup | undefined;

    constructor(postingId?: number) {
        this.postingId = postingId;
    }
}
