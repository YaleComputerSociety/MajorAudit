
import $ from "jquery"

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

export const checkUser = (): Promise<{ loggedIn: boolean; onboard: boolean }> => {
    return new Promise<{ loggedIn: boolean; onboard: boolean }>((resolve, reject) => {
        $.ajax({
            url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/check_login",
            xhrFields: { withCredentials: true }
        }).done((data: { loggedIn: boolean; onboard: boolean }) => {
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

export const getData = () => {
    return new Promise<string | null>((resolve, reject) => { 
        $.ajax({
            url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/get_data",
            method: "GET",
            xhrFields: { withCredentials: true }
        }).done((data: string | null) => {
            resolve(data)
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
