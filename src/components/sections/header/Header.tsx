import React from 'react';
import {Logo} from "../../../assets/images";
import './Header.styles.scss';
import {Button} from "../../common/button";
import scrollToElement from "../../../utils/scrollToElement";

function scrollToUsersSection () {
  scrollToElement('usersSection');
}

function scrollToSignUpForm () {
  scrollToElement('signUpFormSection');
}

export default function Header() {
  return (
    <header>
      <div className="container">
        <a href="/public" className="mainPageLink">
          <img src={Logo} alt="TESTTASK" width={104} height={26}/>
        </a>

        <div className="buttonsWrapper">
          <Button text="Users" onClick={scrollToUsersSection}/>
          <Button text="Sign up" onClick={scrollToSignUpForm}/>
        </div>
      </div>
    </header>
  );
}
