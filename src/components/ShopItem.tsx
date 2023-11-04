import React from 'react';
import { ShopItemResource } from "../Resources";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import LoadingIndicator from "./LoadingIndicator";

export default function ShopItem(props: {shopItem: ShopItemResource}){
    const shopItem = props.shopItem;
    if(!shopItem){
        return(<LoadingIndicator />);
    }
    return (
        <div> 
            <Card className="card text-white bg-dark mb-3 mt-3 ms-3" style={{ width: '18rem' }}>
                <Card.Body>
                    <Card.Title>
                        <h4>Item: {shopItem.name}</h4>
                    </Card.Title>
                    <Card.Text>
                        <dl>
                            <dd> Anzahl: {shopItem.quantity}</dd>
                            <dd> Bemerkung: {shopItem.remarks}</dd>
                            <dd> Creatorname: {shopItem.creatorName}</dd>
                            <dd> CreatedAt: {shopItem.createdAt}</dd>
                            <dd> ShopListname: {shopItem.shopListStore}</dd>
                        </dl>
                    </Card.Text>
                    <Button variant="success" href={`/shopitem/${shopItem.id}`}>Zu den Item: {shopItem.name}</Button>
                </Card.Body>
            </ Card>
        </div>
    );
}