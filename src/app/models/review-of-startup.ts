import { Startup } from "./startup";
import { StudentWrapper } from "./student-wrapper";

export class ReviewOfStartup {
    reviewOfStartUpId: number | undefined;
    rating: number | undefined;
    review: string | undefined;
    studentWrapper: StudentWrapper | undefined;
    startUpBeingRated: Startup | undefined;

    constructor(reviewOfStartUpId?: number, rating?: number,
        review?: string) {
        this.reviewOfStartUpId = reviewOfStartUpId;
        this.rating = rating;
        this.review = review;
    }
}
