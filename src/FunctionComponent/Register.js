import React, { useEffect } from 'react';
import user_avatar from '../Content/images/user_avatar.png';
import { useState } from 'react';
import packageJson from '../../package.json';
import { useNavigate } from 'react-router-dom';


function Register() {

    localStorage.removeItem('JWTToken');

    const navigate = useNavigate();
    var baseAPIURL = packageJson.api_base_url;

    const [txtEmail, setEmail] = useState('')
    const [txtPassword, setPassword] = useState('')
    const [txtFirstname, setFirstname] = useState('')
    const [txtLastname, setLastname] = useState('')
    const [txtMobile, setMobile] = useState('')
    const [txtGender, setGender] = useState('')
    const [txtDOB, setDOB] = useState('')
    const [txtCountry, setCountry] = useState([])
    const [selectedCountryOption, setSelectedCountryOption] = useState('')
    const [txtProfilePic, setProfilePic] = useState(user_avatar);
    // const [txtState, setState] = useState([])
    // const [txtCity, setCity] = useState('')    
    //const [txtProfilePic, setProfilePic] = useState('')

    var [txtError, setError] = useState('')

    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }
    const handleFirstname = (event) => {
        setFirstname(event.target.value)
    }
    const handleLastname = (event) => {
        setLastname(event.target.value)
    }
    const handleMobile = (event) => {
        setMobile(event.target.value.substring(0, 10))
    }
    const handleGender = (event) => {
        setGender(event.target.value)
    }
    const handleDOB = (event) => {
        setDOB(event.target.value)
    }
    const handleSelectedCountry = (event) => {
        setSelectedCountryOption(event.target.value);
    }
    const handleImageChange = (event) => {
        //debugger
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                //debugger
                setProfilePic(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    /* This is to upload image */
    // const handleImageUpload = () => {
    //     if (selectedImage) {
    //       // Call the function to upload the base64-encoded image to the API
    //       uploadImage(selectedImage);
    //     } else {
    //       // Show a message or handle the case when no image is selected
    //     }
    //   };    

    // const handleProfilePic = (event) => {
    //     setProfilePic(event.target.value)
    // }

    const ValidateRegister = () => {
        //debugger
        var ValidationMsg = '';
        if(txtEmail == undefined || txtEmail.trim() === ""){
            ValidationMsg = 'Please enter EmailId';
            return ValidationMsg;
        }
        if(txtEmail != undefined && txtEmail.trim() != ""){
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(txtEmail)) {                
                ValidationMsg = 'Please enter valid email address';
                return ValidationMsg;
            }
        }
        if(txtPassword == undefined || txtPassword.trim() === ""){
            ValidationMsg = 'Please enter Password';
            return ValidationMsg;
        }
        if(txtFirstname == undefined || txtFirstname.trim() === ""){
            ValidationMsg = 'Please enter Firstname';
            return ValidationMsg;
        }
        if(txtLastname == undefined || txtLastname.trim() === ""){
            ValidationMsg = 'Please enter Lastname';
            return ValidationMsg;
        }
        if(txtMobile == undefined || txtMobile.trim() === ""){
            ValidationMsg = 'Please enter MobileNo';
            return ValidationMsg;
        }
        if(txtMobile != undefined && txtMobile.trim() != ""){
            if(txtMobile.length < 10){
                ValidationMsg = 'Please enter valid MobileNo';
                return ValidationMsg;
            }
        }
        if(txtGender == undefined || txtGender.trim() === ""){
            ValidationMsg = 'Please select Gender';
            return ValidationMsg;
        }
        if(txtDOB == undefined || txtDOB.trim() === ""){
            ValidationMsg = 'Please choose DOB';
            return ValidationMsg;
        }
        if(selectedCountryOption == undefined || selectedCountryOption.trim() === ""){
            ValidationMsg = 'Please select Country';
            return ValidationMsg;
        }
        return ValidationMsg;
    }

    function UserRegister(e) {
        debugger
        e.preventDefault();

        const ValidationMsg = ValidateRegister();
        if(ValidationMsg === ''){
            try {
                var request = {
                    "Username": txtEmail, "Password": txtPassword, "Firstname": txtFirstname, "Lastname": txtLastname, "Mobile": txtMobile
                    , "Gender": txtGender, "DOB": txtDOB, "CountryId": selectedCountryOption, "ProfilePic": txtProfilePic
                };
                debugger
                fetch(baseAPIURL + '/Account/Register', {
                    method: "POST",
                    headers: {
                        "Accept": "application/json",
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(request),
                }).then((res) => res.json())
                    .then((data) => {
                        debugger
                        if (data.statusCode == "200") {
                            alert(data.description);
                            navigate('/login');
                        }
                        else {
                            alert(data.description);
                        }
                    })
                .catch((error) => {
                    debugger
                    console.log(error);
                    alert("Error: Something went wrong, please try again");
                });
            }
            catch (error) {
                debugger
                alert(error);
            }
        }
        else{
            alert(ValidationMsg);
        }

        

        // .then((result) => {
        //         result.json().then((resp) =>{
        //             if(resp != undefined && resp.successCode == "200")
        //             {
        //                 localStorage.getItem("Firstname",resp.Firstname);

        //                 //navigate("/Login");
        //                 window.location.reload();
        //             }
        //             else
        //             {
        //                 alert(resp.description);
        //             }
        //         })
        // });
    }

    const fetchCountryData = async () => {
        try {
            const results = [];
            const res = await fetch(baseAPIURL + '/Account/GetCountry');
            const data = await res.json();
            console.log(data);
            debugger
            data.lstDetails.forEach((value) => {
                results.push({
                    key: value.countryname,
                    value: value.countryId,
                });
            });
            debugger
            setCountry([
                { key: '-- Select Country --', value: '' },
                ...results
            ])
            //debugger
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchCountryData();
    }, []);

    return (
        <>                                   
            <div className="container">                
                <div className="row">
                    <div className="col-sm-3"></div>
                    <div className="col-sm-6 border">
                        <div className="card rounded">
                            <div className="card-header">
                                <h1 className="text-center">Registration Form</h1>


                                
                                <div className="row">
                                    <div className="col-md-5">
                                        <div className="imgcontainer image-container" style={{ textAlign: "center", margin: "24px 0 12px 0" }}>                                
                                        <a href="#"><img src={txtProfilePic} alt="Avatar" className="avatar" style={{ width:"100%",borderRadius:"110px"}} /></a>                                    
                                    </div>        
                                    </div>
                                    <div className="col-md-7">
                                        <input type="file" onChange={handleImageChange} accept="image/*"  style={{ marginTop:"70px"}} />
                                        {/* {txtProfilePic && <img src={txtProfilePic} alt="Selected" />} */}
                                    </div>
                                </div>
                                
                                
                                



                                <div className="mb-3 mt-3">
                                    <label htmlFor="email">Email:</label>
                                    <input type="email" className="form-control" id="email" placeholder="Enter email"
                                        name="email" onChange={handleEmail} value={txtEmail} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="pwd">Password:</label>
                                    <input type="password" className="form-control" id="pwd" placeholder="Enter password"
                                        name="pswd" onChange={handlePassword} value={txtPassword} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="firstname">Firstname:</label>
                                    <input type="text" className="form-control" id="firstname" placeholder="Enter firstname"
                                        name="fname" onChange={handleFirstname} value={txtFirstname} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="lastname">Lastname:</label>
                                    <input type="text" className="form-control" id="lastname" placeholder="Enter lastname"
                                        name="lname" onChange={handleLastname} value={txtLastname} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="mobile">Mobile:</label>
                                    <input type="number" className="form-control" id="mobile" placeholder="Enter mobileno"
                                        name="mob" onChange={handleMobile} value={txtMobile} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="gender">Gender :&nbsp;&nbsp; </label>
                                    <div className="form-check-inline">
                                        <label className="form-check-label" htmlFor="radio1">
                                            <input type="radio" className="form-check-input" id="radio1" name="optradio"
                                                value="M" onChange={handleGender} />Male
                                        </label>
                                    </div>
                                    <div className="form-check-inline">
                                        <label className="form-check-label" htmlFor="radio2">
                                            <input type="radio" className="form-check-input" id="radio2" name="optradio"
                                                value="F" onChange={handleGender} />Female
                                        </label>
                                    </div>
                                    <div className="form-check-inline">
                                        <label className="form-check-label" htmlFor="radio2">
                                            <input type="radio" className="form-check-input" id="radio3" name="optradio"
                                                value="O" onChange={handleGender} />Others
                                        </label>
                                    </div>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="dob">DOB:</label>
                                    <input type="date" className="form-control" id="dob" placeholder="Enter firstname"
                                        name="dob" onChange={handleDOB} value={txtDOB} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="country">Country:</label>
                                    <select name="country" id="country" className="form-control" onChange={handleSelectedCountry} value={selectedCountryOption}>
                                        {
                                            txtCountry.map((result) => (<option key={result.key} value={result.value}>{result.key}</option>))
                                        }
                                    </select>
                                    {/* {selectedCountryOption && <p>Selected option: {selectedCountryOption}</p>} */}
                                </div>
                                <div className="mb-3">
                                    <button type="submit" className="btn btn-primary" onClick={UserRegister}>Register</button>
                                </div>
                                <div className="mb-3">
                                    <p><a className="link-opacity-100" href="login">SignIn</a></p>
                                </div>
                            </div>
                        </div>                                
                    </div>
                </div>
            </div>
        </>
    )
}

export default Register