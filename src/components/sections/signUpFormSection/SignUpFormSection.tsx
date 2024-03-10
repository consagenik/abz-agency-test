import React from 'react';

import './SignUpFormSection.styles.scss';

import {Title} from "../../common/title";
import {SignUpForm} from "../../signUpForm";

export default function SignUpFormSection() {
  return (
    <section id="signUpFormSection">
      <Title text="Working with POST request" level={2} />
      <SignUpForm />
    </section>
  );
}
