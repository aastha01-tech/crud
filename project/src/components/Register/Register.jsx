import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Register() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const register = async () => {

        // Basic validation to check for empty fields
        if (!name || !password) {
            toast.error('Please fill in all fields.');
            return;
        }

        try {
            let response = await fetch('http://localhost:8080/register', {
                method: 'post',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name, password }),
            });
            let result = await response.json();
            toast.success('Registration Successful!'); 
            window.localStorage.setItem('student', JSON.stringify(result));
            setTimeout(() => {
                navigate('/login')
            }, 5000)
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };

    const login = () => {
        navigate('/login')
    }

    return (
        <>
            <section className='login-background py-3'>
                <div className='row mx-auto'>
                    <div className='col-md-2'></div>
                    <div className='col-md-5'>
                        <img src='https://shipsagar.com/images/order-status1.png' alt='...' />
                    </div>
                    <div className='col-md-4 mt-5'>
                        <Card className='p-3 login-card' shadow style={{ background: "none" }} >
                            <h2 className='text-center' >Register Now</h2>
                            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control type='text' placeholder='Client Name' style={{ background: "none", borderBottom: "1px solid gray", }} value={name} onChange={(e) => { setName(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password'
                                    style={{ background: "none", borderBottom: "1px solid gray" }}
                                    placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </Form.Group>
                            <div className='d-flex text-center' >
                                <button className='btn btn-success text-center w-25' onClick={register}>Register</button>&nbsp; &nbsp;
                                <button className='btn btn-secondary text-center w-25' onClick={login}>Login</button></div>
                        </Card>
                    </div>
                </div>
            </section>
            <ToastContainer />
        </>
    );
}

export default Register;



<div className='col-md-5'>
                        <img src='http://app.shipsagar.com/static/media/login-bg.089180df44137b8704af.jpg' alt='...' />
                    </div>