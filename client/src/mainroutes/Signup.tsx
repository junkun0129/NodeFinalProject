import * as React from 'react';
import { Component } from 'react';
import { useState, useEffect } from 'react';

function Signup() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("");

    const submitForm = (e:React.SyntheticEvent)=>{

        e.preventDefault();


    }


    return ( 
        <>
            <h1>Signup</h1>
            <form onSubmit={submitForm}>
                <input type="text" name='email' onChange={(e)=>setEmail(e.target.value)}/>
                <input type="text" name='password' onChange={(e)=>setPassword(e.target.value)}/>
                <button>button</button>
            </form>
        
        </>
     );
}

export default Signup;