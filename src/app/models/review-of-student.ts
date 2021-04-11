import { Startup } from "./startup";
import { StudentWrapper } from "./student-wrapper";

export class ReviewOfStudent {
    reviewOfStudentId: number | undefined;
    rating: number | undefined;
    review: string | undefined;
    startup: Startup | undefined;
    studentBeingRated: StudentWrapper | undefined;

    constructor(reviewOfStudentId?: number, rating?: number,
        review?: string) {
        this.reviewOfStudentId = reviewOfStudentId;
        this.rating = rating;
        this.review = review;
    }
}