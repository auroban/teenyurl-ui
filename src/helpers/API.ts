import { URLCreatedResponse } from "../interfaces/responses/URLCreatedResponse";
class API {

    public static async sendNewURLRequest() : Promise<URLCreatedResponse | null> {

        console.log('Calling URL');
        return {
            message : "API Call Successful",
            data : {
                key : "key",
                expiry : new Date(),
                originalURL : "https://www.google.com",
                shortURL : "https://www.turls.in/xyz",
            },
            error : {
                code : "",
                description : ""
            }
        };
    }
}

export default API;