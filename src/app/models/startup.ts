import { StartupLocation } from "../enumeration/startup-location.enum";
import { Payment } from "./payment";
import { Posting } from "./posting";

export class Startup {
    startupId: number | undefined;
    startupRegistrationName: string | undefined;
    companyName: string | undefined;
    email: string | undefined;
    password: string | undefined;
    industry: string | undefined;
    startupLocation: StartupLocation | undefined;
    postings: Posting[] | undefined;
    payments: Payment[] | undefined;

    constructor(startupId?: number, startupRegistrationName?: string,
        companyName?: string, email?: string, password?: string,
        industry?: string, startupLocation?: StartupLocation) {
            this.startupId = startupId;
            this.startupRegistrationName = startupRegistrationName;
            this.companyName = companyName;
            this.email = email;
            this.password = password;
            this.industry = industry;
            this.startupLocation = startupLocation;
    }
}