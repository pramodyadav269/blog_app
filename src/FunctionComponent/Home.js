import React, { useEffect } from 'react'
import { useState } from 'react';
import packageJson from '../../package.json';
import { useNavigate } from 'react-router-dom';
import background_pic from '../Content/images/default_bg_pic.jpg';
import BindBlogPost from '../FunctionComponent/BindBlogPost';
import Navbar from '../FunctionComponent/Navbar';

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

    return (

        <>
            <Navbar />

            <div className="container">
            <div className="profile-page tx-13">
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
                    <div className="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
                        <div className="card rounded">
                            <div className="card-body">
                                <div className="d-flex align-items-center justify-content-between mb-2">
                                    <h6 className="card-title mb-0">About</h6>                                    
                                </div>
                                <span>{txtAbout}
                                    {/* <a className="btn btn-info btn-lg" data-toggle="modal" data-target="#myModal">*/}
                                    <a href='#'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
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
                        {/* <BindBlogPost action="personal"/> */}
                        <div className="row">
                        {
                            PostData.map((item) => {
                            debugger
                            if (item.postType === 'text') {
                            return (
                                <div className="col-md-12 grid-margin">
                                    <div className="card rounded">
                                        <div className="card-header">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">                                                    
                                                    {item.profilePic && <img className="img-xs rounded-circle" src={item.profilePic} alt="" />}
                                                    <div className="ml-2">
                                                        <p>{item.firstname +' '+ item.lastname}</p>
                                                        <p className="tx-11 text-muted">1 min ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <p className="mb-3 tx-14">{item.postText}</p>                                                                                        
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex post-actions">
                                                <a href="javascript:;" className="d-flex align-items-center text-muted mr-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart icon-md">
                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                    </svg>
                                                    <p className="d-none d-md-block ml-2">Like({item.likeCount})</p>
                                                </a>
                                                <a href="javascript:;" className="d-flex align-items-center text-muted mr-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-message-square icon-md">
                                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                                    </svg>
                                                    <p className="d-none d-md-block ml-2">Comment({item.commentCount})</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                            } else if (item.postType === 'image') {
                            return (
                                <div className="col-md-12 grid-margin">
                                    <div className="card rounded">
                                        <div className="card-header">
                                            <div className="d-flex align-items-center justify-content-between">
                                                <div className="d-flex align-items-center">                                                    
                                                    {item.profilePic && <img className="img-xs rounded-circle" src={item.profilePic} alt="" />}
                                                    <div className="ml-2">
                                                        <p>{item.firstname +' '+ item.lastname}</p>
                                                        <p className="tx-11 text-muted">1 min ago</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="card-body">
                                            <img className="img-fluid" style={{ width:"70%"}} src={item.postMediaPath} alt="" />
                                        </div>
                                        <div className="card-footer">
                                            <div className="d-flex post-actions">
                                                <a href="javascript:;" className="d-flex align-items-center text-muted mr-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart icon-md">
                                                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                                    </svg>
                                                    <p className="d-none d-md-block ml-2">Like({item.likeCount})</p>
                                                </a>
                                                <a href="javascript:;" className="d-flex align-items-center text-muted mr-4">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-message-square icon-md">
                                                        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                                    </svg>
                                                    <p className="d-none d-md-block ml-2">Comment({item.commentCount})</p>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                            }
                            })}
                        </div>
                    </div>
                </div>
            </div>

        </div>
        </>
    )
}

export default Home