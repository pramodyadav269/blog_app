import React from 'react';
import { useState } from 'react';
import packageJson from '../../package.json';
import { useNavigate } from 'react-router-dom';

function Login() {

    localStorage.removeItem('JWTToken');
    
    const navigate = useNavigate();

    const [txtEmail, setEmail] = useState('')
    const [txtPassword, setPassword] = useState('')
 
    const handleEmail = (event) => {
        setEmail(event.target.value)
    }
    const handlePassword = (event) => {
        setPassword(event.target.value)
    }

    const ValidateLogin = () => {
        debugger
        var ValidationMsg = '';
        if(txtEmail == undefined || txtEmail.trim() === ""){
            ValidationMsg = 'Please enter EmailId';
            return ValidationMsg;
        }
        if(txtEmail != undefined && txtEmail.trim() != ""){
            if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(txtEmail)) {
                ValidationMsg = 'Invalid email address';
                return ValidationMsg;
            }
        }
        if(txtPassword == undefined || txtPassword.trim() === ""){
            ValidationMsg = 'Please enter Password';
            return ValidationMsg;
        }
        return ValidationMsg;
    }

    const UserLogin = (e) => {
        e.preventDefault();
        debugger        
        const ValidationMsg = ValidateLogin();

        if(ValidationMsg === ''){
            var baseAPIURL = packageJson.api_base_url;
            var json = { "Username": txtEmail, "Password": txtPassword };
    
            fetch(baseAPIURL + '/Account/Login', {
                method: "POST",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(json),
            }).then((result) => {
                result.json().then((resp) => {
                    console.log(resp);
                    debugger
                    if (resp != undefined && resp.statusCode == "200") {
                        localStorage.setItem("JWTToken", resp.token);
                        navigate("/blog");
                    }
                    else {
                        alert(resp.description);
                    }
                })
            }).catch((error) => {
                console.log(error);
                alert("Error: Something went wrong, please try again");
            });
        }
        else{
            alert(ValidationMsg);
        }        
    }

    return (
        <>
            <div className="container">                    
                <div className="row">
                    <div className="col-sm-4"></div>

                    <div className="col-sm-4 border">
                        <div className="card rounded">
                            <div className="card-header">                                
                                <h1>Login Form</h1>
                                <div className="container mt-3">
                                    <div className="mb-3 mt-3">
                                        <label htmlFor="email">Email:</label>
                                        <input type="email" className="form-control" id="email" placeholder="Enter email"
                                            name="email" onChange={handleEmail} value={txtEmail}/>
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="pwd">Password:</label>
                                        <input type="password" className="form-control" id="pwd" placeholder="Enter password"
                                            onChange={handlePassword} value={txtPassword} name="pswd" />
                                    </div>
                                    <div className="mb-3">
                                        <button type="submit" className="btn btn-primary" onClick={UserLogin}>Login</button>
                                    </div>
                                    <div className="mb-3">
                                        <p><a className="link-opacity-100" href="register">SignUp</a></p>
                                        {/* <Link to={"/register"} className="nav-link">
                                    SignUp
                                    </Link>* */}
                                    </div>
                                </div>                                
                            </div>
                        </div>
                    </div>
                </div>                                                                       
            </div>
        </>
    )
}

export default Login
