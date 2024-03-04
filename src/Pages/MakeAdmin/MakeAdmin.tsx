import { Link } from "react-router-dom";
import "./MakeAdmin.scss";
import { InputAdornment, TextField } from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { ClipLoader } from "react-spinners";
import useFetchUsersEmails from "../../hooks/useFetchEmails";
import { db } from "../../Firebase/Firebase";
import {
  query,
  where,
  updateDoc,
  doc,
  getDocs,
  collection,
} from "firebase/firestore";

const MakeAdmin = () => {
  const registeredEmails: string[] = useFetchUsersEmails();
  // console.log(registeredEmails);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const [email, setEmail] = useState("");
  const [adminPassword, setAdminPassword] = useState("");

  const checkPasswordAndMakeAdmin = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    console.table({
      Email: email,
      AdminPassword: adminPassword,
    });

    // check if the email Entered in form is registered
    if (registeredEmails.includes(email)) {
      setIsUserRegistered(true);
      console.log("Registered User 🚀");
    } else {
      console.log("User is NOT registered 😔");
      alert("Check the Student Email provided")
      setLoading(false);
      return;
    }

    // checking if the Admin Password entered is correct
    if (adminPassword !== process.env.REACT_APP_MY_ADMIN_CHECK_VALUE) {
      alert("Password is wrong");
      setLoading(false);
      return;
    }

    // Make Admin function
    async function makeAdmin(email: string) {
      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("email", "==", email));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doct) => {
          // Set the admin field to true
          const userRef = doc(usersRef, doct.id);
          updateDoc(userRef, {
            admin: true,
          })
            .then(() => {
              console.log("Document successfully updated!");
              setLoading(false)
              alert(`${email} has been made an Admin`)
              setEmail("");
              setAdminPassword("")
            })
            .catch((error) => {
              console.error("Error updating document: ", error);
              setLoading(false)
              alert(`Ooops, something went wrong`)
            });
        });
      } catch (error) {
        console.log("Error getting documents: ", error);
      }
    }

    // calling the Make Admin Function
    makeAdmin(email);
  };

  return (
    <div className="makeAdmin">
      <h1 className="makeAdmin__header">Grant Admin Privileges with Ease</h1>
      <p className="makeAdmin__question">
        "Ever had that 'Am I supposed to be here?' moment? Well, if you're here
        to grant admin privileges, you're definitely in the right place. Ready
        to make some power moves?
        {/* <Link
            to={"/register"}
            style={{ color: "#4318FF", textDecoration: "none" }}
            >
            create one here
            </Link> */}
      </p>

      <div className="makeAdmin__FormContainer">
        <form onSubmit={checkPasswordAndMakeAdmin} className="makeAdmin__Form">
          <div className="makeAdmin__formDiv">
            <TextField
              className="input-field"
              type="email"
              label="Student Email"
              variant="outlined"
              name="email"
              placeholder="olemore@student.oauife.edu.ng"
              required
              value={email}
              onChange={(e: any) => setEmail(e.target.value)}
            />
          </div>

          <div className="makeAdmin__formDiv">
            <TextField
              className="input-field"
              label="Admin Password"
              variant="outlined"
              name="password"
              type={showPassword ? "text" : "password"}
              value={adminPassword}
              required
              onChange={(e: any) => setAdminPassword(e.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment
                    position="end"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{
                      cursor: "pointer",
                    }}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </InputAdornment>
                ),
              }}
            />
          </div>

          <button className="makeAdmin__button">
            {loading ? <ClipLoader color="white" /> : "Make Admin"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default MakeAdmin;
