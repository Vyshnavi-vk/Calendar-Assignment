import React from 'react'

const Login = () => {
    return (
        <div className='container'>
            <h1>Welcome to Meetify!! </h1>
            <p>A single place where you can manage all your meetings</p>
            <button className='signIn' onClick={() => window.location.href = 'http://localhost:5000/api/google/auth'}>Sign in with Google</button>
        </div>
    )
}

export default Login
