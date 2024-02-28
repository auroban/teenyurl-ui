import { URLCreationRequest } from "../interfaces/requests/URLCreationRequest";
import { Data, Error, URLCreatedResponse } from "../interfaces/responses/URLCreatedResponse";
class API {

    private static baseURL: string = "http://localhost:8001";

    public static async sendNewURLRequest(request: URLCreationRequest) : Promise<URLCreatedResponse | null> {

        try {

            const url = `${this.baseURL}/urls`;

            const headers = new Headers();
            headers.set("Content-Type", "application/json");

            const options: RequestInit = {
                body : JSON.stringify(request),
                method : "POST",
                headers : headers
            }

            const response = await fetch(url, options);
            const isSuccess = response.status === 200 ? true : false;
            const jsonResponse = new Map<string, Object>(Object.entries((await response.json())));
            let data: Data | undefined;
            let error: Error | undefined;

            if (isSuccess) {
                const responseData = new Map<string, string>(Object.entries(jsonResponse.get("data") as Object));
                console.log("Response Data: ", responseData);
                data = {
                    key : responseData.get("key") ?? "",
                    expiry : new Date(responseData.get("expiry") ?? ""),
                    originalURL : responseData.get("original_url") ?? "",
                    shortURL : responseData.get("shortened_url") ?? "",
                }
            } else {
                const errorData = new Map<string, string>(Object.entries(jsonResponse.get("error") as Object));
                error = {
                    code : errorData.get("code") ?? "ERR",
                    description : errorData.get("description") ?? "Internal Server Error",
                }
            }
            
            return {
                message : jsonResponse.get("message")?.toString() ?? "",
                data : data,
                error : error,
            };
        } catch (e) {
            console.error("Error while sending new URL creation request: ", e);
            return {
                message : "API call failure",
                error : {
                    code : "ERR",
                    description : "Server Unresponsive",
                }
            }
        }
    }
}

export default API;