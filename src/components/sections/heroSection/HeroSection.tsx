import React, {useEffect, useState} from 'react';

import './HeroSection.styles.scss';

import Title from "../../common/title/Title";
import Text from "../../common/text/Text";
import Button from "../../common/button/Button";
import scrollToElement from "../../../utils/scrollToElement";
import {HeroBG, HeroBGPlaceholder} from "../../../assets/images";

function scrollToSignUpForm () {
  scrollToElement('signUpFormSection');
}

export default function HeroSection() {
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const img = new Image()
    img.src = HeroBG
    img.onload = () => setIsLoading(false)
  }, []);

  return (
    <section id="heroSection">
      <div
        className="container"
        style={{
          background: `linear-gradient(0deg, rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${isLoading ? HeroBGPlaceholder : HeroBG}) no-repeat bottom center`,
          backgroundSize: 'cover'
        }}
      >
        <div className="contentWrapper">
          <Title text="Test assignment for front-end developer" />
          <div className="textWrapper">
            <Text color="white" text="What defines a good front-end developer is one that has skilled knowledge of HTML, CSS, JS with a vast understanding of User design thinking as they'll be building web interfaces with accessibility in mind. They should also be excited to learn, as the world of Front-End Development keeps evolving." />
          </div>
          <Button text="Sign up" onClick={scrollToSignUpForm} />
        </div>
      </div>
    </section>
  );
}
