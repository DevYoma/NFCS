import Footer from "../../Components/Footer/Footer";
import Navbar from "../../Components/Navbar/Navbar";
import useFetchUserDetail from "../../hooks/useFetchUserDetail";
import "./UserDetails.scss";
import { useParams } from "react-router-dom";
import UserDetailImg from "../../assets/userDetail.png";
import UserDetailBox from "../../Components/UserDetailBox/UserDetailBox";
import { formatBirthday } from "../../utils/helper";
import useFetchedLoggedInUser from "../../hooks/useFetchLoggedInUser";
import { useEffect, useState } from "react";
import { auth } from "../../Firebase/Firebase";

const UserDetails = () => {
  const { id } = useParams();
  const { user, error, loading } = useFetchUserDetail(id);

  // GETTING LOGGED IN USER DETAILS.
  const [loggedInUserId, setLoggedInUserId] = useState("")

  const { userData } = useFetchedLoggedInUser(loggedInUserId);
  // console.log(userData)

  useEffect(() => {
      auth.onAuthStateChanged((authState) => {
      // console.log("User Id: " + authState?.uid);
      if (authState) {
        // getDataFromId(authState?.uid);
        setLoggedInUserId(authState?.uid);
      }
    });
  }, [])
  
  if (loading) {
  return <p>Loading...</p>;
  }

  if (error) {
  return <p>Error: {error}</p>;
  }

  return (
    <div className="userDetailsPage">
      <Navbar isLoggedIn={true} isAdmin={userData?.admin}/>

      <div className="userDetailsPage__main">
        <img src={user?.img} alt={user?.name} />

        <div className="userDetailsPage__mainInfo">
          <UserDetailBox label="Full name" detail={user?.name} />
          <UserDetailBox label="Birthday" detail={formatBirthday(user?.birthday)} />
          <UserDetailBox
            label="Department"
            detail={user?.department}
          />
          <UserDetailBox label="Email" detail={user?.email} />
          <UserDetailBox label="Team" detail={user?.team} />
          <UserDetailBox label="Telephone" detail={user?.telephone} />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default UserDetails;
