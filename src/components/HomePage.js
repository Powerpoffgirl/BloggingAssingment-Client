import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "../Styles.css";
import { useSelector } from "react-redux";
import { Button, Dropdown, Modal} from "react-bootstrap";
import { CommentOutlined, DeleteOutlined, DislikeOutlined, EditOutlined, LikeOutlined } from "@ant-design/icons";


const HomePage = () => {
  const [greetings, setGreetings] = useState("");
  const [blogs, setBlogs] = useState([]);
  const [getblogs, setGetblogs] = useState([])
  // Modals
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [followers, setFollowers] = useState([]);
  const [followings, setFollowings] = useState([])
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : {
      name: "",
      email: "",
    };
  });
  
  const [newBlog, setNewBlog] = useState({
    title:"",
    textBody:"",
  })

  const user1 = useSelector((state) => state.user.user);
 // Update the user state when user1 changes
    useEffect(() => {
      if (user1) {
        setUser({
          name: user1.name,
          email: user1.email,
        });
      }
    }, [user1]);

    useEffect(() => {
      localStorage.setItem("user", JSON.stringify(user));
    }, [user]);
    

  const handleChange=(e)=>{
    const {name, value} = e.target
    setNewBlog((prevBlog)=>({
      ...prevBlog,
      [name]:value,
    }));
  }

  console.log("NEW BLOG", newBlog)
  const handleSubmit= async(e)=>{
    e.preventDefault();
    
    const token = localStorage.getItem("accessToken");
    console.log("TOKEN CREATE BLOG CLIENT SIDE", token)
    if (token) {
      try {
        console.log("TOKEN CREATE BLOG CLIENT SIDE", token)
        const response = await fetch(`https://bloggingsite7.onrender.com/blog/create-blog`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newBlog),
        });

        const data = await response.json();
        console.log("DATA FROM SUBMIT", data);

        // Clear the form after successful submission
        setNewBlog({
          title: "",
          textBody: "",
        });

        // Update the list of blogs
      } catch (error) {
        console.log("Error submitting blog", error);
      }
    } else {
      console.warn("No access token available.");
    }
  }

  const showMyBlogs=()=>{
    const fetchUserData = async()=>{
      console.log("Hello")
    const token = localStorage.getItem("accessToken");
    if (token) {
      try{
        const response =  await fetch(`https://bloggingsite7.onrender.com/blog/my-blogs`, {
          method:'GET',  
          headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
              'Content-Type': 'application/json',
            },
          });
            
          const data = await response.json();
          console.log("DATA FROM RESPONSE", data)
          setBlogs(data.data)
      }
     catch(error){
      console.log("Error fetching blog details", error)
     }
    } else {
      console.warn("No access token available.");
    }
    }
   
    fetchUserData();
  }

  useEffect(()=>{
    const fetchUserData = async()=>{
      console.log("Hello")
    const token = localStorage.getItem("accessToken");
    if (token) {
      try{
        const response =  await fetch(`https://bloggingsite7.onrender.com/blog/get-blogs`, {
          method:'GET',  
          headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
              'Content-Type': 'application/json',
            },
          });
            
          const data = await response.json();
          console.log("DATA FROM RESPONSE", data)
          setBlogs(data.data)
      }
     catch(error){
      console.log("Error fetching blog details", error)
     }
    } else {
      console.warn("No access token available.");
    }
    }
   
    fetchUserData();
  },[])

  const showGetBlogs=()=>{
    // Get the token from localStorage
  const fetchUserData = async()=>{
    console.log("Hello")
  const token = localStorage.getItem("accessToken");
  if (token) {
    try{
      const response =  await fetch(`https://bloggingsite7.onrender.com/blog/get-blogs`, {
        method:'GET',  
        headers: {
            'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
            'Content-Type': 'application/json',
          },
        });
          
        const data = await response.json();
        console.log("DATA FROM RESPONSE", data)
        setBlogs(data.data)
    }
   catch(error){
    console.log("Error fetching blog details", error)
   }
  } else {
    console.warn("No access token available.");
  }
  }
 
  fetchUserData();
  }

  useEffect(()=>{
    const fetchFollowers = async()=>{
    const token = localStorage.getItem("accessToken");
    if (token) {
      try{
        const response =  await fetch(`https://bloggingsite7.onrender.com/follow/follower-list`, {
          method:'POST',  
          headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
              'Content-Type': 'application/json',
            },
          });
            
          const data = await response.json();
          console.log("DATA FROM FOLLOWERS", data.data)
          setFollowers(data.data)
      }
     catch(error){
      console.log("Error fetching blog details", error)
     }
    } else {
      console.warn("No access token available.");
    }
    }
   
    fetchFollowers();
  },[])

  useEffect(()=>{
    const fetchFollowing = async()=>{
    const token = localStorage.getItem("accessToken");
    if (token) {
      try{
        const response =  await fetch(`https://bloggingsite7.onrender.com/follow/following-list`, {
          method:'POST',  
          headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
              'Content-Type': 'application/json',
            },
          });
            
          const data = await response.json();
          console.log("DATA FROM FOLLOWINGS", data)
          setFollowings(data.data)
      }
     catch(error){
      console.log("Error fetching blog details", error)
     }
    } else {
      console.warn("No access token available.");
    }
    }
   
    fetchFollowing();
  },[])

  // --------------UNFOLLOW USER---------------

  const handleUnfollow =async(_id)=>{
    const token = localStorage.getItem("accessToken");
    if (token) {
      try{
        const response =  await fetch(`https://bloggingsite7.onrender.com/follow/unfollow-user`, {
          method:'POST',  
          headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
              'Content-Type': 'application/json',
            },
          body:JSON.stringify({
            followingUserId : _id, // Sending _id as part of the request body
          }),
          });
            
          const data = await response.json();
          console.log("DATA FROM UNFOLLOW", data)
          setFollowings(data.data)
      }
     catch(error){
      console.log("Error fetching blog details", error)
     }
    } else {
      console.warn("No access token available.");
    }
  }

  // ----------------FOLLOW USER---------------
  const handleFollow = async(_id)=>{
    const token = localStorage.getItem("accessToken");
    if (token) {
      try{
        const response =  await fetch(`https://bloggingsite7.onrender.com/follow/follow-user`, {
          method:'POST',  
          headers: {
              'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
              'Content-Type': 'application/json',
            },
          body:JSON.stringify({
            followingUserId : _id, // Sending _id as part of the request body
          }),
          });
            
          const data = await response.json();
          console.log("DATA AFTER FOLLOWING", data)
          setFollowings(data.data)
      }
     catch(error){
      console.log("Error fetching followers details", error)
     }
    } else {
      console.warn("No access token available.");
    }
  }

  return (
    <div className="homePage">
      <Navbar greetings={greetings} />
      <br />
      <div className="">
        <Row className="homePageTop">
          <Col xs={12} md={3} lg={3}>
            <Card>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>{user.name}</Card.Title>
                <Card.Title>{user.email}</Card.Title>
                <Card.Text>
                  This is a longer card with supporting text below as a natural
                  lead-in to additional content. This content is a little bit
                  longer.
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={5} lg={5}>
            <form>
              <input placeholder="Title" name="title" onChange={handleChange} />
              <input placeholder="Blogs" name="textBody" onChange={handleChange}/>
              <button onClick={handleSubmit}>Post</button>
            </form>
            <Dropdown>
              <Dropdown.Toggle variant="success" id="dropdown-basic">
                Sort blogs
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={showMyBlogs} >My Blogs</Dropdown.Item>
                <Dropdown.Item onClick={showGetBlogs} >All Blogs</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            {
              blogs.map((blog, _id)=>(
                <Card key={_id}>
                  <Card.Img variant="top" src="" />
                  <Card.Body>
                    <Card.Title>{blog.title}</Card.Title>
                    <Card.Text>{blog.textBody}</Card.Text>
                    <hr/>
                    <span className="blogReactions" style={{display:"flex", flexDirection:"row", justifyContent:"space-evenly"}}><EditOutlined onClick={handleShow}/> <DeleteOutlined /> <LikeOutlined /> <DislikeOutlined /><CommentOutlined /> </span>
                    <Modal show={show} onHide={handleClose}>
                      <Modal.Header closeButton>
                        <Modal.Title>Modal heading</Modal.Title>
                      </Modal.Header>
                      <Modal.Body>Woohoo, you are reading this text in a modal!</Modal.Body>
                      <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                          Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                          Save Changes
                        </Button>
                      </Modal.Footer>
                    </Modal>
                  </Card.Body>
            </Card>
              ))
            }
            
          </Col>
          <Col xs={12} md={3} lg={3}>
            <Card>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>Followers</Card.Title>
                <div>
                  <ul>
                  {
                    followers.map((follower)=>(
                      <li key={follower._id}>
                        <span>{follower.name}<Button>Follow</Button> </span>
                      </li>
                    ))
                  }
                  </ul>
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>Followings</Card.Title>
                <div>
                {followings.length === 0 ? (
                  <p>No followings available.</p>
                ) : (
                  <ul>
                    {followings.map((following) => (
                      <li key={following._id}>
                        <span>
                          {following.name}{' '}
                          <Button onClick={() => handleUnfollow(following._id)}>Unfollow</Button>{' '}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                </div>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src="" />
              <Card.Body>
                <Card.Title>Friends Suggestions</Card.Title>
                <div>
                {followers.length === 0 ? (
                  <p>No friend suggestions available.</p>
                ) : (
                  <ul>
                    {followers.map((follower) => (
                      <li key={follower._id}>
                        <span>
                          {follower.name}{' '}
                          <Button onClick={() => handleFollow(follower._id)}>Follow</Button>{' '}
                        </span>
                      </li>
                    ))}
                  </ul>
                )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;
