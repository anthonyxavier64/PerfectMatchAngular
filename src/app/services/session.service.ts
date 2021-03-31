import { Injectable } from '@angular/core';

import { StudentWrapper } from '../models/student-wrapper'

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	constructor() {

	}

	getCurrentStudent(): StudentWrapper {
		return JSON.parse(sessionStorage.currentStudent);
	}

	setCurrentStudent(student: StudentWrapper | null): void {
		sessionStorage.students = JSON.stringify(student);
	}

	getIsLogin(): boolean {
		if (sessionStorage.isLogin == "true") {
			return true;
		}
		else {
			return false;
		}
	}

	setIsLogin(isLogin: boolean): void {
		sessionStorage.isLogin = isLogin;
	}

}
