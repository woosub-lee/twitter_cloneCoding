import Ctweet from 'components/Ctweet';
import { dbService } from 'myBase';
import React, { useEffect, useState } from 'react';
import CtweetWriter from 'components/CtweetWriter';
import GoogleSearcher from 'components/GoogleSearcher';

const Home = ({userObj}) => {
    const [ctweets, setCtweets] = useState([]);
    useEffect(() => {
        dbService.collection("Ctweet").orderBy("createdAt","asc").onSnapshot((snapshot) => {
            const CtweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCtweets(CtweetArray);
        })
    },[]);
    const onYoutubeClick = () => {
        window.open(`https://youtube.com`,"_self");
    }
    const onGoogleClick = () => {
        window.open(`https://google.com/`,"_self");
    }
    const onClassroomClick = () => {
        window.open(`https://classroom.google.com/`,"_self");
    }
    const onGithubClick = () => {
        window.open(`https://github.com/`,"_self");
    }
    return (
        <div className="container">
            <GoogleSearcher />
            <CtweetWriter userObj={userObj}/>
            <span onClick={onYoutubeClick} className="ClickBtn RedBtn">
                Go To Youtube
            </span>
            <span onClick={onGoogleClick} className="ClickBtn GreenBtn">
                Go To Google
            </span>
            <span onClick={onClassroomClick} className="ClickBtn">
                Go To ClassRoom
            </span>
            <span onClick={onGithubClick} className="ClickBtn WhiteBtn">
                Go To Github
            </span>
            <div style={{ marginTop: 30 }}>
                {ctweets.map((ctweet) => (
                    <Ctweet key={ctweet.id} CtweetObj={ctweet} isOwner={ctweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
}
export default Home;