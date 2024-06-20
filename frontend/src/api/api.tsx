
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

export const checkLogin = () => {
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

export const syncData = () => {
    console.log("api: syncData")
    var event = new CustomEvent("scrapeData", {
      detail: { action: "openWebsite" }
    });
    document.dispatchEvent(event);
};

export const getData = () => {
    return new Promise((resolve, reject) => { 
        $.ajax({
            url: "http://127.0.0.1:5001/majoraudit/us-central1/functions/get_data",
            xhrFields: { withCredentials: true }
        }).done((data: string | null) => {
            resolve(data)
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
