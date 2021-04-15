import { Posting } from './posting';

export class Favourites {
  post: Posting | undefined;
  postingId: number | undefined;
  studentId: number | undefined;

  constructor(posting?: Posting, postingId?: number, studentId?: number) {
    this.post = posting;
    this.postingId = postingId;
    this.studentId = studentId;
  }
}
