import { dbService, storageService } from "myBase";
import React, { Fragment, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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
        <>
        <div className="ctweet">
            {editing ? (
                <Fragment>
                    {isOwner &&
                        <Fragment>
                            <form onSubmit={onSubmit} className="container ctweetEdit">
                                <input 
                                    type="text" 
                                    placeholder="Edit your Ctweet" 
                                    value={newCtweet} 
                                    required
                                    autoFocus 
                                    onChange={onChange} 
                                    className="formInput" />
                                <input type="submit" value="Update Ctweet" className="formBtn" />
                            </form>
                            <span onClick={toggleEditing} className="formBtn cancelBtn">
                                Cancel
                            </span>
                        </Fragment>
                    }
                </Fragment>
            ):(
                <Fragment>
                    <h4>{CtweetObj.text}</h4>
                    {CtweetObj.attachmentUrl && <img src={CtweetObj.attachmentUrl} />}
                    {isOwner && ( 
                        <Fragment>
                            <div className="ctweet__actions">
                                <span onClick={onDeleteClick}>
                                    <FontAwesomeIcon icon={faTrash} />
                                </span>
                                <span onClick={toggleEditing}>
                                    <FontAwesomeIcon icon={faPencilAlt} />
                                </span>
                            </div>
                        </Fragment>
                    )}
                </Fragment>
            )}
            
        </div>
        </>
    );
};

export default Ctweet;