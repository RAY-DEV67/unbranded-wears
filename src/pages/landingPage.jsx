// import Footer from "../components/footer";
import { Search } from "../components/search";
import { useState, useEffect } from "react";
import db from "../config/firebase";
import { TopCard } from "../components/topcard";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/spinner";
import bag2 from "../assets/bags2.webp";
import bag1 from "../assets/landingImage.webp";
import shoe1 from "../assets/shoe1.webp";
import shoe2 from "../assets/shoe2.webp";
import { Footer } from "../components/footer";

export function LandingPage() {
  const navigate = useNavigate();

  const [clothsList, setclothsList] = useState([]);
  const [shoelist, setshoelist] = useState([]);
  const [lastDocuments, setlastDocuments] = useState(null);
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");
  const [empty, setempty] = useState(false);
  const [empty2, setempty2] = useState(false);
  const [sales, setsales] = useState([]);
  const [emptysales, setemptysales] = useState(false);

  useEffect(() => {
    setloading(true);
    try {
      db.collection("Products")
        .limit(10)
        .where("category", "==", "Fusion Bags")
        .where("AprilSales", "==", false)
        .get()
        .then((collections) => {
          const cloths = collections.docs.map((cloths) => {
            return { ...cloths.data(), id: cloths.id };
          });
          // const lastDoc = collections.docs[collections.docs.length - 1];
          setclothsList(cloths);
          // setlastDocuments(lastDoc);
          // console.log(clothsList[0]?.phone);
          setloading(false);
          if (cloths.length === 0) {
            setempty(true);
          }
        });
    } catch (err) {
      seterror(err);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setloading(true);
    try {
      db.collection("Products")
        .limit(10)
        .where("AprilSales", "==", true)
        .get()
        .then((collections) => {
          const cloths = collections.docs.map((cloths) => {
            return { ...cloths.data(), id: cloths.id };
          });
          // const lastDoc = collections.docs[collections.docs.length - 1];
          setsales(cloths);
          // setlastDocuments(lastDoc);
          // console.log(clothsList[0]?.phone);
          setloading(false);
          if (cloths.length === 0) {
            setemptysales(true);
          }
        });
    } catch (err) {
      seterror(err);
      console.log(err);
    }
  }, []);

  useEffect(() => {
    setloading(true);
    try {
      db.collection("Products")
        .limit(10)
        .where("category", "==", "Fusion Shoes")
        // .where("AprilSales", "==", false)
        .get()
        .then((collections) => {
          const cloths = collections.docs.map((cloths) => {
            return { ...cloths.data(), id: cloths.id };
          });
          // const lastDoc = collections.docs[collections.docs.length - 1];
          setshoelist(cloths);
          // setlastDocuments(lastDoc);
          // console.log(clothsList[0]?.phone);
          setloading(false);
          if (cloths.length === 0) {
            setempty2(true);
          }
        });
    } catch (err) {
      seterror(err);
      console.log(err);
    }
  }, []);

  const images = [bag1, shoe1, bag2, shoe2];
  const [index, setindex] = useState(0);

  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setindex((index + 1) % images.length);
  //   }, 3000);

  //   return () => clearInterval(timer);
  // }, [index, images.length]);

  return (
    <div className="lg:absolute lg:left-[35%] lg:top-[12%] lg:w-[60%]">
      <div className="relative text-left border-b border-[#deab24] rounded-b-[20px] pt-[16%] lg:pt-[8%] lg:top-[25%]">
        <img
          src={images[index]}
          alt="Fusion Grandeur"
          className="h-[400px] w-[100%] object-cover animate-zoom-in-fade rounded-b-[20px]"
        />
        <div className="flex flex-col items-center justify-center w-[100vw] lg:w-[60vw] h-[88.5%] absolute top-[16%] mt-[-1.3rem] rounded-b-[20px] overLanding">
          <p className="mx-[1rem] text-3xl text-white headingFont text-center">No 1 HANDMADE BAGS AND SHOES BRAND</p>
          <p className="mx-[1rem] text-2xl mt-[2rem] text-white headingFont">
            BE ELEGANT <span className="text-[#deab24]">WEAR FUSION</span>
          </p>
          {/* <p className="mx-[1rem] text-4xl text-[#deab24] headingFont font-bold">
            WEAR FUSION
          </p> */}
        </div>
      </div>
      <Search />
      <div className="flex justify-between p-2 px-[1.5rem] mb-[1rem] text-white bg-[#deab24] font-bold rounded-[20px] heading">
        <h2>Anniversary Sales</h2>
        <p
          onClick={() => {
            navigate("/AprilSales");
          }}
        >
          See All
        </p>
      </div>

      <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
        {loading && <LoadingSpinner />}
      </p>
      <p className="w-[100%] text-center">
        {emptysales && <p className="text-2xl">Please Check Your Network Connection</p>}
      </p>

      <div className="flex lg:flex flex-wrap gap-3 justify-center mb-[1rem]">
        {sales.map((post, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                //   navigate(`/ThriftNg/Buy/${post.category}/${post.id}`);
              }}
              className="flex max-w-4xl"
            >
              <TopCard post={post} />
            </div>
          );
        })}
      </div>


      <div className="flex justify-between p-2 px-[1.5rem] mb-[1rem] text-white bg-[#deab24] font-bold rounded-[20px] heading">
        <h2>Fusion Bags</h2>
        <p
          onClick={() => {
            navigate("/All-Bags-Products");
          }}
        >
          See All
        </p>
      </div>

      <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
        {loading && <LoadingSpinner />}
      </p>
      <p className="w-[100%] text-center">
        {empty && "Please Check Your Network Connection"}
      </p>

      <div className="flex lg:flex flex-wrap gap-3 justify-center mb-[1rem]">
        {clothsList.map((post, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                //   navigate(`/ThriftNg/Buy/${post.category}/${post.id}`);
              }}
              className="flex max-w-4xl"
            >
              <TopCard post={post} />
            </div>
          );
        })}
      </div>

      <div className="flex font-bold justify-between p-2 px-[1.5rem] mb-[1rem] text-white bg-[#deab24] rounded-[20px]">
        <h2>Fusion Shoes</h2>
        <p
          onClick={() => {
            navigate("/All-Shoes-Products");
          }}
        >
          See All
        </p>
      </div>

      <p className="w-[100%] flex flex-col items-center my-[1rem] loaderContainer">
        {loading && <LoadingSpinner />}
      </p>
      <p className="w-[100%] text-center">
        {empty2 && "Please Check Your Network Connection"}
      </p>

      <div className="flex flex-wrap gap-3 justify-center mb-[1rem]">
        {shoelist.map((post, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                //   navigate(`/ThriftNg/Buy/${post.category}/${post.id}`);
              }}
              className=" flex max-w-4xl"
            >
              <TopCard post={post} />
            </div>
          );
        })}
      </div>

      <Footer />
    </div>
  );
}
