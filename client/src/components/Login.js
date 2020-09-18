import React, {useState} from "react";
import { useHistory } from "react-router-dom";
import {axiosWithAuth} from '../utils/axiosWithAuth'

const initialValue = {
  username:'',
  password:''
}


const Login = () => {
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  const [value,setValue] = useState(initialValue)
  const history = useHistory()

  const handleChanges = e => {
    setValue({...value,[e.target.name]:e.target.value})
  }

  const onSubmit = e => {
    e.preventDefault()
    axiosWithAuth()
    .post('/api/login',value)
    .then(res => {
       window.localStorage.setItem('token',res.data.payload)
       history.push('/bubble')
    })
    .catch(err => {
        console.log(err)
    })
  }


  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          Username:&nbsp;
          <input
            type="text"
            name="username"
            value={value.username}
            onChange={handleChanges}
          />
          Password:&nbsp;
          <input
            type="password"
            name="password"
            value={value.password}
            onChange={handleChanges}
          />
          <button>Log in</button>
        </form>
      </div>
    </>
  );
};

export default Login;
