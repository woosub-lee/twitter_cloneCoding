import { dbService } from 'myBase';
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {
    const [ctweet, setCtweet] = useState("");
    const [ctweets, setCtweets] = useState([]);
    useEffect(() => {
        dbService.collection("Ctweet").onSnapshot((snapshot) => {
            const CtweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCtweets(CtweetArray);
        })
    },[]);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("Ctweet").add({
            text: ctweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
        });
        setCtweet("");
    }
    const onChange = (event) => {
        const { target: {value}} = event;
        setCtweet(value);
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={ctweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="submit" value="Ctweet" />
            </form>
            <div>
                {ctweets.map((ctweet) => (
                    <div key={ctweet.id}>
                        <h4>{ctweet.text}</h4>
                    </div>
                ))}
            </div>
        </div>
    );
}
export default Home;