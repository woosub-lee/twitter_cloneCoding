import Ctweet from 'components/Ctweet';
import { dbService } from 'myBase';
import React, { useEffect, useState } from 'react';
import CtweetWriter from 'components/CtweetWriter';

const Home = ({userObj}) => {
    const [ctweets, setCtweets] = useState([]);
    useEffect(() => {
        dbService.collection("Ctweet").orderBy("createdAt","desc").onSnapshot((snapshot) => {
            const CtweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCtweets(CtweetArray);
        })
    },[]);
    
    return (
        <div className="container">
            <CtweetWriter userObj={userObj}/>
            <div style={{ marginTop: 30 }}>
                {ctweets.map((ctweet) => (
                    <Ctweet key={ctweet.id} CtweetObj={ctweet} isOwner={ctweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
}
export default Home;