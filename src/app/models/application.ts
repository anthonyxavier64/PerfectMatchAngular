import { ApplicationStatus } from "../enumeration/application-status.enum";
import { Posting } from "./posting";
import { Student } from "./student";

export class Application {
    applicationId: number | undefined;
    offerSent: boolean | undefined;
    applicationStatus: ApplicationStatus | undefined;
    posting: Posting | undefined;
    student: Student | undefined;

    constructor(applicationId?: number, offerSent?: boolean,
        applicationStatus?: ApplicationStatus) {
            this.applicationId = applicationId;
            this.offerSent = offerSent;
            this.applicationStatus = applicationStatus;
    }
}