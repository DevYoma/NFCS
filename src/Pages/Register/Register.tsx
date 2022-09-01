import React, { useEffect, useState } from 'react'
import './Register.scss'
import {  Link, Navigate, useNavigate } from 'react-router-dom';
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
import Logo from '../../Atoms/Logo/Logo';


const Register = () => {

    const [percentage, setPercentage] = useState<null | number>(null)
    
    const [file, setFile] = useState<any>(null)

    const [formData, setFormData] = useState({
        name: "",
        department: "",
        level: "none",
        team: "select team",
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
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()

    // getting user info
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

    // console.log(userInfo);

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

    // LEVELS.
    const options = [
        {
            label: "Prefer not to say",
            value: "none"
        },
        {
          label: "100 Level",
          value: "part1",
        },
        {
          label: "200 Level",
          value: "part2",
        },
        {
          label: "300 Level",
          value: "part3",
        },
        {
          label: "400 Level",
          value: "part4",
        },
        {
            label: "500 Level",
            value: "part5",
          },
      ];

      // NFCS TEAMS
    const teams = [
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
            value: "galilee"
        },
        {
            label: "Jericho",
            value: "jericho"
        },
        {
            label: "Jordan",
            value: "jordan"
        },
        {
            label: "Nile",
            value: "nile"
        },
    ]

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
        //    formData.image === "" ||
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
                level: formData.level,
            }))

        }

        
        // FIREBASE OPERATIONS

        try{
            // REGISTERING USER WITH EMAIL AND PASSWORD
            
            const registerUserFB = await createUserWithEmailAndPassword(auth, formData.email, formData.password)
            console.log(registerUserFB)

            navigate('/home')
    
            // ADDING REGISTERED USER TO COLLECTION
            await setDoc(doc(db, "users", registerUserFB.user.uid ), { // cities => collection. // LA => Document Id
                ...formData,
                timeStamp: serverTimestamp()
            });
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
            <div>
                <h3>Welcome To <Logo logoStyle={{ display: "inline", marginTop: "15px", marginLeft: "10px"}}/></h3>

                <p className="register__leftText">
                    <div>A few clicks from making your</div>
                    <div>day Fun and Memorable 🎂</div>
                </p>
            </div>
        </div>

        <div className="register__right">
            <h1>Let's Get Started</h1>

            <form  onSubmit={handleSubmit} className="register__rightForm">
                <div className="register__row">
                    <div>
                        <div className='register__rightFormLabel'>
                            <label>Name</label>
                        </div>
                        <input 
                            type="text" 
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="Full Name"
                            name="name"
                        />
                    </div>
                    <div>
                        <div className='register__rightFormLabel'>
                            <label>Department</label></div>
                        <input 
                            type="text" 
                            required
                            value={formData.department}
                            onChange={handleChange}
                            placeholder="Department"
                            name="department"
                        />
                    </div>

                </div>

                <div className="register__row">
                    <div>
                        <div className='register__rightFormLabel'>
                            <label>Level</label></div>
                        <select 
                            value={formData.level}   
                            // required
                            onChange={handleChange}
                            name="level"
                        >
                        {options.map(option => (
                                <option key={option.value} value={option.value}>{option.label}</option>
                        ))}
                        </select>
                    </div>

                    <div>
                        <div className='register__rightFormLabel'>
                            <label>Team</label>
                        </div>
                        <select 
                            value={formData.team}   
                            required
                            onChange={handleChange}
                            name="team"
                        >
                        {teams.map(team => (
                                <option key={team.value} value={team.value}>{team.label}</option>
                        ))}
                        </select>
                    </div>

                </div>

                <div className="register__row">
                    <div>
                        <div className='register__rightFormLabel'>
                            <label>Birthday</label>
                        </div>
                        <input 
                            type="date" 
                            required
                            value={formData.birthday}
                            onChange={handleChange}
                            name="birthday"
                        />
                    </div>

                    <div>
                        <div className='register__rightFormLabel'>
                            <label>Image</label>
                        </div>
                        <input 
                            type="file" 
                            required
                            // value={formData.image}
                            onChange={(e: any) => setFile(e.target.files[0])}
                            name="image"
                        />
                    </div>
                </div>

                <div className="register__row">
                    <div>
                        <div className='register__rightFormLabel'>
                            <label>Email</label>
                        </div>
                        <input 
                            type="email" 
                            required
                            value={formData.email}
                            placeholder="student-Mail@student.oauife.edu.ng"
                            onChange={handleChange}
                            name="email"
                        />
                    </div>

                </div>

                <div className="register__row">
                    <div>
                        <div className='register__rightFormLabel'>
                            <label>Password</label>
                        </div>
                        <input 
                            type={showPassword ? "text" : "password"}
                            required
                            value={formData.password}
                            placeholder="password"
                            onChange={handleChange}
                            name="password"
                        />
                    </div>

                    <div>
                        <div className='register__rightFormLabel'>
                            <label>Team Pass</label>
                        </div>
                        <input 
                            type="text"
                            required
                            value={formData.teampass}
                            onChange={handleChange}
                            name="teampass"
                            placeholder='teampass'
                        />
                    </div>
                </div>

                <div className={`register__row register__rowLast`} >
                    <button 
                        type="submit"
                        disabled={percentage !== null && percentage < 100} 
                        className="register__formButton"
                    >
                            Register
                    </button>
                    <p className='register__formQuestion'>Have an account already? <Link to={'/login'}>Login</Link></p>

                </div>
            </form>    

            <ToastContainer style={{ fontSize: "1rem" }}/>
        </div>
    </div>
  )
}

export default Register


