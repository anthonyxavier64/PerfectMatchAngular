import { StartupLocation } from "../enumeration/startup-location.enum";
import { Payment } from "./payment";
import { Posting } from "./posting";
import { ReviewOfStartup } from "./review-of-startup";

export class Startup {
    startupId: number | undefined;
    startupRegistrationNum: string | undefined;
    companyName: string | undefined;
    description: string | undefined;
    email: string | undefined;
    password: string | undefined;
    industry: string | undefined;
    startupLocation: StartupLocation | undefined;
    rating: string | undefined;
    postings: Posting[] | undefined;
    payments: Payment[] | undefined;
    reviews: ReviewOfStartup[] | undefined;

    constructor(startupId?: number, startupRegistrationNum?: string,
        companyName?: string, description?: string, email?: string, password?: string,
        industry?: string, startupLocation?: StartupLocation, rating?: string) {
            this.startupId = startupId;
            this.startupRegistrationNum = startupRegistrationNum;
            this.companyName = companyName;
            this.email = email;
            this.password = password;
            this.industry = industry;
            this.startupLocation = startupLocation;
            this.description = description;
            this.rating = rating;
    }
}