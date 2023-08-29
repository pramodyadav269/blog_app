import React, { useEffect, useRef, useState } from 'react'
import packageJson from '../../package.json';
import { useNavigate } from 'react-router-dom';
import background_pic from '../Content/images/default_bg_pic.jpg';
import BindBlogPost from '../FunctionComponent/BindBlogPost';
// import { ProfilePicAndName, ProfileSection } from './ProfileDetails';
import Navbar from '../FunctionComponent/Navbar';

function Blog() {

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

    const [isTextAreaVisible, setTextAreaVisible] = useState(false);
    const [isFileUploadVisible, setFileUploadVisible] = useState(false);
    const [isContentPostVisible, setContentPostVisible] = useState(false);

    const [txtPostText, setPostText] = useState('')
    var [txtPostMedia, setPostMedia] = useState('')
    var [txtPostType, setPostType] = useState('')

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
    const handleProfileStatus = (event) => {
        setProfileStatus(event.target.value)
    }

    const showHidePopup = (e, flag) => {
        setIsPopupVisible(flag);
    };
    
    useEffect(() => {
        if (isPopupVisible) {
          // Focus on the input field when the popup is shown
          inputRef.current.focus();
        }
    }, [isPopupVisible]);

    const toggleTextArea = () => {
        //debugger
        setPostType("text");
        setTextAreaVisible(true);
        setFileUploadVisible(false);
        setContentPostVisible(true);
    };
    const toggleFileUpload = () => {
        //debugger
        setPostType("image");
        setTextAreaVisible(false);
        setFileUploadVisible(true);
        setContentPostVisible(true);
    };

    const handlePostText = (e) => {
        setPostText(e.target.value)
    }
    const handleImageChange = (event) => {
        //debugger
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                //debugger
                setPostMedia(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // const handlePostData = (data) => {
    //     setPostData(data)
    // }

    useEffect(() => {
        fetchProfileData();
        //BindPosts();
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

    const SubmitPost = (e) => {
        e.preventDefault();
        try {
            var request = {
                "PostType": txtPostType, "PostText": txtPostText, "PostMedia": txtPostMedia
            };
            //debugger
            fetch(baseAPIURL + '/Home/SubmitPost', {
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
                    alert(data.description);
                    CancelPost();
                    window.location.reload();
                    //BindPosts();
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
    const CancelPost = (e) => {
        setPostType("");
        setTextAreaVisible(false);
        setFileUploadVisible(false);
        setContentPostVisible(false);
    }

    // const BindPosts = () => {
    //     try {
    //         //debugger            
    //         fetch(baseAPIURL + '/Home/GetAllPost', {
    //             method: "GET",
    //             headers: {
    //                 "Authorization": "Bearer " + jwtToken,
    //                 "Content-Type": "application/json",
    //             },
    //         }).then((response) => {
    //             //debugger
    //             if (!response.ok) {
    //                 if (response.status === 401) {
    //                     navigate('/login');
    //                 }
    //                 else {
    //                     alert("Error: Something went wrong, please try again");
    //                 }
    //             }
    //             return response.json();
    //         }).then((data) => {
    //             //debugger
    //             if (data != undefined && data.statusCode == "200") {
    //                 if(data.lstDetails.length > 0){
    //                     setPostData(data.lstDetails);
    //                 }
    //                 else{
    //                     alert(data.description);    
    //                 }                    
    //             }
    //             else{
    //                 alert(data.description);
    //             }
                
    //             // setProfilePic(data.profilePicPath.replace(/\\/g, '/'));
    //             // setProfileName(data.firstname + ' ' + data.lastname);
    //         })
    //         .catch((error) => {
    //             console.error(error);
    //         }); 
    //     }
    //     catch (error) {
    //         console.log(error);
    //     }
    // }

    return (

        <>
            <Navbar />

            <div className="container">
            <div className="profile-page tx-13">

                {/* <ProfilePicAndName /> */}

                <div className="row">
                    <div className="col-12 grid-margin">
                        <div className="profile-header">
                            <div className="cover">
                                <div className="gray-shade"></div>
                                <figure>
                                    <img src={background_pic} className="img-fluid" alt="profile cover" />
                                </figure>
                                <div className="cover-body d-flex justify-content-between align-items-center">
                                    <div>
                                        {txtProfilePic && <img className="profile-pic" src={txtProfilePic} alt="profile" />}
                                        <span className="profile-name">{txtProfileName}</span>
                                    </div>
                                    <div className="d-none d-md-block">
                                        <button className="btn btn-primary btn-icon-text btn-edit-profile">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-edit btn-icon-prepend">
                                                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                            </svg> Edit profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="header-links"></div>
                        </div>
                    </div>
                </div>
                <div className="row profile-body">

                    {/* <ProfileSection /> */}
                    <div className="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
                        <div className="card rounded">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h6 className="card-title mb-0">About</h6>
                                </div>
                                <span>{txtAbout}
                                    <a href='#' onClick={(e) => showHidePopup(e,true)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                        </svg>
                                    </a>
                                </span>
                                <div className="mt-3">
                                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">Joined:</label>
                                    <p className="text-muted">{txtRegistered}</p>
                                </div>
                                <div className="mt-3">
                                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">Lives:</label>
                                    <p className="text-muted">{txtCountry}</p>
                                </div>
                                <div className="mt-3">
                                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">Email:</label>
                                    <p className="text-muted">{txtEmail}</p>
                                </div>
                                <div className="mt-3">
                                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">Gender:</label>
                                    <p className="text-muted">{txtGender}</p>
                                </div>
                            </div>
                        </div>
                    </div> 
                    <div className="col-md-8 col-xl-6 middle-wrapper">
                        <div className="row">
                            <div className="col-md-12 grid-margin">
                                <div className="card rounded">
                                    <div className="card-header">
                                        <div className="d-flex align-items-center justify-content-between">
                                            <div className="d-flex align-items-center">
                                                <p>Whats on your mind, ? Let's create Blog</p>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span>
                                                    <a name="text" onClick={toggleTextArea}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                                                        </svg>
                                                    </a>
                                                </span>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <span>
                                                    <a name="image" onClick={toggleFileUpload}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-card-image" viewBox="0 0 16 16">
                                                            <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                                                            <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                                                        </svg>
                                                    </a>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {
                            isContentPostVisible &&
                            <div className="row">
                                <div className="col-md-12 grid-margin">
                                    <div className="card rounded">
                                        <div className="card-header">
                                            <div className="form-group">
                                                {
                                                    isTextAreaVisible &&
                                                    <textarea className="form-control" rows="3" id="comment" onChange={handlePostText}
                                                        value={txtPostText}></textarea>
                                                }
                                                <br />
                                                {
                                                    isFileUploadVisible &&
                                                    <input type="file" id="myFile" name="filename" onChange={handleImageChange}
                                                        accept="image/*"></input>
                                                }
                                                <br />
                                                <br />
                                                <button type="submit" className="btn btn-primary" onClick={SubmitPost}>Post</button>
                                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                                <button type="submit" className="btn btn-primary" onClick={CancelPost}>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        }

                        <BindBlogPost />

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

export default Blog;