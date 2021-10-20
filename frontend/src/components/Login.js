import React,{useState} from 'react'
import "./Login.css"
import Products from "./Products"

import { Redirect} from 'react-router';

import api from '../features/api'

const Login = () => {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [emailLog,setEmailLog] = useState("");
    const [passwordLog,setPasswordLog] = useState("");
  
 
    const handleSubmit = () => {
        registerUser();
        setEmail("");
        setPassword("");
    };
    const handleLogin = (e) => {
        loginUser();
    };
    
    async function registerUser(){
        const response = await api.post('/auth/register',{
            name:name,
            email:email,
            password:password,
        }).catch(function(error){
            console.log(error)
        });
        localStorage.setItem('token',response.data);
        console.log(response.data);
        return response;
    }


    async function loginUser(){
        const response = await api.post('/auth/authenticate',{
            email:emailLog,
            password:passwordLog,
        }).catch(function(error){
            localStorage.setItem('ruim',"response.data.token");
        });
        localStorage.setItem('test',response);
        localStorage.setItem('token',response.data.token);
        return response;
    }

    return (
        <div className='login'>
            <section>
            <div className="column" >
            <form className='login_form' onSubmit={(e)=> handleSubmit(e)}>
                <h1>
                    Register
                </h1>
                <input type="name" placeholder="Name" value={name} onChange={(e)=> setName(e.target.value)}/>
                <input type="email" placeholder="Email" value={email} onChange={(e)=> setEmail(e.target.value)}/>
                <input type="password" placeholder="Password" value={password} onChange={(e)=> setPassword(e.target.value)}/>
                <button type="submit" className="submit_btn">Submit</button>
            </form>
            </div>
            <div className="column" >
            <form className='login_form' onSubmit={(e)=> handleLogin(e)}>
                <h1>
                    Login
                </h1>
                <input type="email" placeholder="Email" value={emailLog} onChange={(e)=> setEmailLog(e.target.value)}/>
                <input type="password" placeholder="Password" value={passwordLog} onChange={(e)=> setPasswordLog(e.target.value)}/>
                <button type="submit" className="submit_btn">Login</button>
            </form>
            </div>
            </section>
        </div>
    )
}

export default Login
