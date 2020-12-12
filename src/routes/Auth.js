import { authService } from 'myBase';
import React, { useState } from 'react';

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const [error, setError] = useState("");
    const onChange = (event) => {
        const {target: {name, value}} = event;
        if(name === "email"){
            setEmail(value)
        } else if(name==="password"){
            setPassword(value);
        }
    }
    const onSubmit = async (event) => {
        event.preventDefault();
        let data;
        try{
            if(newAccount){
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch (error){
            setError(error.message);
        }
    }
    const toggleAccount = () => setNewAccount(prev => !prev);
    return (
        <div>
            Auth
            <form onSubmit={onSubmit}>
                <input 
                    name="email"
                    type="email" 
                    placeholder="Email" 
                    required={email} 
                    onChange={onChange}
                />
                <input 
                    name="password"
                    type="password" 
                    placeholder="Password" 
                    required={password} 
                    onChange={onChange}
                />
                <input type="submit" value={newAccount ? "Create Account" : "Log In"} />
                {error}
            </form>
            <button onClick={toggleAccount}>
                {newAccount ? "Sign In" : "Create Account"}
            </button>
            <div>
                <button>Continue with Google</button>
                <button>Continue with Github</button>
            </div>
        </div>
    );
}
export default Auth;