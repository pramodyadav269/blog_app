import React from 'react'

function ProfileBackground(props) {

    const profileBackground = props.data;

    return (
        <>
            <div className="row">
                <div className="col-12 grid-margin">
                    <div className="profile-header">
                        <div className="cover">
                            <div className="gray-shade"></div>
                            <figure>
                                <img src={profileBackground.background_pic} className="img-fluid" alt="profile cover" />
                            </figure>
                            <div className="cover-body d-flex justify-content-between align-items-center">
                                <div>
                                    {profileBackground.txtProfilePic && <img className="profile-pic" src={profileBackground.txtProfilePic} alt="profile" />}
                                    <span className="profile-name">{profileBackground.txtProfileName}</span>
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
        </>
    )
}

export default ProfileBackground