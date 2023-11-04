import React from 'react';
import { useParams } from "react-router-dom";
import { ShopItemResource } from "../Resources";
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { getShopItem } from "../backend/shopperapi";
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import LoadingIndicator from "./LoadingIndicator";

export default function PageShopItem() {

  const shopItemId = useParams().shopitemID!;
  const[shopItem, setShopItem] = useState<ShopItemResource>();
  const { showBoundary } = useErrorBoundary();

  async function load(){
    try{
      const loadShopItem = await getShopItem(shopItemId);
      setShopItem(loadShopItem);
    }catch(err){
      showBoundary(err);
    }
  }

  useEffect(()=>{
    load();
  },[]);

  if(!shopItem){
    return(<LoadingIndicator/>)
  }

    return (
      <div> 
            <Card className="card text-white bg-dark mb-3 mt-3 me-3 ms-3" style={{ width: '18rem' }}>
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
                    <Button variant="success" href={`/shoplist/${shopItem.shopList}`}>Zurück zur ShopListe {shopItem.shopListStore}</Button>
                </Card.Body>
            </ Card>
        </div>)
    ;
  }