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
// import { storage } from '../../Firebase/Firebase';

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
    
    // user boolean status
    const user = useSelector((state: RootState) => state.user.user)
    const dispatch = useDispatch()

    // getting user info
    const userInfo = useSelector((state: RootState) => state.userInfo.userInfo)

    // console.log(userInfo);

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)

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
          // console.log(name)
          const storageRef = ref(storage, file.name); // if file has same name, it will override
    
          const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
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
    
        file && uploadFile();
      }, [file])
    

      // HANDLING FORM SUBMIT
    const handleSubmit = async (e: any) => {
        e.preventDefault();
        
        // TEAMPASS  CHECK
        if(!pass.includes(formData.teampass)){
            alert("Please enter a valid team pass")
            return;
        }

        // TEAMPASS X TEAM CHECK
        if(!formData.teampass.includes(formData.team)){
            alert("Your team pass does not match your team")
            return;
        }

        // EMAIL CHECK
        if(!formData.email.includes('student.oauife.edu.ng')){
            alert("This is not a valid email address")
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
            alert("Please Check the form again and enter your details correctly.")
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


            // dispatch(firebaseLogin())
            // navigate('/home')
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
            alert(error)
            // navigate(-1);
        }
        
        // FIREBASE OPERATIONS ENDPOINT

    }

    // console.log(formData)
  return (
        <React.Fragment>

        <div>Register</div>

        <form  onSubmit={handleSubmit}>
            <div>
                <label>Name</label>
                <input 
                    type="text" 
                    required
                    value={formData.name}
                    onChange={handleChange}
                    name="name"
                />
            </div>
            <div>
                <label>Department</label>
                <input 
                    type="text" 
                    required
                    value={formData.department}
                    onChange={handleChange}
                    name="department"
                />
            </div>
            <div>
                <label>Level</label>
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
                <label>Team</label>
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

            <div>
                <label>Birthday</label>
                <input 
                    type="date" 
                    required
                    value={formData.birthday}
                    onChange={handleChange}
                    name="birthday"
                />
            </div>

            <div>
                <label>Image</label>
                <input 
                    type="file" 
                    required
                    // value={formData.image}
                    onChange={(e: any) => setFile(e.target.files[0])}
                    name="image"
                />
            </div>

            <div>
                <label>Email</label>
                <input 
                    type="email" 
                    required
                    value={formData.email}
                    onChange={handleChange}
                    name="email"
                />
            </div>

            <div>
                <label>Password</label>
                <input 
                    type={showPassword ? "text" : "password"}
                    required
                    value={formData.password}
                    onChange={handleChange}
                    name="password"
                />
            </div>

            <div>
                <label>Team Pass</label>
                <input 
                    type="text"
                    required
                    value={formData.teampass}
                    onChange={handleChange}
                    name="teampass"
                />
            </div>

            <button 
                type="submit"
                disabled={percentage !== null && percentage < 100} 
            >
                    Submit
            </button>
        </form>    

        <p style={{ fontSize: "14px" }}>Have an account already? <Link to={'/login'}>Login</Link></p>
    </React.Fragment>
  )
}

export default Register