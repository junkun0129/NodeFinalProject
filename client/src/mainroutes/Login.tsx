import * as React from 'react';
import { Component, useState } from 'react';
function Login() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmit, setIsSubmit] = useState<boolean>(false)

    const loginsubmit = (e:React.SyntheticEvent):void=>{
        e.preventDefault();
        setIsSubmit(true);

    }
    return ( 
        <>
            <h1>login</h1>
            <form onSubmit={loginsubmit}>
                <input type="text" name='email' onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" name='password' onChange={(e)=>setPassword(e.target.value)}/>
                <button type='submit'>buton</button>
            </form>
        </>
     );
}

export default Login;