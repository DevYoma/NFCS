import { collection, doc, getDoc, getDocs } from "@firebase/firestore";
import { CSSProperties, useEffect, useState } from "react";
import { auth, db } from "../../Firebase/Firebase";
import "./Birthday.scss";
import PuffLoader from "react-spinners/PuffLoader";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Features/store";
import { useNavigate } from "react-router-dom";
import { registeruser } from "../../Features/user/userSlice";
import Navbar from "../../Components/Navbar/Navbar";
import { formatDate } from "../../utils/helper";
import {
  loggedIn,
  userBirthdayDetail,
} from "../../Features/userInfo/userinfoSlice";
import ConfettiExplosion from "react-confetti-explosion";
import Portal from "../../Components/Portal/Portal";

export type FbDataType = {
  id: string | number;
  name: string;
  team: string;
  level: string;
  email: string;
  department: string;
  birthday: string;
  admin?: boolean;
}[];

const Birthday = () => {
  //contains all REGISTERED USERS and TOTAL NUMBER
  const [data, setData] = useState<FbDataType>([]);
  // const [showConfetti, setShowConfetti] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState("");
  const teams = [
    {
      label: "All Teams",
      value: "",
    },
    {
      label: "Bethany",
      value: "bethany",
    },
    {
      label: "Capernaum",
      value: "capernaum",
    },
    {
      label: "Galilee",
      value: "galilee",
    },
    {
      label: "Jericho",
      value: "jericho",
    },
    {
      label: "Jordan",
      value: "jordan",
    },
    {
      label: "Nile",
      value: "nile",
    },
  ];

  // Firebase User Result
  const [fbUser, setFbUser] = useState<any>(null); // current user

  const user: boolean = useSelector((state: RootState) => state.user.user); // user boolean login status

  // @ts-ignore
  const userInfo = useSelector((state: RootState) => state.userInfo.userInfo);
  // @ts-ignore
  // console.log(userInfo);

  // console.log(user);

  // Admin Result 👇
  // console.log(fbUser?.userDataResult.admin);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const today = new Date();
  const formattedDate = formatDate(today);

  // USEEFFECT FOR GETTING ALL USER DATA FROM FB
  useEffect(() => {
    // dispatch(registeruser())

    // PREVENTING RE-ROUTING ON PAGE REFRESH
    window.addEventListener("popstate", (e) => {
      navigate(1);
    });

    const fetchData = async () => {
      let list: any = [];
      try {
        const querySnapshot = await getDocs(collection(db, "users"));
        querySnapshot.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() }); // spreading the data object in the list object.
          // doc.data() is never undefined for query doc snapshots
          // console.log(doc.id, " => ", doc.data());

          setData(list);
          // console.log(list)
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [navigate]);

  // USEEFEECT FOR PERSISTING USER AND USER DATA
  useEffect(() => {
    dispatch(registeruser());

    auth.onAuthStateChanged((authState) => {
      // console.log("User Id: " + authState?.uid);
      if (authState) {
        getDataFromId(authState?.uid);
      } else if (authState === null) {
        navigate("/");
      } else {
        navigate(-1); // PROTECTED ROUTE
      }
    });
  }, [dispatch, navigate]);

  // BIRTHDAY FILTER LOGIC
  const filterByDate = data.filter((list) => {
    return (
      parseInt(list.birthday.split("-")[2]) ===
        parseInt(today.getDate().toString()) &&
      parseInt(list.birthday.split("-")[1]) - 1 === today.getMonth()
    );
  });

  // BIRTHDAY FILTER LOGIC FOR NEXT DAY
  const upComingBirthday = data.filter((list) => {
    return (
      parseInt(list.birthday.split("-")[2]) ===
        parseInt((today.getDate() + 1).toString()) &&
      parseInt(list.birthday.split("-")[1]) - 1 === today.getMonth()
    );
  });

  // SPINNER
  const override: CSSProperties = {
    display: "block",
    margin: "0 auto",
    // borderColor: "red",
  };

  // making page go to current page on reload
  const goBackToPreviousPage = () => {
    window.addEventListener("load", (e) => {
      navigate(-1);
    });
  };

  // GETTING LOGGED IN USER DETAILS.
  const getDataFromId = async (id: number | string | any) => {
    // const docRef = doc(db, "users", "SF");
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);

    const userDataResult: any = await docSnap.data();

    // USERDATA LOGGED TO CONSOLE
    // console.log(userDataResult)
    setFbUser({
      ...fbUser,
      userDataResult,
    });

    return userDataResult;
  };

  // assigning the returned value from the function to apiResponse.
  const apiResponse = fbUser?.userDataResult;
  // console.log(data);

  // console.log(data);
  if (apiResponse) {
    dispatch(userBirthdayDetail(apiResponse));
  }

  // Extracting components from the date

  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, "0"); // Months are zero-based, so we add 1
  const day = today.getDate().toString().padStart(2, "0");

  const formattedMonthAndDate = `${month}-${day}`;

  // console.log(apiResponse?.birthday);
  let showConfetti = false;
  let birthdayCelebrant = false;

  if (formattedMonthAndDate === apiResponse?.birthday.slice(5)) {
    console.log("today is your birthday");
    showConfetti = true;
    birthdayCelebrant = true;
  }

  return (
    <>
      {user && (
        <>
          <section id="birthdayPage">
            {showConfetti && (
              <ConfettiExplosion
                particleCount={300}
                force={0.8}
                duration={6000}
                width={4000}
              />
            )}
            <Navbar isLoggedIn={true} isAdmin={fbUser?.userDataResult.admin} />
            <div className="birthdayPage__main">
              {/* Need to design the Portal 👇 */}
              {/* {birthdayCelebrant && <Portal />} */}
              <div className="birthdayPage__header">
                <div className="birthdayPage__headerDetails">
                  <h1>Hi {apiResponse?.name}</h1>
                  <p>welcome</p>
                </div>

                {/* SEARCH FUNCTIONALITY */}
              </div>

              <select
                className="birthdayPage__select"
                style={{
                  padding: "3px",
                }}
                value={selectedTeam}
                required
                onChange={(e: any) => setSelectedTeam(e.target.value)}
                name="team"
              >
                {teams.map((team) => (
                  <option key={team.value} value={team.value}>
                    {team.label}
                  </option>
                ))}
              </select>

              <div className="birthdayPage__today">
                <p>{formattedDate}</p>

                {filterByDate.length === 0 ? (
                  <p>No Celebrant(s) today</p>
                ) : (
                  <p>{filterByDate.length} Celebrant(s) 🥳</p>
                )}
              </div>

              {/* FILTERED BIRTHDAY CELEBRANTS */}
              {data.length !== 0 ? (
                <section className="birthdayCard__container">
                  {filterByDate
                    .filter((value: any) => {
                      if (selectedTeam === "") {
                        // console.log(value);
                        return value;
                      } else if (value?.team === selectedTeam) {
                        // console.log(value);
                        return value;
                      }
                    })
                    .map((data: any) => (
                      <div
                        className={`birthdayCard ${data.team}`}
                        key={data.id}
                      >
                        <div className="birthdayCard__header">
                          <img
                            src={data.img}
                            alt="userImg"
                            className="birthdaycard__userImage"
                          />
                          <p className="birthdayCard__headerName">
                            {data.name}
                          </p>
                        </div>

                        <div className="birthdayCard__body">
                          <p className="birthdayCard__bodyText">
                            It's{" "}
                            {data.name.split(" ")[1]
                              ? data.name.split(" ")[1]
                              : data.name.split(" ")[0]}{" "}
                            birthday today 🎂
                          </p>
                        </div>
                      </div>
                    ))}
                </section>
              ) : (
                <PuffLoader
                  color="#0A55E4"
                  loading={true}
                  cssOverride={override}
                  size={100}
                />
              )}

              {/* <p className={filterByDate.length === 0 ? 'birthdayPage__show' : 'birthdayPage__empty'}>No Birthday celebrant today, check back tomorrow</p> */}
            </div>
          </section>
        </>
      )}

      {!user && goBackToPreviousPage()}
    </>
  );
};

export default Birthday;
