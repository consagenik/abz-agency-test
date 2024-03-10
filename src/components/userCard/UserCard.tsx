import React from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';

import './UserCard.styles.scss';

import {IUser} from "../../entities";

export interface IUserCardProps {
  user: IUser
}

export default function UserCard({user}: IUserCardProps) {
  return (
    <div className="userCard">
      <div className="userPhotoWrapper">
        <LazyLoadImage
          src={user.photo} // the source of the image
          alt={user.name} // alternative text for the image
          effect="blur" // effect used when the image is loading (optional)
          height={70} // height of the image (optional)
          width={70} // width of the image (optional)
        />
      </div>
      <p>{user.name}</p>
      <div className="additionalInformation">
        <p>{user.position}</p>
        <p>{user.email}</p>
        <p>{user.phone}</p>
      </div>
    </div>
  );
}
