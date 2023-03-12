import React, { useEffect, useState } from 'react'
import './Register.scss'
import {  Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { registeruser } from '../../Features/user/userSlice'
import { loggedIn } from '../../Features/userInfo/userinfoSlice';
import { RootState } from '../../Features/store';
import { pass } from '../../data/pass';
import { auth, db, storage } from '../../Firebase/Firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from '@firebase/auth';
import { doc, serverTimestamp, setDoc } from '@firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from '@firebase/storage';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import emailjs from '@emailjs/browser';
import { teams, departments } from '../../utils/helper';
import NfcsLogo2 from '../../assets/nfcsLogo2.svg'; 
import { InputAdornment, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { emailApi, emailServiceId, emailTemplateId } from '../../Email/Email';


const Register = () => {

    const [percentage, setPercentage] = useState<null | number>(null)

    const [showpassword, setShowpassword] = useState(false);
    
    const [file, setFile] = useState<any>(null)

    const [formData, setFormData] = useState({
        name: "",
        department: "",
        // level: "none",
        team: "",
        birthday: "",
        // image: "",
        email: "",
        password: "", 
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
    const [showPassword, setShowPassword] = useState(false)


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
        
        // TEAMPASS  CHECK
        if(!pass.includes(formData.teampass)){
            // alert("Please enter a valid team pass")
            // toast.error("Please enter a valid team pass")
            notify("Please enter a valid team pass")
            return;
        }

        // TEAMPASS X TEAM CHECK
        if(!formData.teampass.includes(formData.team)){
            // alert("Your team pass does not match your team")
            // toast.error("Your team pass does not match your team")
            notify("Your team pass does not match your team")
            return;
        }

        // EMAIL CHECK
        if(!formData.email.includes('student.oauife.edu.ng')){
            // alert("This is not a valid email address")
            notify("This is not a valid email address")
            return;
        }

        // FORM_DATA CHECK 
        if(formData.birthday === "" || 
           formData.department === "" || 
           formData.email === "" ||  
           formData.password === "" || 
           formData.team === "" || 
           formData.name === "" || 
           formData.teampass === "" )
           {
            // alert("Please Check the form again and enter your details correctly.")
            // toast.error("Please check the form again and enter your details correctly")
            notify("Please check the form again and enter your details correctly")
            return;
        }
        else{
            // START IMAGE PROCESSING HERE => the file onChange={(e: any) => setFile(e.target.files[0])} => so this means you must have a file useState.
            console.log(formData)
            
            localStorage.setItem("formValues", JSON.stringify(formData))
            dispatch(registeruser())
            // dispatching values to the userInfo
            dispatch(loggedIn({
                name: formData.name,
                birthday: formData.birthday, 
                department: formData.department,
                email: formData.email,
                // image: formData.image, 
                team: formData.team,
                // level: formData.level,
            }))

        }
        
        // FIREBASE OPERATIONS

        try{
            // REGISTERING USER WITH EMAIL AND PASSWORD
            
            const registerUserFB = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            console.log(registerUserFB)

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
        emailjs.send(emailServiceId, emailTemplateId, toSend, emailApi)
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

            navigate('/app');

            await sendEmailVerification(registerUserFB.user) // verifying email
        } catch(error: any){
            notify(error.message);
            // alert(error)
            // navigate(-1);
        }
        
        // FIREBASE OPERATIONS ENDPOINT

    }

    // console.log(formData)
  return (
    <div id="register">
        <div className="register__left">
        </div>

        <div className="register__right">
            {/* <h1>Let's Get Started</h1> */}
            <div className="register__rightHeader">
                <img src={NfcsLogo2} alt="logo2" />
                <h3>NFCS OAU BIRTHDAY PLATFORM</h3>
            </div>

            <div className="register__createAccount">
                <h3>Create An Account</h3>
                <p>A Few Clicks From Making Your Day Fun And Memorable 🎂</p>
            </div>

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
                    <InputLabel id="team-id">Team</InputLabel>
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
                        <InputLabel>Birthday Date 📆</InputLabel>
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
                            value={formData.password}
                            onChange={handleChange}
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

                    <div>
                        <TextField 
                            className="register__input"
                            type="text"
                            label='Team Pass'
                            variant="outlined" 
                            name="teampass"
                            placeholder='Team Pass'
                            required
                            value={formData.teampass}
                            onChange={handleChange}
                        />
                    </div>

                    <button 
                        type="submit"
                        disabled={percentage !== null && percentage < 100} 
                        className="register__formButton"
                    >
                            Sign Up
                    </button>
                    <p className='register__formQuestion'>Have an account already? <Link to={'/login'}>Login</Link></p>

            </form>    

            <ToastContainer style={{ fontSize: "1rem" }}/>
        </div>
    </div>
  )
}

export default Register


