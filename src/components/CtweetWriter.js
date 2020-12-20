import { dbService, storageService } from "myBase";
import React, { useState } from "react";
import {v4 as uuidv4} from "uuid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faTimes } from "@fortawesome/free-solid-svg-icons";

const CtweetWriter = ({userObj}) => {
    const [attachment, setAttachment] = useState("");
    const [ctweet, setCtweet] = useState("");
    const onSubmit = async (event) => {
        if (ctweet === "") {
            return;
        }
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
            displayName: userObj.displayName,
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
    return(
        <>
        <form onSubmit={onSubmit} className="writerForm">
            <div className="writerInput__container">
                <input
                    className="writerInput__input"
                    value={ctweet}
                    onChange={onChange}
                    type="text"
                    placeholder="What's on your mind?"
                    maxLength={120}
                />
                <input type="submit" value="&rarr;" className="writerInput__arrow" />
            </div>
            <label htmlFor="attach-file" className="writerInput__label">
                <span>Add photos</span>
                <FontAwesomeIcon icon={faPlus} />
            </label>
            <input id="attach-file"
                type="file"
                accept="image/*"
                onChange={onFileChange}
                style={{
                    opacity: 0,
                }}
            />
            {attachment && (
                <div className="writerForm__attachment">
                    <img
                        src={attachment}
                        style={{
                            backgroundImage: attachment,
                        }}
                    />
                    <div className="writerForm__clear" onClick={onClearAttachment}>
                        <span>Remove</span>
                        <FontAwesomeIcon icon={faTimes} />
                    </div>
                </div>
            )}
        </form>
        </>
    );
};
export default CtweetWriter;