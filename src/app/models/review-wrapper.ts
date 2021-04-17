export class ReviewWrapper {
    reviewOfStartUpId: number | undefined;
    rating: number | undefined;
    review: string | undefined;
    studentId: number | undefined;
    startUpBeingRatedId: number | undefined;

    constructor(reviewOfStartUpId?: number, rating?: number,
        review?: string, studentId?:number, startUpBeingRatedId?:number) {
        this.reviewOfStartUpId = reviewOfStartUpId;
        this.rating = rating;
        this.review = review;
        this.studentId = studentId;
        this.startUpBeingRatedId = startUpBeingRatedId;
    }
}
