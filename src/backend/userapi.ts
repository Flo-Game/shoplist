//import { retrieveJWT } from "../JWTManager";
import { retrieveJWT } from '../JWTManager';
import { UserResource, UsersResource } from "../Resources";
import { fetchWithErrorHandling } from "./validation";

const HOST = process.env.REACT_APP_API_SERVER_URL;

/**
 * Ergänzen Sie hier die Anbindung an den Server
 */

function headers() {
    const headers: any = {
        "Content-Type": "application/json"
    }
    //const jwt = store.getState().jwt;
    const jwt = retrieveJWT();
    if (jwt) {
        headers.Authorization = `Bearer ${jwt}`;
    }
    return headers;
}

export async function createUser(name: string, email: string, password: string, admin: boolean): Promise<any>{
    const url = `${HOST}/api/user`;

    // eslint-disable-next-line no-useless-catch
    try{
        const response:Response = await fetchWithErrorHandling(url, {
            method: "POST",
            headers: headers(),
            body: JSON.stringify({ name, email, password, admin }),
        })

        if(response.ok){
            const userResource: UserResource = await response.json();
            return userResource;
        }else if(response.status === 400){
            throw new Error("Invalid email or password");
        }
    }catch(err){
        throw(err);
    }
}

export async function deleteUser(userId:string): Promise<void>{
    // eslint-disable-next-line no-useless-catch
    try{
        const url = `${HOST}/api/user/${userId}`;
        const response:Response = await fetchWithErrorHandling(url, {
         method: "DELETE",
        headers: headers(),
        body: JSON.stringify({userId}),
    });
    }catch(err){
        throw err;
    } 
}

export async function updateUser(userId: string, id: string, name: string, email: string, admin: boolean, password?: string): Promise<any> {
    const url = `${HOST}/api/user/${userId}`;
    const requestBody: any = { id, name, email, admin, password };

    // eslint-disable-next-line no-useless-catch
    try {
        const response: Response = await fetchWithErrorHandling(url, {
            method: "PUT",
            headers: headers(),
            body: JSON.stringify(requestBody),
        });

        if (response.ok) {
            const data: UserResource = await response.json();
            return data;
        }
    } catch (err) {
       throw(err);
    }
}

export async function getUsers(): Promise<UsersResource>{
    const url = `${HOST}/api/users`;

    // eslint-disable-next-line no-useless-catch
    try{
        const data : UsersResource = await fetchWithErrorHandling(url, {headers: headers()});
        return data;
    }catch(err){
        throw err;
    }
}
