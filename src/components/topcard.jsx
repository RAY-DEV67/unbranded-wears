import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../config/firebase";
import {
  // getDoc,
  getDocs,
  collection,
  doc,
  addDoc,
  where,
  query,
  deleteDoc,
} from "firebase/firestore";
import { useState, useEffect, useContext } from "react";
import db from "../config/firebase";
import { useNavigate } from "react-router-dom";
import { SetAddCart, AddCart } from "../App";

export function TopCard(props) {
  const { post } = props;

    const setcart = useContext(SetAddCart);
    const cart = useContext(AddCart);
  

  const [saves, setsaves] = useState([]);
  const [loadingCart, setloadingCart] = useState(false);


  const [user] = useAuthState(auth);

  console.log(user)
  const navigate = useNavigate();

  const docRef = collection(db, "Cart");

  useEffect(() => {
    db.collection("Cart")
      .where("postId", "==", post?.id)
      .limit(10)
      .get()
      .then((collections) => {
        const cloths = collections.docs.map((cloths) => {
          return { userId: cloths.data().userId, saveId: cloths.id };
        });
        setsaves(cloths);
      });
  }, [post.id]);

  const hasProductBeenSaved = saves.find((save) => save.userId === user?.uid);

  const addCart = async () => {
    setloadingCart(true);
    try {
      const newDoc = await addDoc(docRef, {
        userId: user?.uid,
        email: user?.email,
        postId: post.id,
        images: post.images,
        images2: `${post.images2 ? post.images2 : ""}`,
        images3: `${post.images3 ? post.images3 : ""}`,
        images4: `${post.images4 ? post.images4 : ""}`,
        images5: `${post.images5 ? post.images5 : ""}`,
        title: post.title,
        price: post.price,
        description: post.description,
        category: post.category,
        color: `${post.color ? post.color : ""}`,
        color2: `${post.color2 ? post.color2 : ""}`,
        color3: `${post.color3 ? post.color3 : ""}`,
        color4: `${post.color4 ? post.color4 : ""}`,
        color5: `${post.color5 ? post.color5 : ""}`,
      });
      console.log("DocumentAdded");
      setcart(cart + 1);
      setloadingCart(false);
      if (user) {
        setsaves((prev) =>
          prev
            ? [...prev, { userId: user?.uid, likeId: newDoc.id }]
            : [{ userId: user?.uid, likeId: newDoc.id }]
        );
        console.log(saves);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const removeCart = async () => {
    setloadingCart(true);
    try {
      const CartToDeleteQuery = query(
        docRef,
        where("postId", "==", post?.id),
        where("userId", "==", user?.uid)
      );

      const CartToDeleteData = await getDocs(CartToDeleteQuery);
      const CartToDelete = doc(db, "Cart", CartToDeleteData?.docs[0].id);
      await deleteDoc(CartToDelete);
      console.log("DocumentDeleted");
      setcart(cart - 1);
      setloadingCart(false);
      if (user) {
        setsaves((prev) =>
          prev.filter((like) => like.saveId === CartToDeleteData?.docs[0].id)
        );
        console.log(saves);
      }
    } catch (err) {
      console.log(err);
    }
  };

 
  const formatCur = function (value, locale, currency) {
    return new Intl.NumberFormat(locale, {
      style: "currency",
      currency: currency,
    }).format(value);
  };

  return (
    <div className="topcard lg:w-[25vw] w-[42vw] border-y border-[#deab24] rounded-[10px]">
      <div className="relative">
        <img
          src={post.images}
          alt="Product"
          className="w-[44vw] h-[200px] bg-white object-contain rounded-[10px]"
          onClick={() => {
            // setProductsId(post.id);
            navigate(`/Buy/Products/${post.category}/${post.id}`);
            // setProducts("Top-Shoes");
          }}
        />
      </div>

      <div className="text-left mx-[0.5rem] mt-[0.5rem] flex justify-between">
        <h1>{post.title}</h1>
      </div>
      <div className="text-left mx-[0.5rem]">
        <h1 className="font-bold mt-[0.5rem]">
          {formatCur(post.price, "en-NG", "NGN")}
        </h1>
      </div>

      <div className="mx-[1rem] flex justify-center">
        <div
          className="p-[0.1rem] px-[1rem] rounded-sm mt-[1rem] mb-[0.5rem] bg-[#deab24]"
          onClick={() => {
            !user
              ? navigate("/Profile")
              : hasProductBeenSaved
              ? removeCart()
              : addCart();
          }}
        >
          {loadingCart ? (
            <div className="spinner-container px-[0.5rem] pt-[0.5rem] flex justify-center items-center">
              <div className="Cartloading-spinner"></div>
            </div>
          ) : (
            <p className="text-white text-sm">
              {hasProductBeenSaved ? "Added To Cart!!" : "Add To Cart "}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
