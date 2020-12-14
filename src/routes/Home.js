import Ctweet from 'components/Ctweet';
import {v4 as uuidv4} from "uuid";
import { dbService, storageService } from 'myBase';
import React, { useEffect, useState } from 'react';

const Home = ({userObj}) => {
    const [ctweet, setCtweet] = useState("");
    const [ctweets, setCtweets] = useState([]);
    const [attachment, setAttachment] = useState("");
    useEffect(() => {
        dbService.collection("Ctweet").orderBy("createdAt","desc").onSnapshot((snapshot) => {
            const CtweetArray = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            setCtweets(CtweetArray);
        })
    },[]);
    const onSubmit = async (event) => {
        event.preventDefault();
        let attachmentUrl = "";
        if(attachment !== ""){
            const attachmentRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`); 
            const response = await attachmentRef.putString(attachment, "data_url");
            attachmentUrl = await response.ref.getDownloadURL();
        }
        const CtweetObj = {
            text: ctweet,
            createdAt: Date.now(),
            creatorId: userObj.uid,
            attachmentUrl
        };
        await dbService.collection("Ctweet").add(CtweetObj);
        setCtweet("");
        setAttachment("");
    }
    const onChange = (event) => {
        const { target: {value}} = event;
        setCtweet(value);
    }
    const onFileChange = (event) => {
        const {target:{files}} = event;
        const theFile = files[0];
        const reader = new FileReader();
        reader.onloadend = (finishedEvent) => {
            const {currentTarget: {result}} = finishedEvent;
            setAttachment(result);
        }
        reader.readAsDataURL(theFile);
    }
    const onClearAttachment = () => {
        setAttachment("");
    }
    return (
        <div>
            <form onSubmit={onSubmit}>
                <input value={ctweet} onChange={onChange} type="text" placeholder="What's on your mind?" maxLength={120} />
                <input type="file" accept="image/* " onChange={onFileChange} />
                <input type="submit" value="Ctweet"  />
                {attachment && (
                    <div>
                        <img src={attachment} width="50px" height="50px" />
                        <button onClick={onClearAttachment}>Clear</button>
                    </div>
                )}
            </form>
            <div>
                {ctweets.map((ctweet) => (
                    <Ctweet key={ctweet.id} CtweetObj={ctweet} isOwner={ctweet.creatorId === userObj.uid}/>
                ))}
            </div>
        </div>
    );
}
export default Home;