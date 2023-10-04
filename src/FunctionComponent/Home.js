import React, { useEffect, useRef, useState } from 'react'
import packageJson from '../../package.json';
import { useNavigate } from 'react-router-dom';
import background_pic from '../Content/images/default_bg_pic.jpg';
import BindBlogPost from '../FunctionComponent/BindBlogPost';
import SideBar from './SideBar';
import ProfileBackground from './ProfileBackground';

function Home() {

    const navigate = useNavigate();
    var baseAPIURL = packageJson.api_base_url;
    const jwtToken = localStorage.getItem("JWTToken");    

    const [txtProfilePic, setProfilePic] = useState('')
    const [txtProfileName, setProfileName] = useState('')
    const [txtAbout, setAbout] = useState('')
    const [txtRegistered, setRegistered] = useState('')
    const [txtCountry, setCountry] = useState('')
    const [txtEmail, setEmail] = useState('')
    const [txtGender, setGender] = useState('')
    const [txtProfileStatus, setProfileStatus] = useState('')

    const [isPopupVisible, setIsPopupVisible] = useState(false);
    const inputRef = useRef(null);

    var [PostData, setPostData] = useState([])
    
    const handleAbout = (value) => {
        setAbout(value)
    }
    const handleRegistered = (value) => {
        setRegistered(value)
    }
    const handleCountry = (value) => {
        setCountry(value)
    }
    const handleEmail = (value) => {
        setEmail(value)
    }
    const handleGender = (value) => {
        setGender(value)
    }
    const handleProfilePic = (value) => {
        setProfilePic(value)
    }
    const handleProfileName = (value) => {
        setProfileName(value)
    }
    const showHidePopup = (e, flag) => {
        debugger;
        setIsPopupVisible(flag);
    };
    const handleProfileStatus = (event) => {
        setProfileStatus(event.target.value)
    }

    useEffect(() => {
        if (isPopupVisible) {
          // Focus on the input field when the popup is shown
          inputRef.current.focus();
        }
    }, [isPopupVisible]);

    useEffect(() => {        
        fetchProfileData();
        BindPosts();
    }, []);

    const fetchProfileData = async () => {
        try {
            //debugger            
            fetch(baseAPIURL + '/Home/GetProfileDetails', {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwtToken,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                //debugger
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/login');
                    }
                    else {
                        alert("Error: Something went wrong, please try again");
                    }
                }
                return response.json();
            })
                .then((data) => {
                    //debugger
                    setProfilePic(data.profilePicPath.replace(/\\/g, '/'));
                    setProfileName(data.firstname + ' ' + data.lastname);
                    setAbout(data.profileStatus);
                    setRegistered(data.registeredOn);
                    setCountry(data.countryname);
                    setEmail(data.username);
                    if (data.gender != undefined && data.gender === 'M') {
                        setGender('Male');
                    }
                    else if (data.gender != undefined && data.gender === 'F') {
                        setGender('Female');
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        }
        catch (error) {
            console.log(error);
        }
    }

    const BindPosts = () => {
        try {
            //debugger            
            fetch(baseAPIURL + '/Home/GetAllPost', {
                method: "GET",
                headers: {
                    "Authorization": "Bearer " + jwtToken,
                    "Content-Type": "application/json",
                },
            }).then((response) => {
                //debugger
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/login');
                    }
                    else {
                        alert("Error: Something went wrong, please try again");
                    }
                }
                return response.json();
            }).then((data) => {
                //debugger
                if (data != undefined && data.statusCode == "200") {
                    if(data.lstDetails.length > 0){
                        setPostData(data.lstDetails);
                    }
                    else{
                        alert(data.description);    
                    }                    
                }
                else{
                    alert(data.description);
                }
            })
            .catch((error) => {
                console.error(error);
            }); 
        }
        catch (error) {
            console.log(error);
        }
    }

    const UpdateProfileStatus = (e) => {
        e.preventDefault();
        try {
            var request = {
                "ProfileStatus": txtProfileStatus
            };
            //debugger
            fetch(baseAPIURL + '/Home/UpdateProfileStatus', {
                method: "POST",
                headers: {
                    "Authorization": "Bearer " + jwtToken,
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(request),
            }).then((response) => {
                //debugger
                if (!response.ok) {
                    if (response.status === 401) {
                        navigate('/login');
                    }
                    else {
                        alert("Error: Something went wrong, please try again");
                    }
                }
                return response.json();
            }).then((data) => {
                //debugger
                if (data.statusCode == "200") {
                    handleAbout(txtProfileStatus);
                    setProfileStatus('')
                    setIsPopupVisible(false);
                }
                else {
                    alert(data.description);
                }
            })
            .catch((error) => {
                console.error(error);
            });                
        }
        catch (error) {
            alert(error);
        }
    };

    const objProps = {txtRegistered, txtCountry, txtEmail, txtGender, txtAbout, showHidePopup}
    //const profileBackground = { background_pic, txtProfilePic, txtProfileName}
    var profileBackground = {
        background_pic: background_pic,
        txtProfilePic: txtProfilePic,
        txtProfileName: txtProfileName
    };

    return (

        <>
           
            <div className="container">
            <div className="profile-page tx-13">
                
                <ProfileBackground data={profileBackground}/>

                <div className="row profile-body">
                    
                    <SideBar {...objProps} />
                
                    <div className="col-md-8 col-xl-6 middle-wrapper">
                        <BindBlogPost action="personal"/>                        
                    </div>
                </div>
            </div>


            {/* Pop Up */}    
            {isPopupVisible && (
            <div className="popup-container">
                <div className="popup">
                    <span className="close-button" onClick={(e) => showHidePopup(e,false)}>
                    &times;
                    </span> 
                    <b><p>Profile status</p></b>
                    <textarea ref={inputRef} className="form-control" rows="3" id="comment" onChange={handleProfileStatus}
                        value={txtProfileStatus}></textarea>
                    <button type="submit" className="CommentSubmit" 
                        onClick={UpdateProfileStatus}><a href="#">submit</a></button>
                </div>
            </div>
            )}
         
            {/* End Pop Up */}

        </div>
        </>
    )
}

export default Home