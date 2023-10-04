import React, { useEffect } from 'react'
import { useState } from 'react';
import packageJson from '../../package.json';
import { useNavigate } from 'react-router-dom';
import CommentSection from '../FunctionComponent/CommentSection';

function BindBlogPost(props) {

    const navigate = useNavigate();
    var baseAPIURL = packageJson.api_base_url;
    const jwtToken = localStorage.getItem("JWTToken");    

    var [PostData, setPostData] = useState([])
    const [txtComment, setComment] = useState('')

    const [showSpinner, setShowSpinner] = useState(true);

    const handleSpinner = (flag) =>{
        setShowSpinner(flag)
    }    

    const handleComment = (event) => {
        setComment(event.target.value)
    }

    //var [Comments, setComments] = useState([])

    // var Comments = [
    //     {profilename:'pramod', comment:'hello'},
    //     {profilename:'sachin', comment:'world'},
    // ]
    // setComments(commList)

    useEffect(() => {
        BindPosts();
    }, []);

    const BindPosts = () => {
        try {
            //debugger  
            setShowSpinner(true)
            var APIurl = '';    
            if(props.action == "personal"){
                APIurl = baseAPIURL + '/Home/GetPersonalPost';                
            }
            else{
                APIurl = baseAPIURL + '/Home/GetAllPost';
            }

            fetch(APIurl, {
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
                debugger
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
                
                // setProfilePic(data.profilePicPath.replace(/\\/g, '/'));
                // setProfileName(data.firstname + ' ' + data.lastname);
            })
            .catch((error) => {
                console.error(error);
            }); 
            setShowSpinner(false)
        }
        catch (error) {
            console.log(error);
        }
    }

    const SubmitPostLike = (e,UserPostId) => {
        try {
            debugger        
            e.preventDefault();    
            //fetch(baseAPIURL + '/Home/SubmitPostLike/id?'+UserPostId, {
            fetch(`${baseAPIURL}/Home/SubmitPostLike/${UserPostId}`, {
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
                debugger
                if (data != undefined && data.statusCode == "200") {
                    if(data.lstDetails.length != undefined){
                        //e.target.value = data.lstDetails.length;
                        setPostData((prevBlogPosts) => {
                            return prevBlogPosts.map((blog) => {
                                debugger
                            if (blog.userPostId === UserPostId) {
                            return { ...blog, likeCount: data.lstDetails.length };
                            }
                            return blog;
                            });
                        });
                    }
                    else{
                        alert(data.description);    
                    }                    
                }
                else{
                    alert(data.description);
                }
                
                // setProfilePic(data.profilePicPath.replace(/\\/g, '/'));
                // setProfileName(data.firstname + ' ' + data.lastname);
            })
            .catch((error) => {
                console.error(error);
            }); 
        }
        catch (error) {
            console.log(error);
        }
    }
    const GetPostComment = (e,UserPostId) => {
        try {
            debugger        
            e.preventDefault();    
            fetch(`${baseAPIURL}/Home/GetPostComments/${UserPostId}`, {
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
                debugger
                if (data != undefined && data.statusCode == "200") {
                    if(data.lstDetails.length != undefined){
                        setPostData((prevBlogPosts) => {
                            return prevBlogPosts.map((blog) => {
                                debugger
                            if (blog.userPostId === UserPostId) {
                            return { ...blog, commentCount: data.lstDetails.length, lstComments: data.lstDetails };
                            }
                            return blog;
                            });
                        });
                    }
                    else{
                        alert(data.description);    
                    }                    
                }
                else{
                    alert(data.description);
                }
                
                // setProfilePic(data.profilePicPath.replace(/\\/g, '/'));
                // setProfileName(data.firstname + ' ' + data.lastname);
            })
            .catch((error) => {
                console.error(error);
            }); 
        }
        catch (error) {
            console.log(error);
        }
    }

    const SubmitPostComment = (e,UserPostId) => {
        e.preventDefault();
        try {

            if(txtComment == undefined || txtComment.trim() === ""){
                alert('Please enter Comment');
                return false;
            }
            else{
                var request = {
                    "UserPostId": UserPostId, "CommentText": txtComment
                };
                debugger
                fetch(baseAPIURL + '/Home/SubmitPostComment', {
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
                    debugger
                    if (data != undefined && data.statusCode == "200") {
                        if(data.lstDetails.length != undefined){
                            setComment('');
                            setPostData((prevBlogPosts) => {
                                return prevBlogPosts.map((blog) => {
                                    debugger
                                if (blog.userPostId === UserPostId) {
                                return { ...blog, commentCount: data.lstDetails.length, lstComments: data.lstDetails };
                                }
                                return blog;
                                });
                            });
                        }
                        else{
                            alert(data.description);    
                        }
                    }
                    else {
                        alert(data.description);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });   
            }                         
        }
        catch (error) {
            alert(error);
        }
    }

    const DeletePost = (e,UserPostId) => {
        e.preventDefault();
        try {
            debugger        
            e.preventDefault();    
            fetch(`${baseAPIURL}/Home/DeletePost/${UserPostId}`, {
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
                debugger
                if (data != undefined && data.statusCode == "200") {
                    BindPosts();                    
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

    const DeleteComment = (e,userPostCommentId, userPostId) => {
    e.preventDefault();
    try {
        debugger        
        e.preventDefault();    
        fetch(`${baseAPIURL}/Home/DeleteComment/${userPostCommentId}`, {
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
            debugger
            if (data != undefined && data.statusCode == "200") {
                setPostData((prevBlogPosts) => {
                    return prevBlogPosts.map((blog) => {
                    debugger
                    if (blog.userPostId === userPostId) {
                    return { ...blog, commentCount: data.lstDetails.length, lstComments: data.lstDetails };
                    }
                    return blog;
                    });
                });
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

    const CalcPostUploadedTime = (uploadedTime) =>{
        debugger
        var convertedDate = new Date(Date.parse(uploadedTime))
        const currentTime = new Date();
        const timeDifference = Math.floor((currentTime - convertedDate) / 1000);

        const minute = 60;
        const hour = minute * 60;
        const day = hour * 24;

        if (timeDifference < minute) {
            return "Just now";
        } 
        else if (timeDifference < hour) {
            const minutesAgo = Math.floor(timeDifference / minute);
            return `${minutesAgo} ${minutesAgo === 1 ? "minute" : "minutes"} ago`;
        } 
        else if (timeDifference < day) {
            const hoursAgo = Math.floor(timeDifference / hour);
            return `${hoursAgo} ${hoursAgo === 1 ? "hour" : "hours"} ago`;
        } 
        else {
            const daysAgo = Math.floor(timeDifference / day);
            return `${daysAgo} ${daysAgo === 1 ? "day" : "days"} ago`;
        }
    }    

  return (
    <>        
        {showSpinner ? <div className="cover-spin"></div> : null}
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
                                        <p>{item.firstname +' '+ item.lastname }</p>
                                        <p className="tx-11 text-muted">{CalcPostUploadedTime(item.postedOn)}</p>
                                    </div>
                                </div>
                                {
                                    <div className="d-flex align-items-right">
                                    {
                                        (item.isCurrentUser) ? (<a href="" onClick={(e) => DeletePost(e, item.userPostId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                        </svg>
                                        </a> ) : <span></span>
                                    }                                                                                           
                                    </div>                         
                                }
                            </div>
                        </div>
                        <div className="card-body">
                            <p className="mb-3 tx-14">{item.postText}</p>                
                        </div>
                        <div className="card-footer">
                            <div className="d-flex post-actions">       

                                <div className="row">
                                    <div className="col-md-5">
                                        <a href="#" className="d-flex align-items-center text-muted mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart icon-md">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>                                            
                                            </svg>                                                                        
                                            <span onClick={(e) => SubmitPostLike(e, item.userPostId)}>Like({item.likeCount})
                                            </span>
                                        </a>
                                    </div>
                                    <div className="col-md-7">
                                        <a href="#" className="d-flex align-items-center text-muted mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-message-square icon-md">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            <span onClick={(e) => GetPostComment(e, item.userPostId)}>Comment({item.commentCount})
                                            </span>
                                        </a>  
                                    </div>
                                </div>                                                
                            </div>
                            
                            <div className="list-group CommentPadding" >
                            {                                                                           
                                item.lstComments.map((comment) => (                                
                                    <CommentSection name={comment.firstName +' '+comment.lastName} comment={comment.commentText} 
                                    deleteAccess={comment.isCurrentUser} userPostCommentId={comment.userPostCommentId} 
                                    userPostId={item.userPostId} onDelete={DeleteComment}/>    
                                ))                            
                            }
                                <br />
                                <div className="row">
                                    <div className="col-md-9">                                    
                                        <input type="text" className="CommentTextBox" id="comment" 
                                        placeholder="Enter your comments" onChange={handleComment} 
                                        value={txtComment} />
                                    </div>
                                    <div className="col-md-3">
                                        <button type="submit" className="CommentSubmit" 
                                        onClick={(e) => SubmitPostComment(e, item.userPostId)}><a href="#">submit</a></button>
                                    </div>
                                </div>
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
                                        <p className="tx-11 text-muted">{CalcPostUploadedTime(item.postedOn)}</p>
                                    </div>
                                </div>
                                {
                                    <div className="d-flex align-items-right">
                                    {
                                        (item.isCurrentUser) ? (<a href="" onClick={(e) => DeletePost(e, item.userPostId)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z"/>
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z"/>
                                        </svg>
                                        </a> ) : <span></span>
                                    }                                                                                           
                                    </div>                         
                                }
                            </div>
                        </div>
                        <div className="card-body">
                            <img className="img-fluid" style={{ width:"70%"}} src={item.postMediaPath} alt="" />
                        </div>
                        <div className="card-footer">
                            <div className="d-flex post-actions">              
                                <div className="row">
                                    <div className="col-md-5">
                                        <a href="#" className="d-flex align-items-center text-muted mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-heart icon-md">
                                                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                                            </svg>                                
                                            <span onClick={(e) => SubmitPostLike(e, item.userPostId)}>Like({item.likeCount})
                                                {/* <span className="d-none d-md-block ml-2">Like</span>({item.likeCount}) */}
                                            </span>
                                        </a>   
                                    </div>                    
                                    <div className="col-md-7">     
                                        <a href="#" className="d-flex align-items-center text-muted mr-4">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="feather feather-message-square icon-md">
                                                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
                                            </svg>
                                            <span onClick={(e) => GetPostComment(e, item.userPostId)}>Comment({item.commentCount})
                                                {/* <span className="d-none d-md-block ml-2">Comment</span>({item.commentCount}) */}
                                            </span>
                                        </a>  
                                    </div>              
                                </div>                                                                                               
                            </div>

                            <div className="list-group CommentPadding" >
                            {                            
                                item.lstComments.map((comment) => (                                
                                    <CommentSection name={comment.firstName +' '+comment.lastName} comment={comment.commentText} 
                                    deleteAccess={comment.isCurrentUser} userPostCommentId={comment.userPostCommentId} 
                                    userPostId={item.userPostId} onDelete={DeleteComment}/>    
                                ))                            
                            }
                                <br />
                                <div className="row">
                                    <div className="col-md-9">
                                        <input type="text" className="CommentTextBox" id="comment" 
                                        placeholder="Enter your comments" onChange={handleComment} 
                                        value={txtComment}/>
                                    </div>
                                    <div className="col-md-3">
                                        <button type="submit" className="CommentSubmit" 
                                        onClick={(e) => SubmitPostComment(e, item.userPostId)}><a href="#">submit</a></button>    
                                    </div>                                
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            );
            }
        })}
        </div>       
    </>    
  )
}

export default BindBlogPost