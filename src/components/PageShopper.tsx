import React from 'react';
import { useEffect, useState } from "react";
import { useErrorBoundary } from "react-error-boundary";
import { ShopperResource } from "../Resources";
import LoadingIndicator from "./LoadingIndicator";
import { getShopper } from "../backend/shopperapi";
import ShopListDescription from "./ShopListDescription";


export default function PageShopper() {
 
  const [shopper, setShopper] = useState<ShopperResource>();
  const { showBoundary } = useErrorBoundary();

  async function load() {
    try {
      const c = await getShopper();
      setShopper(c);
    } catch (err) {
      showBoundary(err);
    }
  }

  useEffect(() => {
    load()
  }, []);

  if(!shopper){
    return <LoadingIndicator />
  }else{
    return(
      <div>
        <h1 className="ms-3 mt-3">Shopper:</h1>
          <div style={{display: "flex"}} className="mr-3">
            {
            shopper.shopLists.map(coll =>
                <p key={coll.id}> 
                  <ShopListDescription key={coll.id} shopList={coll}></ShopListDescription>
                </p>
              )
            }
          </div>
      </div>
    );
  }
}
