import { dbService, storageService } from "myBase";
import React, { Fragment, useState } from "react";

const Ctweet = ({CtweetObj, isOwner}) => {
    const [editing, setEditing] = useState(false);
    const [newCtweet, setNewCtweet] = useState(CtweetObj.text);
    const onDeleteClick = async () => {
        const ok = window.confirm("Are you sure you want to delete this?");
        if(ok){
            await dbService.doc(`Ctweet/${CtweetObj.id}`).delete();
            await storageService.refFromURL(CtweetObj.attachmentUrl).delete();
        }
    }
    const toggleEditing = () => setEditing((prev) => !prev);
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.doc(`Ctweet/${CtweetObj.id}`).update({
            text: newCtweet
        })
        setEditing(false);
    }
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewCtweet(value);
    }
    return (
        <div>
            {editing ? (
                <Fragment>
                    {isOwner &&
                        <Fragment>
                            <form onSubmit={onSubmit}>
                                <input type="text" placeholder="Edit your Ctweet" value={newCtweet} required onChange={onChange} />
                                <input type="submit" value="Update Ctweet" />
                            </form>
                            <button onClick={toggleEditing}>Cancel</button>
                        </Fragment>
                    }
                </Fragment>
            ):(
                <Fragment>
                    {CtweetObj.attachmentUrl && (
                        <img src={CtweetObj.attachmentUrl} width="50px" height="50px" />
                    )}
                    <h4>{CtweetObj.text}</h4>
                    {isOwner && ( 
                        <Fragment>
                            <button onClick={onDeleteClick}>Delete Ctweet</button>
                            <button onClick={toggleEditing}>Edit Ctweet</button>
                        </Fragment>
                    )}
                </Fragment>
            )}
            
        </div>
    );
};

export default Ctweet;