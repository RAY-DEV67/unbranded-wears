import { useState } from "react";
import db from "../config/firebase";
import { Search } from "../components/search";
import InfiniteScroll from "react-infinite-scroll-component";
// import { Footer } from "../components/footer";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { TopCard } from "../components/topcard";
import LoadingSpinner from "../components/spinner";

export function ProductsPage() {
  const { product } = useParams();
  const navigate = useNavigate();

  const [clothsList, setclothsList] = useState([]);
  const [lastDocuments, setlastDocuments] = useState(null);
  const [isEmpty, setisEmpty] = useState(false);
  const [hasmore, sethasmore] = useState(true);
  const [loading, setloading] = useState(false);
  const [empty, setempty] = useState(false);

  console.log(isEmpty);
  console.log(loading);

  // console.log(locationlist);

  useEffect(() => {
    setloading(true);
    setempty(false);
    db.collection("Products")
    .where("category", "==", "Fusion Bags")
    .where("AprilSales", "==", false)
      .get()
      .then((collections) => {
        const cloths = collections.docs.map((cloths) => {
          return { ...cloths.data(), id: cloths.id };
        });
        const lastDoc = collections.docs[collections.docs.length - 1];
        setclothsList(cloths);
        setlastDocuments(lastDoc);
        setloading(false);
        if (cloths.length === 0) {
          setempty(true);
        }
      });
  }, []);

  const fetchmore = () => {
    setempty(false);
    db.collection("Products")
      .where("category", "==", "Bags")
      .startAfter(lastDocuments)
      .limit(10)
      .get()
      .then((collections) => {
        const isCollectionEmpty = collections.size === 0;
        if (!isCollectionEmpty) {
          const newcloths = collections.docs.map((cloths) => {
            return { ...cloths.data(), id: cloths.id };
          });
          const lastDoc = collections.docs[collections.docs.length - 1];
          setclothsList((clothsList) => [...clothsList, ...newcloths]);
          setlastDocuments(lastDoc);
          // if(newcloths.length === 0){
          //   setempty(true)
          // }
        } else {
          setisEmpty(true);
          sethasmore(false);
        }
        // console.log(clothsList)
      });
  };

  console.log(clothsList.length)
 
  return (
    <div>
      <div className="lg:absolute lg:top-[13%] pt-[70px] lg:left-[35%] lg:z-[-1] lg:w-[60%]">
        <p className="mt-[rem] font-bold text-2xl text-center border-y border-[#282828] py-[1rem]">Unbranded Wears</p>
        <Search />

        {/* <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
          {loading ? (
            <img alt="Logo" className="loader mb-[-1rem]" src={logo1} />
          ) : (
            ""
          )}
        </p>

        <p className="w-[100%] text-center text-2xl">
          {empty ? "No Results Found!!" : ""}
        </p> */}

        <div className="mb-[5rem]">
          <InfiniteScroll
            dataLength={clothsList.length}
            hasMore={hasmore}
            loader={
              <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
                <LoadingSpinner />
              </p>
            }
            next={fetchmore}
            endMessage={
              <p style={{ textAlign: "center" }}>
                <b>Yay! You have seen it all</b>
              </p>
            }
            className="pb-[5rem] flex flex-wrap gap-3 justify-center"
          >
            {clothsList.map((post, index) => {
            return (
              <div
              key={index}
              className="max-w-4xl"
            >
                <TopCard post={post} />
              </div>
            );
          })}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
}
