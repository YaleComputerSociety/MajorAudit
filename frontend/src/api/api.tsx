
import $ from "jquery"
import { User, AuthState } from "../commons/types/TypeStudent";

/* * * GET * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export const getAuth = () => {
	return new Promise<AuthState>((resolve, reject) => {
		$.ajax({
			url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/getAuth",
			xhrFields: { withCredentials: true }
		}).done((data: AuthState) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};


export const getUser = () => {
  return new Promise<User>((resolve, reject) => {
    $.ajax({
      url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/getUser",
      method: "GET",
      xhrFields: { withCredentials: true }
    }).done((data: User) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
  });
};



export const getCTCourses = (key: string): Promise<any> => {
	return new Promise((resolve, reject) => {
			$.ajax({
					url: `http://127.0.0.1:5001/majoraudit/us-central1/functions/getCTCourses?key=${key}`,
					method: "GET",
					xhrFields: { withCredentials: true }
			}).done((data: any) => {
					resolve(data);
			}).fail((error) => {
					reject(error);
			});
	});
};


/* * * POST * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export const onboardUser = (data: string) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/onboardUser",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			xhrFields: { withCredentials: true }
		}).done((response) => {
			resolve(response);
		}).fail((error) => {
			reject(error);
		});
	});
};


export const syncUser = (data: User) => {
	return new Promise((resolve, reject) => {
		$.ajax({
			url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/syncUser",
			method: "POST",
			contentType: "application/json",
			data: JSON.stringify(data),
			xhrFields: { withCredentials: true }
		}).done((response) => {
			resolve(response);
		}).fail((error) => {
			reject(error);
		});
	});
};


/* * * OTHER * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * */

export const initExtension = () => {
	var event = new CustomEvent("scrapeData", {
		detail: { action: "openWebsite" }
	});
	document.dispatchEvent(event);
};
