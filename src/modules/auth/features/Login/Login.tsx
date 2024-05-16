import CardBalance from "@src/modules/shared/components/Cards/Card-BALANCE/Card-balance"
import UniverseWrapper from "@src/modules/shared/layout/UniverseWrapper"
import { useState, useEffect } from "react";
import { supabase } from "@src/modules/shared/utils/supabase";
import { PATH } from "../../routes/paths";
import './_Login.scss'
import GithubIcon from "@src/modules/shared/assets/icons/github";
const Login = () => {
  const location= window.location;
  console.log(location);
  async function signInWithGithub() {
    try {
      await supabase.auth.signInWithOAuth({
        provider: 'github',
        options: {
        redirectTo: `${location.origin!}${PATH.LOGIN}`
  }});
    } catch(error) {
      console.log(error)
    }
    }
  return (
      <CardBalance>
      
          <p className="login-module__card__title">Welcome</p>
          <p className="login-module__card__descr">Login via your Github account to get started with our app</p>
          <button className="login-module__button" onClick={signInWithGithub}>
            <GithubIcon style={{width:'2rem'}}/>
             <p className="text-button-module">login with github</p>
          </button>
      </CardBalance>
  )
}


export default Login;
