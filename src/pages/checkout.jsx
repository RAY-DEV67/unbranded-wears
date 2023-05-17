import { Profile } from "./profile";
import { auth } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState, useEffect, useContext } from "react";
import db from "../config/firebase";
import React, { useRef } from "react";
import emailjs from "@emailjs/browser";
import LoadingSpinner from "../components/spinner";
import { storage } from "../config/firebase";
import { useNavigate, useParams } from "react-router-dom";
import { ProductsCard } from "../components/productsCard";
import { SetProductname, Productname, Productcolor } from "../App";

export function CheckOut() {
  const [user] = useAuthState(auth);
  const [image, setimage] = useState("");
  const [isfile, setfile1] = useState("");
  const navigate = useNavigate();

  const setproduct = useContext(SetProductname);
  const product = useContext(Productname);
  const color = useContext(Productcolor);

  // console.log(saved.title)

  const [saved, setsaved] = useState([]);
  const [loading, setloading] = useState(false);
  const [price, setprice] = useState([]);
  const [west, setwest] = useState(0);
  const [other, setother] = useState(0);
  const [productOrder, setproductOrder] = useState("");
  const [errors, seterrors] = useState("");
const [sum, setsum] = useState(0);
const [productlink, setproductlink] = useState([]);
const [color1, setcolor1] = useState();
const [color2, setcolor2] = useState("");
const [color3, setcolor3] = useState("");
const [color4, setcolor4] = useState("");
const [color5, setcolor5] = useState("");
const [color6, setcolor6] = useState("");
const [color7, setcolor7] = useState("");
const [color8, setcolor8] = useState("");
const [color9, setcolor9] = useState("");
const [color10, setcolor10] = useState("");
// const [title, settitle] = useState(`${saved[0].title}`);




  const { id } = useParams();
  

  useEffect(() => {
    setloading(true);
    db.collection("Cart")
    .where("userId", "==", id)
      .get()
      .then((collections) => {
        const cloths = collections.docs.map((cloths) => {
          return { ...cloths.data(), id: cloths.id };
        });
        const prices = collections.docs.map((cloths) => {
          console.log(cloths.data().price);
          return cloths.data().price;
        });
        const productName = collections.docs.map((cloths) => {
          return cloths.data().title;
        });
        const productLink = collections.docs.map((cloths) => {
          return "fusiongrandeur.com.ng/Buy/Products/" + cloths.data().category.replace(/\s/g, "") + "/" + cloths.data().postId;
        });
        setsaved(cloths);
        setprice(prices);
        setproduct(productName)
        setproductOrder(productName?.join(" , "))
        setproductlink( productLink)
        setTimeout(() => {
          setloading(false);
        }, 1000);
      });
  }, []);

  console.log(productlink)

  // console.log(product);

  const [ifedelivery, setifedelivery] = useState(0);
  const [abujadelivery, setabujadelivery] = useState(0);

  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency: currency,
    }).format(value);
  };

  useEffect(() => {
    const westDelivery = 2600
  setwest(formatCur(westDelivery, 'en-NG' , "NGN"))

  const otherDelivery = 3000
  setother(formatCur(otherDelivery, 'en-NG' , "NGN"))

  const ifeDelivery = 500
  setifedelivery(formatCur(ifeDelivery, 'en-NG' , "NGN"))

  const abujaDelivery = 1000
  setabujadelivery(formatCur(abujaDelivery, 'en-NG' , "NGN"))
  }, []);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < price.length; i++) {
      sum += price[i];
    }
    return setsum(sum);
  }, [price]);
  



  const [name, setname] = useState("");
  const [street, setstreet] = useState("");
  const [town, settown] = useState("");
  const [state, setstate] = useState("");
  const [number, setnumber] = useState("");

    const validateForm = () => {
    let tempErrors = {};
    if (!isfile) {
      tempErrors.file1 = "Please add a Proof of Payment";
    }
    if (!image) {
      tempErrors.image = "Please click upload";
    }
    if (!name) {
      tempErrors.name = "Please add your Name";
    }
    if (!street) {
      tempErrors.street = "Please add your Street Address";
    }
    if (!town) {
      tempErrors.town = "Please add your Town/City";
    }
    if (!state) {
      tempErrors.state = "Please add state";
    }
    if (!number) {
      tempErrors.phone = "Please input your Phone Number ";
    }
    seterrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

const [order, setorder] = useState("Place Order");

  const form = useRef();
  const sendEmail = (e) => {
    e.preventDefault();
    if(validateForm()){
      setorder("Sending Order...")
      emailjs
    .sendForm(
      "service_dtrv7eq",
      "template_18is4ge",
      form.current,
      "0fs2UJE4_uP27Mjo7"
    )
    .then(
      (result) => {
        console.log(result.text);
        navigate("/Successful");
        console.log("message sent")
        setorder("Place Order")
      },
      (error) => {
        console.log(error.text);
      }
    );
    }else{setorder("Error, Check Form!");}
  };

  const upload = async () => {
    if (isfile == null) return;
    storage
      .ref("/images/" + isfile.name)
      .put(isfile)
      .on("state_changed", alert("success"), alert, () => {
        storage
          .ref("images")
          .child(isfile.name)
          .getDownloadURL()
          .then((imgUrl) => {
            setimage(imgUrl)
          });
      });
  };


  return (
    <div className="pt-[90px] lg:absolute lg:left-[35%] lg:top-[12%] lg:w-[60%]">
      {user ? (
        <div>
         <p className="text-center pt-[1rem] text-2xl">Check-Out</p>
          <div className="flex flex-col items-center justify-center w-[100%] mb-[1rem]">
          </div>

          <div className="flex flex-col items-center">
            <div className="form w-[95%] mb-[1rem]">
              <p className="text-left ml-[1rem] mt-[1rem]">Your Order</p>
              <div className="mb-[1rem]">
                <div className="flex flex-wrap gap-3 justify-center">
                  <p className="w-[100%] flex flex-col items-center loaderContainer">
                    {loading ? <LoadingSpinner/> : ""}
                  </p>
                  {saved?.map((post, index) => {
                    if (post.userId === user.uid) {
                      return (
                        <div
                          key={index}
                          onClick={() => {
                            // setProductsId(post.id);
                            // setProducts("Top-Accessories");
                            // navigate(`/Buy/${post.category}/${post.id}`);
                          }}
                          className="sm:w-[85vw] lg:w-[95%] max-w-4xl"
                        >
                          <ProductsCard post={post} />
                         
                        </div>
                      
                      )
                    }
                    return "";
                  })}
                </div>
              </div>
              <div className="border-y py-[1rem] mx-[1rem]">
                <p className="mb-[1rem] text-[#deab24]">Note: No Park Delivery</p>
              <div className="flex justify-between">
                <p>Delivery Fees</p>
                <p>{west} (Western States)</p>
              </div>
              <p className="text-end mt-[0.5rem]">{other} (Southern, Eastern and Northern States)</p>
              <p className="text-end mt-[0.5rem]">{abujadelivery} (Sabo and its environs)</p>
              <p className="text-end mt-[0.5rem]">{ifedelivery} (Within Ife)</p>
              </div>
              <div className="flex justify-between mx-[1rem] mt-[1.5rem] border-t py-[1rem]">
                <p>SUBTOTAL (Western States)</p>
                <p>{formatCur(sum + 2600, 'en-NG' , "NGN")}</p>
              </div>
              <div className="flex justify-between mx-[1rem] border-y py-[1rem]">
                <p>SUBTOTAL (Southern, Eastern and Northern States)</p>
                <p>{formatCur(sum + 3000, 'en-NG' , "NGN")}</p>
              </div>
              <div className="flex justify-between mx-[1rem] border-y py-[1rem]">
                <p>SUBTOTAL (Sabo and its environs)</p>
                <p>{formatCur(sum + 1500, 'en-NG' , "NGN")}</p>
              </div>
              <div className="flex justify-between mx-[1rem] border-y py-[1rem]">
                <p>SUBTOTAL (Within Ife)</p>
                <p>{formatCur(sum + 500, 'en-NG' , "NGN")}</p>
              </div>
            </div>
          </div>

          <div className="my-[2rem] mx-[1rem]">
            <p className="text-left text-2xl">Payment Method</p>
            <div className="border-[#282828] border my-[1rem] p-[1rem] text-left">
              <p className="text-center text-xl mb-[0.5rem]">Direct bank transfer</p>
              <p>Make your payment directly into our bank account</p>
              <p>Account Number: 7358333128</p>
              <p>Bank Name: WEMA BANK</p>
              <p>Account Name: FUSION GRANDEUR ENTERPRISES</p>
              <div className="mt-[1rem]">
                <h2 className="text-center text-2xl">Add photo</h2>
                <p className="text-[12px] mt-[1rem]">
                  Add a screenshot or picture of proof of payment
                </p>
                <div className="flex flex-col">
                  <div>
                    <input
                      className="mt-[1rem]"
                      multiple
                      type="file"
                      accept="image/png , image/jpg"
                      name="Image"
                      onChange={(event) => {
                        setfile1(event.target.files[0]);
                      }}
                    />
                  </div>
                  {errors.file1 && <p className="error">{errors.file1}</p>}
                </div>
              </div> 

              <button onClick={upload}  className="text-[#f8b857] rounded-[20px] bg-[#282828] font-bold w-[30%] mt-[2rem] py-[0.5rem] px-[1rem]">Upload</button>
              {errors.image && <p className="error">{errors.image}</p>}
            </div>
          </div>


          <div className="flex flex-col items-center">
            <p className="text-2xl">Shipping Details</p>

<form ref={form} onSubmit={sendEmail} className="w-[90%] border-[#282828] border my-[1rem] flex flex-col px-[1rem] pb-[1rem]">
      <label className="text-left mt-[0.5rem]">Name</label>
      <input onChange={(e) => {
setname(e.target.value)
      }} type="text" name="user_name" className="border-[#282828] border py-[0.5rem] rounded-[10px] px-[1rem]" />
     {errors.name && <p className="error">{errors.name}</p>}
      <label className="text-left mt-[0.5rem]">Street Address</label>
      <input onChange={(e) => {
setstreet(e.target.value)
      }}  type="text" name="Street" className="border-[#282828] border py-[0.5rem] rounded-[10px] px-[1rem]"/>
      {errors.street && <p className="error">{errors.street}</p>}
      <label className="text-left mt-[0.5rem]">Town / City</label>
      <input
      onChange={(e) => {
        settown(e.target.value)
              }} 
                className="py-[0.5rem] rounded-[10px] px-[1rem] border-[#282828] border"
                type="text"
                name="Town"
              />
              {errors.town && <p className="error">{errors.town}</p>}
              <label className="text-left mt-[0.5rem]">State</label>
      <input
      onChange={(e) => {
        setstate(e.target.value)
              }} 
                className="py-[0.5rem] rounded-[10px] px-[1rem] border border-[#282828]"
                type="text"
                name="State"
              />
                 {errors.state && <p className="error">{errors.state}</p>}
                 <label className="text-left mt-[0.5rem]">Phone Number</label>
      <input
      onChange={(e) => {
        setnumber(e.target.value)
              }} 
                className="py-[0.5rem] rounded-[10px] px-[1rem] border border-[#282828]"
                type="text"
                name="Phone"
              />
              {errors.phone && <p className="error">{errors.phone}</p>}
      <label className="text-left mt-[0.5rem]">Order Message ( color and quantity )</label>
      <textarea name="message" className="border-[#282828] border rounded-[10px]" />
     
      <label className="text-left mt-[0.5rem] opacity-0">Payment Picture</label>
      <input
                     className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      type="text"
                      name="Image"
                     value={image}
                    />

<label className="text-left mt-[0.5rem] opacity-0">Email</label>
      <input
                     className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      type="text"
                      name="email"
                     value={user?.email}
                    />

{saved ? <div>
  <label className="text-left mt-[0.5rem] opacity-0">Product 1</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      multiple
                      type="text"
                      name="Product1"
                     value={`${product[0]} - ${productlink[0]}`}
                    />
</div> : ""}

{saved[1] ? <div>
  <label className="text-left mt-[0.5rem] opacity-0">Product 2</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      multiple
                      type="text"
                      name="Product2"
                     value={`${product[1]} - ${color2} - ${productlink[1]}`}
                    />
</div> : ""}

{saved[2] ? <div>
  <label className="text-left mt-[0.5rem] opacity-0">Product 3</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] border px-[1rem]"
                      multiple
                      type="text"
                      name="Product3"
                     value={`${product[2]} - ${color3} - ${productlink[2]}`}
                    />
</div> : ""}

{saved[3] ? <div>
  <label className="text-left mt-[0.5rem] opacity-0">Product 4</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      multiple
                      type="text"
                      name="Product4"
                     value={`${product[3]} - ${color4} - ${productlink[3]}`}
                    />
</div> : ""}

{saved[4] ? <div>
  <label className="text-left mt-[0.5rem] opacity-0">Product 5</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      multiple
                      type="text"
                      name="Product5"
                     value={`${product[4]} - ${color5} - ${productlink[4]}`}
                    />
</div> : ""}

{saved[5] ? <div>
  <label className="text-left mt-[0.5rem] opacity-0">Product 6</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      multiple
                      type="text"
                      name="Product6"
                     value={`${product[5]} - ${color6} - ${productlink[5]}`}
                    />
</div> : ""}

{saved[6] ? <div>
  <label className="text-left mt-[0.5rem] opacity-0">Product 7</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      multiple
                      type="text"
                      name="Product7"
                     value={`${product[6]} - ${color7} - ${productlink[6]}`}
                    />
</div> : ""}

{saved[7] ? <div>
  <label className="text-left mt-[0.5rem] opacity-0">Product 8</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      multiple
                      type="text"
                      name="Product8"
                     value={`${product[7]} - ${color8} - ${productlink[7]}`}
                    />
</div> : ""}

{saved[8] ? <div>
  <label className="text-left mt-[0.5rem] opacity-0">Product 9</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      multiple
                      type="text"
                      name="Product9"
                     value={`${product[8]} - ${color9} - ${productlink[8]}`}
                    />
</div> : ""}

{saved[9] ? <div>
  <label className="text-left mt-[0.5rem] opacity-0">Product 10</label>
                    <input
                      className="py-[0.5rem] opacity-0 rounded-[10px] px-[1rem]"
                      multiple
                      type="text"
                      name="Product10"
                     value={`${product[9]} - ${color10} - ${productlink[9]}`}
                    />
</div> : ""}

    <div>
    <input type="submit" value={order} className="text-[#f8b857] rounded-[20px] bg-[#282828] font-bold w-[50%] mt-[2rem] py-[0.5rem] px-[1rem]" />
    
        </div>
        </form>
          </div>
        </div>
      ) : (
        <Profile />
      )}
    </div>
  );
}
