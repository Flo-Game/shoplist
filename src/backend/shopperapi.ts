//import { retrieveJWT } from "../JWTManager";
import { retrieveJWT } from '../JWTManager';
import { ShopItemResource, ShopListItemsResource, ShopListResource, ShopperResource } from "../Resources";
import { fetchWithErrorHandling } from "./validation";
//import dotenv from "dotenv";
//dotenv.config();

const HOST = process.env.REACT_APP_API_SERVER_URL;

/**
 * Ergänzen Sie hier die Anbindung an den Server
 */

function headers() {
    const headers: any = {
        "Content-Type": "application/json"
    }
    const jwt = retrieveJWT();
    //const jwt = store.getState().jwt;
    if (jwt) {
        headers.Authorization = `Bearer ${jwt}`;
    }
    return headers;
}


export async function getShopper(): Promise<ShopperResource> {
    const url = `${HOST}/api/shopper`;

    // eslint-disable-next-line no-useless-catch
    try{
        const data: ShopperResource = await fetchWithErrorHandling(url, {headers: headers()});
        return data;
    }catch(error){
        console.error("Error: " + error);
        throw error;
    }
}

export async function getShopItems(shopListId: string): Promise<ShopItemResource[]> {
    const url = `${HOST}/api/shoplist/${shopListId}/shopItems`;
    // eslint-disable-next-line no-useless-catch
    try{
        const response = await fetchWithErrorHandling(url, {headers: headers()});
        const data = response as ShopListItemsResource;
        return data.shopItems;
    }catch(err){
        throw err;
    }
}

export async function getShopList(shopListId:string): Promise<ShopListResource>{
    const url = `${HOST}/api/shoplist/${shopListId}`;
    
    // eslint-disable-next-line no-useless-catch
    try{
        const data: ShopListResource = await fetchWithErrorHandling(url, {headers: headers()});
        return data;
    }catch(err){
        throw err;
    }
}

export async function getShopItem(shopItemId:string): Promise<ShopItemResource> {
    const url = `${HOST}/api/shopitem/${shopItemId}`;
    // eslint-disable-next-line no-useless-catch
    try{
        const data: ShopItemResource = await fetchWithErrorHandling(url, {headers: headers()});
        return data;
    }catch(err){
        throw err;
    }
}

export async function login(email: string, password: string): Promise<any> {
    const url = `${HOST}/api/login`;
    // eslint-disable-next-line no-useless-catch
    try{
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });
        if(response.ok){
            const loginRessource = await response.json();
            return loginRessource;
        }
        if(response.status === 401){
            throw new Error("Invalid email or password");
        }
        throw new Error(`Error connecting to ${HOST}: ${response.statusText}`);
    }catch(err){
        throw(err);
    }
}