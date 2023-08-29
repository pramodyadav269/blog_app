import React, { useEffect } from 'react'
import { useState } from 'react';
import packageJson from '../../package.json';
import { useNavigate } from 'react-router-dom';
import background_pic from '../Content/images/default_bg_pic.jpg';

function ProfilePicAndName(){
    const navigate = useNavigate();
    var baseAPIURL = packageJson.api_base_url;
    const jwtToken = localStorage.getItem("JWTToken");
    var dataForCompProfileDetails;

    const [txtProfilePic, setProfilePic] = useState('')
    const [txtProfileName, setProfileName] = useState('')
    // const [txtAbout, setAbout] = useState('')
    // const [txtRegistered, setRegistered] = useState('')
    // const [txtCountry, setCountry] = useState('')
    // const [txtEmail, setEmail] = useState('')
    // const [txtGender, setGender] = useState('')

    // const handleAbout = (value) => {
    //     setAbout(value)
    // }
    // const handleRegistered = (value) => {
    //     setRegistered(value)
    // }
    // const handleCountry = (value) => {
    //     setCountry(value)
    // }
    // const handleEmail = (value) => {
    //     setEmail(value)
    // }
    // const handleGender = (value) => {
    //     setGender(value)
    // }
    // const handleProfilePic = (value) => {
    //     setProfilePic(value)
    // }
    // const handleProfileName = (value) => {
    //     setProfileName(value)
    // }

    useEffect(() => {
        fetchProfileData();
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
                    debugger
                    setProfilePic(data.profilePicPath.replace(/\\/g, '/'));
                    setProfileName(data.firstname + ' ' + data.lastname);
                    // setAbout(data.profileStatus);
                    // setRegistered(data.registeredOn);
                    // setCountry(data.username);
                    // setEmail(data.username);
                    
                    var Gender = '';
                    if (data.gender != undefined && data.gender === 'M') {
                        Gender = 'Male';
                    }
                    else if (data.gender != undefined && data.gender === 'F') {
                        Gender = 'Female';
                    }                    
                    dataForCompProfileDetails = {
                        txtProfileName: data.firstname + ' ' + data.lastname,
                        txtAbout: data.profileStatus,
                        txtRegistered: data.registeredOn,
                        txtCountry: data.username,
                        txtEmail: data.username,
                        txtGender: Gender
                    };
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

            <ProfileSection data={dataForCompProfileDetails}/>

        </div>
    )
}

function ProfileSection(props) {    

  const ProfileDetails = props.data;

  return (
    <div className="d-none d-md-block col-md-4 col-xl-3 left-wrapper">
        <div className="card rounded">
            <div className="card-body">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <h6 className="card-title mb-0">About</h6>
                </div>
                <span>{ProfileDetails.txtAbout}
                    <a href='#'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
                            <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z" />
                        </svg>
                    </a>
                </span>
                <div className="mt-3">
                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">Joined:</label>
                    <p className="text-muted">{ProfileDetails.txtRegistered}</p>
                </div>
                <div className="mt-3">
                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">Lives:</label>
                    <p className="text-muted">{ProfileDetails.txtCountry}</p>
                </div>
                <div className="mt-3">
                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">Email:</label>
                    <p className="text-muted">{ProfileDetails.txtEmail}</p>
                </div>
                <div className="mt-3">
                    <label className="tx-11 font-weight-bold mb-0 text-uppercase">Gender:</label>
                    <p className="text-muted">{ProfileDetails.txtGender}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

// export default ProfileSection
export { ProfilePicAndName, ProfileSection };