import axios from "axios";

export enum TypeMessage {
    INFO,
    ERROR,
    WARINING,
    SUCCESS,
}

export enum TypeAlert {
    Primary = "primary",
    Secondary = "secondary",
    Success = "success",
    Danger = "danger",
    Warning = "warning",
    Info = "info",
    Light = "light",
    Dark = "dark",
}

export default class PlineTools {
    public static appMessage: Function = (
        message: string,
        title: string = "",
        icon: any = null,
        force: boolean = false
    ) => {
        window.alert(message);
    };

    public static appAlert: Function;

    public static backendUrl = () => {
        return `${window.location.protocol}//${window.location.hostname}:8080`;
    };

    public static getRequest = (path: string) => {
        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PlineTools.getCookies("token") === undefined
                    ? ""
                    : PlineTools.getCookies("token")
                }`,
            },
        };
        const response = axios.get(PlineTools.backendUrl() + path, requestOptions);
        return response;
    };

    public static deleteRequest = (path: string, id: string) => {
        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PlineTools.getCookies("token") === undefined
                    ? ""
                    : PlineTools.getCookies("token")
                }`,
            },
        };
        const response = axios.delete(
            PlineTools.backendUrl() + path + id,
            requestOptions
        );
        return response;
    };

    public static patchRequest = async (path: string, data: any) => {
        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PlineTools.getCookies("token") === undefined
                    ? ""
                    : PlineTools.getCookies("token")
                }`,
            },
        };
        const response = await axios.patch(
            PlineTools.backendUrl() + path,
            data,
            requestOptions
        );
        //const result = await response.json();
        return response;
    };
    public static postRequest = async (path: string, data: any) => {
        const requestOptions = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${PlineTools.getCookies("token") === undefined
                    ? ""
                    : PlineTools.getCookies("token")
                }`,
            },
        };
        const response = await axios.post(
            PlineTools.backendUrl() + path,
            data,
            requestOptions
        );
        //const result = await response.json();
        return response;
    };

    public static uploadFile = async (path: string, file: string) => {
        const formData = new FormData();
        formData.append("file", file);
        const token = PlineTools.getCookies("token");
        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: `Bearer ${token == undefined ? "" : token}`,
            },
            body: formData,
        };
        const response = await fetch(
            PlineTools.backendUrl() + path,
            requestOptions
        );
        //const result = await response.json();
        return response;
    };

    public static setCookies = (cname: string, cvalue: string, exdays = 365) => {
        const d = new Date();
        d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
        let expires = "expires=" + d.toUTCString();
        document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    };

    public static getCookies = (cname: string) => {
        let name = cname + "=";
        let decodedCookie = decodeURIComponent(document.cookie);
        let ca = decodedCookie.split(";");
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) == " ") {
                c = c.substring(1);
            }
            if (c.indexOf(name) == 0) {
                const result = c.substring(name.length, c.length);
                return result;
            }
        }
        return undefined;
    };

    public static removeCookies = (name: string) => {
        document.cookie = name + "=; Path=/;";
    };

    public static stringToLabel = (text: string) => {
        try {
            let result = "";
            const items = text.split("_");
            items.forEach((element) => {
                result += element.charAt(0).toUpperCase() + element.slice(1) + " ";
            });
            return result.trim();
        } catch (e) {
            return "";
        }
    };

    public static formDataToObject(
        target: React.FormEvent<HTMLFormElement>
    ): any {
        const formData = new FormData(target.currentTarget);
        var object: any = {};
        formData.forEach(function (value: any, key: string) {
            object[value] = key;
        });
        return object;
    }

    public static dialogMessage = (
        message: string,
        title: string = "Information",
        type: TypeMessage = TypeMessage.INFO,
        backdrop: boolean = true
    ) => {
        PlineTools.appMessage(message, title, type, backdrop);
    };

    public static errorDialogMessage = (
        message: string,
        backdrop: boolean = true
    ) => {
        PlineTools.appMessage(message, "Error", TypeMessage.ERROR, backdrop);
    };
    public static warningDialogMessage = (
        message: string,
        backdrop: boolean = true
    ) => {
        PlineTools.appMessage(message, "Error", TypeMessage.WARINING, backdrop);
    };
    public static successDialogMessage = (
        message: string,
        backdrop: boolean = true
    ) => {
        PlineTools.appMessage(message, "Success", TypeMessage.SUCCESS, backdrop);
    };

    public static showAlert = (
        messages: string[],
        variant: TypeAlert,
        timeOut = 0
    ) => {
        PlineTools.appAlert(messages, variant, timeOut);
    };


    // Check Duplicate Patterns For Call - Routes
    public static duplicatePattern = (array: any) => {
        let data = array.map((a: any) => a.pattern);
        let findDuplicates = (arr: any) => arr.filter((item: any, index: any) => arr.indexOf(item) != index)
        let result = findDuplicates(data);
        if (result.length == 0) {
            return true;
        } else {
            return false;
        }
    }
    public static duplicateTrunk = (array: any) => {
        let data = array.map((a: any) => a.sipTrunk.id);
        let findDuplicates = (arr: any) => arr.filter((item: any, index: any) => arr.indexOf(item) != index)
        let result = findDuplicates(data);
        if (result.length == 0) {
            return true;
        } else {
            return false;
        }
    }

}