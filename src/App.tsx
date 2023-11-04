import { Route, Routes} from "react-router-dom";
import PageShopper from "./components/PageShopper";
import PageShopList from "./components/PageShopList";
import PageShopItem from "./components/PageShopItem";
import PageAdmin from "./components/PageAdmin";
import PagePrefs from "./components/PagePrefs";
import Header from "./components/Header";
import React from "react";
import { LoginContext } from "./LoginContext";
import PageUsermanagment from "./components/PageUsermanagment";
import { getLoginInfoFromJWT, retrieveJWT } from "./JWTManager";

function App() {
  const jwt = retrieveJWT();
  const [loginInfo, setLoginInfo] = React.useState(getLoginInfoFromJWT(jwt));
  return ( 
    <div>
      <LoginContext.Provider value={{loginInfo, setLoginInfo}}>
        <Header />
          <Routes>
            <Route path="*" element={<PageShopper />}/>
            <Route path="/shopper" element={<PageShopper />}/>
            <Route path="/shoplist/:shoplistID" element={<PageShopList />}/>
            <Route path="/shopitem/:shopitemID" element={<PageShopItem />}/>
            <Route path="/admin" element={<PageAdmin />}/>
            <Route path="/prefs" element={<PagePrefs />}/>
            <Route path="/userManagment" element={<PageUsermanagment />}/>
          </Routes>
      </LoginContext.Provider>
    </div>
  );
}

export default App;
