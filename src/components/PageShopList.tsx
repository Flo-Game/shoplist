import React from 'react';
import { useEffect, useState } from "react";
import { ShopItemResource, ShopListResource } from "../Resources";
import { getShopItems, getShopList } from "../backend/shopperapi";
import LoadingIndicator from "./LoadingIndicator";
import { useParams } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import ShopItem from "./ShopItem";
import ShopListDescription from "./ShopListDescription";

export default function PageShopList() {
  const shopListId = useParams().shoplistID!;
  const [shopList, setShopList] = useState<ShopListResource | null>(null);
  const [shopItems, setShopItems] = useState<ShopItemResource[]>([]);
  const { showBoundary } = useErrorBoundary();

  async function load() {
    try {
      const loadedShopList = await getShopList(shopListId);
      setShopList(loadedShopList);
      const loadedShopItems = await getShopItems(shopListId);
      setShopItems(loadedShopItems);
    } catch (err) {
      showBoundary(err);
    }
  }

  useEffect(() => {
    load();
  }, []);

  if (!shopItems) {
    return <LoadingIndicator />;
  } else {
    return (
      <div>
        <ShopListDescription
          key={shopList?.id}
          shopList={shopList!}
        ></ShopListDescription>

        <h4 className="ms-3">ShopItems:</h4>
        <div style={{ display: "flex" }} className="mr-3">
          {shopItems.map((element) => (
            <p key={element.id}>
              <ShopItem key={element.id} shopItem={element}></ShopItem>
            </p>
          ))}
        </div>
      </div>
    );
  }
}
