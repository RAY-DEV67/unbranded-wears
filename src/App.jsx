import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./components/navbar";
import { ScrollToTop } from "./components/scrolltotop";
import { useState } from "react";
import React from "react";
import { LandingPage } from "./pages/landingPage";
import { AddProduct } from "./components/sell";
import { ProductsPage } from "./pages/BagsPage";
import { Profile } from "./pages/profile";
import { Cart } from "./pages/cart";
import { BuyProduct } from "./pages/buyproduct";
import { CheckOut } from "./pages/checkout";
import { Search } from "./components/search";
import { SearchResult } from "./pages/searchresults";
import { Success } from "./pages/success";
import { Page404 } from "./pages/404page";

export const ShowCart = React.createContext();
export const SetShowCart = React.createContext();
export const SetLoadCart = React.createContext();
export const LoadCart = React.createContext();
export const AddCart = React.createContext();
export const SetAddCart = React.createContext();
export const SetSaved = React.createContext();
export const Saved = React.createContext();
export const Productname = React.createContext();
export const SetProductname = React.createContext();
export const Productcolor = React.createContext();
export const SetProductcolor = React.createContext();


function App() {
  const [loadCart, setloadCart] = useState(false);
  const [showcart, setshowcart] = useState(false);
  const [cart, setcart] = useState(0);
  const [saved, setsaved] = useState([]);
  const [product, setproduct] = useState([]);
  const [productcolor, setproductcolor] = useState();

  console.log(productcolor)

  return (
    <div className="App bodyFont bg-[#f8b857]">
   <ShowCart.Provider value={showcart}>
        <SetShowCart.Provider value={setshowcart}>
          <SetLoadCart.Provider value={setloadCart}>
            <LoadCart.Provider value={loadCart}>
              <SetAddCart.Provider value={setcart}>
                <AddCart.Provider value={cart}>
                  <SetSaved.Provider value={setsaved}>
                    <Saved.Provider value={saved}>
                      <Productname.Provider value={product}>
                        <SetProductname.Provider value={setproduct}>
                          <SetProductcolor.Provider value={setproductcolor}>
                            <Productcolor.Provider value={productcolor}>
                  <Router>
                    <ScrollToTop>
                      <Navbar />

                      <Routes>
                        <Route path="/" element={<LandingPage />} />
                        <Route path="/Product" element={<AddProduct />} />
                        <Route
                          path="/All-Bags-Products"
                          element={<ProductsPage />}
                        />
                        <Route path="/Profile" element={<Profile />} />
                        <Route path="/Cart/:id" element={<Cart />} />
                        <Route
                      path="/Buy/:collections/:product/:id"
                      element={<BuyProduct />}
                    />
                     <Route
                    path="/Search/:search"
                    element={<SearchResult />}
                  />
                    <Route path="/Checkout/:id" element={<CheckOut />} />
                    <Route path="/Successful" element={<Success />} />
                    <Route
                    path="/*"
                    element={<Page404 />}
                  />
                      </Routes>
                    </ScrollToTop>
                  </Router>
                  </Productcolor.Provider>
                  </SetProductcolor.Provider>
                  </SetProductname.Provider>
                  </Productname.Provider>
                  </Saved.Provider>
                  </SetSaved.Provider>
                </AddCart.Provider>
              </SetAddCart.Provider>
            </LoadCart.Provider>
          </SetLoadCart.Provider>
        </SetShowCart.Provider>
      </ShowCart.Provider>
</div>
  );
}

export default App;
