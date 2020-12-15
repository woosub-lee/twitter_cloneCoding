import { authService } from 'myBase';
import React, { Fragment, useState } from 'react';
import { useHistory } from 'react-router-dom';

const Profile = ({refreshUser, userObj}) => {
    const history = useHistory();
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    /*const getMyCtweets = async () => {
        const ctweets = await dbService
            .collection("Ctweet")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt","desc")
            .get();
    };*/
    const onChange = (event) => {
        const {target:{value}} = event;
        setNewDisplayName(value);
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        if (userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }
    }
    /*useEffect(() => {
        getMyCtweets();
    },[]);*/
    return (
        <>
        <div className="container">
            <form onSubmit={onSubmit} className="profileForm">
                <input 
                    type="text" 
                    placeholder="Display name" 
                    value={newDisplayName} 
                    onChange={onChange} 
                    autoFocus 
                    className="formInput"
                />
                <input
                    type="submit"
                    value="Update Profile"
                    className="formBtn"
                    style={{
                        marginTop: 10,
                    }}
                />
            </form>
            <span className="formBtn cancelBtn logOut" onClick={onLogOutClick}>
                Log Out
            </span>
        </div>
        </>
    );
};
export default Profile;