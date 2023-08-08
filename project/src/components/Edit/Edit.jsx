import React, { useEffect, useState } from 'react';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate, Link } from 'react-router-dom';
import { useParams } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Edit() {
const [name,setName] = useState('')
const navigate = useNavigate('')
const params = useParams()

const getDetails = async()=>{
    let result = await fetch(`http://localhost:8080/user/${params.id}`)
    result = await result.json()
    console.log(result)
        setName(result.name)
}
const update=async()=>{
  try {
            let response = await fetch(`http://localhost:8080/user/${params.id}`, {
                method: 'put',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name }),
            });
            let result = await response.json();
      console.log(result);
      toast.success('Record updaed successfully...')
      setTimeout(() => {
          navigate('/users')
      },4000)
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.');
        }
}

useEffect(()=>{
getDetails()
},[])
    return (
        <>
            <section className='login-background py-3'>
                <div className='row mx-auto'>
                    <div className='col-md-5'>
                        <img src='https://shipsagar.com/images/order-status1.png' alt='...' />
                    </div>
                    <div className='col-md-4 mt-5'>
                        <Card className='p-3 login-card' shadow style={{background:"none"} } >
                            <h2 className='text-center' >Update Record</h2>

                            <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control type='text' placeholder='Client Name' value={name} onChange={(e) => { setName(e.target.value) }} />
                            </Form.Group>
                            <button className='btn btn-success text-center w-100' onClick={update}>Update Now</button>
                            
                        </Card>
                    </div>
                </div>
            </section>
            <ToastContainer/>
        </>
    );
}

export default Edit;
