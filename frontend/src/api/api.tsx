
import $ from "jquery"

import { User, nullUser, AuthState } from "../commons/types/TypeStudent";

export const handleLogin = () => {
    return new Promise<boolean> ((resolve, reject) => { 
        $.ajax({
            url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/check_login",
            xhrFields: { withCredentials: true }
        }).done((data: string | null) => {
            if(data){
                resolve(true)
            }else{
                resolve(false)
            }
        }).fail((error) => {
            reject(error);
        });
    });
};

// checkUser()
export const checkUser = () => {
	console.log("API: checkUser();")
	return new Promise<AuthState>((resolve, reject) => {
		$.ajax({
			url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/check_login",
			xhrFields: { withCredentials: true }
		}).done((data: AuthState) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
	});
};


// checkUserData();
export const getUserData = () => {
  return new Promise<User>((resolve, reject) => {
    $.ajax({
      url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/get_data",
      method: "GET",
      xhrFields: { withCredentials: true }
    }).done((data: User) => {
			resolve(data);
		}).fail((error) => {
			reject(error);
		});
  });
};

export const syncData = (data: string) => {
	return new Promise((resolve, reject) => {
			$.ajax({
					url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/sync_data",
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



export const getMajors = () => {
    return new Promise((resolve, reject) => { 
        $.ajax({
            url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/get_majors",
            method: "GET",
            xhrFields: { withCredentials: true }
        }).done((data: string | null) => {
            resolve(data)
        }).fail((error) => {
            reject(error);
        });
    });
};

//

export const getCTCourses = (timekey: string): Promise<any> => {
	return new Promise((resolve, reject) => {
			$.ajax({
					url: `http://127.0.0.1:5001/majoraudit/us-central1/functions/CT_Courses?key=${timekey}`,
					method: "GET",
					xhrFields: { withCredentials: true }
			}).done((data: any) => {
					resolve(data);
			}).fail((error) => {
					reject(error);
			});
	});
};


// syncData()
export const initExtension = () => {
	var event = new CustomEvent("scrapeData", {
		detail: { action: "openWebsite" }
	});
	document.dispatchEvent(event);
};
