import { Injectable } from '@angular/core';

import { Student } from '../models/student'

@Injectable({
	providedIn: 'root'
})
export class SessionService {

	constructor() {

	}

	getCurrentStudent(): Student {
		return JSON.parse(sessionStorage.currentStudent);
	}

	setCurrentStudent(student: Student | null): void {
		sessionStorage.students = JSON.stringify(student);
	}

	getEmail(): string {
		return sessionStorage.email;
	}

	setEmail(email: string | undefined): void {
		sessionStorage.email = email;
	}

	getPassword(): string {
		return sessionStorage.password;
	}

	setPassword(password: string | undefined): void {
		sessionStorage.password = password;
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
