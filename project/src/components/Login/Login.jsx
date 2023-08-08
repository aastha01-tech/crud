import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './login.css';

function Login() {
    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const login = async () => {
        try {
            const data = { name, password };
            if (!name || !password) {
                toast.error('Please fill in all fields.');
                return;
            }

            const response = await fetch('http://localhost:8080/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            const result = await response.json();
            console.log(result)
            const token = result.user.tokens[0].token;

            console.log(token);

            window.localStorage.setItem('token', token);
                toast.success('Login was done successfully...');
              
            setTimeout(() => {
                navigate('/users')
            }, 5000)
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
    };


    return (
        <>
            <section className='login-background py-3'>
                <div className='row mx-auto'>
                    <div className='col-md-5'>
                        <img src='https://shipsagar.com/images/order-status1.png' alt='...' />
                    </div>
                    <div className='col-md-4 mt-5'>
                        <Card className='p-3 login-card' shadow style={{background:"none"} } >
                            <h2 className='text-center' >Login Here</h2>

                            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control type='text' placeholder='Client Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                            </Form.Group>
                            <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                                <Form.Label>Password</Form.Label>
                                <Form.Control type='password' placeholder='Password' value={password} onChange={(e) => { setPassword(e.target.value) }} />
                            </Form.Group>
                            <button className='btn btn-success text-center w-100' onClick={login}>Login</button>
                            <p className="small mb-3 pb-lg-2">
                                <Link className="text-muted" to="/reset">Forgot password..</Link>
                            </p>
                        </Card>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </>
    );
}

export default Login;
