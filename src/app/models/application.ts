import { ApplicationStatus } from "../enumeration/application-status.enum";

export class Application {
    applicationId: number | undefined;
    offerSent: boolean | undefined;
    applicationStatus: ApplicationStatus | undefined;

    constructor(applicationId?: number, offerSent?: boolean,
        applicationStatus?: ApplicationStatus) {
            this.applicationId = applicationId;
            this.offerSent = offerSent;
            this.applicationStatus = applicationStatus;
    }
}