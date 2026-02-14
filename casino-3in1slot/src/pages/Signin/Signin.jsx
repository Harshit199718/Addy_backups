import React from 'react'
import { BgLine, LoginInput, SignInBox, SignInContainer } from './Signin.styled'
import signinLeft from "../../assets/images/signin-left.png"
import signinRight from "../../assets/images/signin-right.png"

function Signin() {
  return (
    <SignInContainer>
      <SignInBox>
        <img className="box-img img-left" src={signinLeft} alt="" />
        <img className="box-img img-right" src={signinRight} alt="" />
        <div className='bg-lines'>
          <BgLine $size="1vmin" />
          <BgLine $size="2.4vmin" />
          <BgLine $size="1vmin" />
        </div>
        <LoginInput>
          Username
          <div className="input-container">
            <input type="text" placeholder='Enter Username' />
          </div>
        </LoginInput>
        <LoginInput>
          Password
          <div className="input-container">
            <input type="password" placeholder='Enter Password' />
          </div>
        </LoginInput>
      </SignInBox>
    </SignInContainer>
  )
}

export default Signin