import React, { useEffect, useState } from 'react'
import './Register.scss'
import {  Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { registeruser } from '../../Features/user/userSlice'
import { loggedIn } from '../../Features/userInfo/userinfoSlice';
// import { RootState } from '../../Features/store';
import { pass } from '../../data/pass';
import { auth, db, storage } from '../../Firebase/Firebase';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { doc, serverTimestamp, setDoc } from '@firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import { teams, departments } from '../../utils/helper';
// import NfcsLogo2 from '../../assets/nfcsLogo2.svg'; 
import { InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import Navbar from '../../Components/Navbar/Navbar';
import { ClipLoader } from 'react-spinners';
import TopOfPage from '../../utils/topOfPage';

import { ID } from 'appwrite';
import { account, databases } from '../../AppWrite/Appwrite';
// @ts-ignore
import { v4 as uuidv4 } from 'uuid'


const Register = () => {

    const [percentage, setPercentage] = useState<null | number>(null)

    const [showPassword, setShowPassword] = useState(false);

    const [loading, setLoading] = useState(false);

    const [file, setFile] = useState<any>(null)

    const [password, setPassword] = useState("");

    const [formData, setFormData] = useState({
        name: "",
        department: "",
        team: "",
        birthday: "",
        email: "",
        // password: "", 
        telephone: "",
        teampass: ""
    })

    // TOASTIFY function
    function notify(message: string){
        toast.error(message);
    }
    
    // user boolean status
    // const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()

    // getting user info
    // const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

    // console.log(userInfo);

    const navigate = useNavigate()


    // HANDLE CHANGE IN THE INPUT ELEMENTS
    const handleChange = (e: any) => {
        const value = e.target.value;
        const name = e.target.name;

        setFormData({
            ...formData,
            [name]: value,
        })
    }

    // UPLOADING PIC TO FIREBASE STORAGE
    useEffect(() => {
        const uploadFile = () => {
          const name = new Date().getTime() + file.name; // date milliseconds is appended(prefixed) to image name
          console.log(name)
          const nameLength = name.length;
            //   console.log(typeof(name))
            const imageFormat = name.substr(nameLength - 3);
            console.log(imageFormat);
            // jpg, png, jpeg
            const acceptedFormats = ['png', 'jpg', 'jpeg']
            // if(imageFormat === 'mp4' || imageFormat === 'mp3' || imageFormat === 'psx'){
            if(imageFormat === 'mp4' || imageFormat === 'mp3' || imageFormat === 'psx' || imageFormat === 'ptx'){

                notify("Please enter a valid Image Format")
                return;
            }
            else{
                const storageRef = ref(storage, file.name); // if file has same name, it will override
          
                const uploadTask = uploadBytesResumable(storageRef, file);
        
              uploadTask.on('state_changed', 
                (snapshot) => {
                  // Observe state change events such as progress, pause, and resume
                  // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                  const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                  console.log('Upload is ' + progress + '% done');
                  setPercentage(progress)
                  switch (snapshot.state) {
                    case 'paused':
                      console.log('Upload is paused');
                      break;
                    case 'running':
                      console.log('Upload is running');
                      break;
                      default: 
                        break;
                  }
                }, 
                      (error) => {
                          // Handle unsuccessful uploads
                          console.log(error)
                      }, 
                  () => {
                  // Handle successful uploads on complete
                  // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                      getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                      console.log('File available at', downloadURL);
                      setFormData((prev) => ({
                          ...prev,
                          img: downloadURL
                      }))
                      });
                  }
                  );
                }
            
        }
        file && uploadFile();
    }, [file])

      // HANDLING FORM SUBMIT
    const handleSubmit = async (e: any) => {
        e.preventDefault();

        // SETTING THE LOADING STATE TO BE FALSE
        setLoading(true);
        
        // TEAMPASS  CHECK
        if(!pass.includes(formData.teampass.trim())){
            notify("Please enter a valid team pass")
            setLoading(false)
            return;
        }

        if(password.length < 8){
            notify("Please enter a password with 8 or more values");
            setLoading(false)
            return;
        }

        // TEAMPASS X TEAM CHECK
        if(!formData.teampass.includes(formData.team)){
            notify("Your team pass does not match your team")
            setLoading(false)
            return;
        }

        // EMAIL CHECK
        if(!formData.email.includes('student.oauife.edu.ng')){
            notify("This is not a valid email address")
            setLoading(false)
            return;
        }

        // FORM_DATA CHECK 
        if(formData.birthday === "" || 
           formData.department === "" || 
           formData.email === "" ||  
           formData.telephone === "" || 
           formData.team === "" || 
           formData.name === "" || 
           formData.teampass === "" || 
           password === "")
           {
            notify("Please check the form again and enter your details correctly");

            // SETTING THE LOADING STATE ON BUTTON TO FALSE
            setLoading(false);

            return;
        }
        else{
            // START IMAGE PROCESSING HERE => the file onChange={(e: any) => setFile(e.target.files[0])} => so this means you must have a file useState.
            console.log(formData)

            // const formattedFormData = {
            //     name: formData.name, 
            //     department: formData.department, 
            //     team: formData.team, 
            //     birthday: formData.birthday,
            //     email: formData.email,
            //     telephone: formData.telephone,
            //     teampass: formData.teampass.trim()
            // }

            // console.log(formattedFormData)
            
            // localStorage.setItem("formValues", JSON.stringify(formData))
            dispatch(registeruser())
            // dispatching values to the userInfo
            dispatch(loggedIn({
                name: formData.name,
                birthday: formData.birthday, 
                department: formData.department,
                email: formData.email,
                team: formData.team,
            }))

        }
        
        // FIREBASE OPERATIONS

        try{
            // REGISTERING USER WITH EMAIL AND PASSWORD

            // SETTING THE LOADING STATE TO FALSE
            setLoading(true);
            
            const registerUserFB = await createUserWithEmailAndPassword(auth, formData.email.trim(), password)
            // console.log(registerUserFB)
            // console.log(registerUserFB.user.emailVerified)

            // Sending Emails to users
            let message = `
            Hi SuperStar 😉
            ${formData.name}, 
            thank you for registering on this app. Do have a pleasant experience.
            `;

          // details for EmailJS
          let toSend = {
            name: formData.name,
            email: formData.email,
            message: message
          }

          // sending emails to users
          // @ts-ignore
        emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, toSend, process.env.REACT_APP_PUBLIC_KEY)
        // emailjs.send(emailServiceId, emailTemplateId, toSend, emailApi)
          .then((result) => {
            console.log(result.text)
          }, (error) => {
            console.log(error.text);
            return
          })
          
    
            // ADDING REGISTERED USER TO COLLECTION
            await setDoc(doc(db, "users", registerUserFB.user.uid ), { // cities => collection. // LA => Document Id    
                ...formData,
                timeStamp: serverTimestamp()
            });

            // // APPWRITE STUFF
            const promise = account.create(
                ID.unique(),
                formData.email.trim(),
                password, 
                formData.name
            )

            promise.then(
                function(response){
                    // console.log("Appwrite " + response);
                    databases.createDocument('64ceea379b69c1ef2b66', '64ceea8cc086f25e06da', uuidv4(), formData)
                },
                function(error){
                    // console.log("Appwrite" + error);
                }
            )

            // END OF APPWRITE STUFF

            navigate('/birthday');
        } catch(error: any){
            setLoading(false)
            notify(error.message);
            // alert(error)
            // navigate(-1);
        }
        
        // FIREBASE OPERATIONS ENDPOINT

    }

    // console.log(formData)

    // takes user to top of page
    TopOfPage();
  return (
    <React.Fragment>
        <Navbar 
            hideDrawer={true}
            hideLinks={true}
        />
        <div id="register">
            <div className="register__right">
                
                <h3>Create your NFCS Birthday reminder account</h3>
                <p>Already have an account? <Link to={'/login'} style={{textDecoration: "none", color: "#4318FF"}}> Log in</Link></p>

                <form  onSubmit={handleSubmit} className="register__rightForm">
                    <div>
                        <TextField 
                            className="register__input"
                            type="text"
                            label='Full name'
                            variant="outlined" 
                            name="name"
                            placeholder='Emore Ogheneyoma Lawrence'
                            required
                            value={formData.name}
                            onChange={handleChange}    
                        />
                    </div>

                    <div>
                        <InputLabel id="department-id">Department</InputLabel>
                        <Select
                            className='register__select'
                            labelId="department-id"
                            value={formData.department}
                            label="Department"
                            onChange={handleChange}
                            name="department"
                            required
                            placeholder="Department"
                        >
                            {departments.map(depart => (
                                <MenuItem key={depart.value} value={depart.value}>{depart.label}</MenuItem>
                            ))}
                            
                        </Select>
                    </div>

                    <div>
                    <InputLabel id="team-id">NFCS Team</InputLabel>
                        <Select
                            className='register__select'
                            labelId="team-id"
                            value={formData.team}
                            label="Team"
                            onChange={handleChange}
                            name="team"
                            required
                        >
                            {teams.map(team => (
                                <MenuItem key={team.value} value={team.value}>{team.label}</MenuItem>
                            ))}
                            
                        </Select>
                    </div>

                    <div>
                        <TextField 
                            className="register__input"
                            type="text"
                            label='Team Pass'
                            variant="outlined" 
                            name="teampass"
                            placeholder='5fd93ddGalilee'
                            required
                            value={formData.teampass}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <InputLabel>Date of birth 📆</InputLabel>
                        <TextField 
                            className="register__input"
                            type="date"
                            variant="outlined" 
                            name="birthday"
                            required
                            value={formData.birthday}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <div className='register__rightFormLabel'>
                            <label>Image</label>
                        </div>
                    
                        <TextField 
                            className="register__input"
                            type="file"
                            variant="outlined" 
                            name="image"
                            required
                            onChange={(e: any) => setFile(e.target.files[0])}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment position="end">
                                    <ImageIcon />
                                </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <div>
                        <TextField 
                            className="register__input"
                            type="number"
                            label='Phone Number'
                            variant="outlined" 
                            name="telephone"
                            placeholder='09039393939'
                            required
                            value={formData.telephone}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <TextField 
                            className="register__input"
                            type="text"
                            label='Student Email'
                            variant="outlined" 
                            name="email"
                            placeholder='olemore@student.oauife.edu.ng'
                            required
                            value={formData.email}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <TextField 
                            className="register__input"
                            type={showPassword ? "text" : "password"}
                            label='Password'
                            variant="outlined" 
                            name="password"
                            placeholder='password'
                            required
                            value={password}
                            onChange={(e: any) => setPassword(e.target.value)}
                            InputProps={{
                                endAdornment: (
                                <InputAdornment 
                                    position="end" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        cursor: "pointer"
                                    }}
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </InputAdornment>
                                ),
                            }}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={percentage !== null && percentage < 100} 
                        className="register__formButton"
                    >
                        {/* loading is FALSE by default */}
                        {loading ? (<ClipLoader color='white'/>) : 'Create Account'}
                    </button>
                </form>    

                <ToastContainer style={{ fontSize: "1rem" }}/>
            </div>
        </div>

    </React.Fragment>
  )
}

export default Register


