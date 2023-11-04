import React from 'react';
import { ShopListResource } from "../Resources";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import LoadingIndicator from "./LoadingIndicator";

export default function ShopListDescription(props: {shopList: ShopListResource}){
    const shopList = props.shopList;

    if(!shopList){
        return(<LoadingIndicator />)
    }
    
    return(
        <div>
            <Card className= "card text-white bg-dark ms-3 mt-3 me-3 mb-3" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>
                        <h4>Store: {shopList.store}</h4>
                    </Card.Title>
                    <Card.Text>
                        <dl>
                            <dd> Public: {shopList.public ? "true":"false"}</dd>
                            <dd> Done: {shopList.done ? "true":"false"}</dd>
                            <dd> Creatorname: {shopList.creatorName}</dd>
                            <dd> CreatedAt: {shopList.createdAt}</dd>
                            <dd> Itemcount: {shopList.shopItemCount}</dd>
                        </dl>
                    </Card.Text>
                    <Button variant="success" href={`/shoplist/${shopList.id}`}>Zu den Items von {shopList.store}</Button>
                </Card.Body>
            </Card>
             
        </div>
    );
}