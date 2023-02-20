import React from 'react';
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Base_Post_Url } from '../../../constants/url/BaseUrl';
import '../../../styles/profile/styles.scss';
import ProfilesPost from './ProfilesPost';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';




function ProfileDetails() {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    const authToken = localStorage.getItem('auth')
    const token = JSON.parse(authToken).accessToken;

    let navigate = useNavigate();
    let { name } = useParams();
    


    if(!name){
    navigate("/home");
    }

    const url = `${Base_Post_Url}profiles/${name}`;
    

    useEffect(() => {
        async function fetchData() {
            try{
                const response = await fetch(url, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log(response)

                if(response.ok){
                    const json = await response.json();
                    setProfile(json);
                    console.log(name)
                }

            }catch(error){
                setError(error);
            }finally{
                setLoading(false);
            }
        }
        fetchData();
    }, [name, url, token])



     if (loading) {
    return <div>Loading...</div>;
    }

    if (error) {
        return <div>An error occured: {error}</div>;
    }
    if (!profile) {
    return <div>profile not found</div>;
    }
    return (
        <>
        <Container>
      <Row>
        <Col sm={10} className='dashboard-container'>
          <div className='dbh1'>
            <div className='dashboard-banner'>
              <img src={profile.banner || 'https://images.unsplash.com/photo-1497802176320-541c8e8de98d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1015&q=80'} alt={profile.banner} />
            </div>
            <div className='dbh-prof-details'>
              <div>
                <button className='dashboard-avatar'>
                  <img src={profile.avatar || 'https://images.unsplash.com/photo-1628260412297-a3377e45006f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1674&q=80'} alt={profile.avatar} />
                </button>
              </div>
              <div className='dashboard-details'>
                <div className='dash-count'>
                  <div className='posts'>
                    <p>Post 
                      <span>{profile._count.posts}</span>
                    </p>
                  </div>
                  <div className='Following'>
                    <p>Following 
                      <span>{profile._count.following}</span>
                    </p>
                  </div>
                  <div className='Followers'>
                    <p>Followers 
                      <span>{profile._count.followers}</span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className='profile-post-container'>
                 <ProfilesPost profName={profile.name}/>
            </div>
          </div>
        </Col> 
      </Row>
    </Container> 
        </>
    )
}

export default ProfileDetails;