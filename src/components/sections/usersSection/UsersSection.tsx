import React, {useCallback, useEffect, useRef, useState} from 'react';

import './UsersSection.styles.scss';

import {Api} from "../../../api";
import {IUser} from "../../../entities";

import {Title} from "../../common/title";
import {Button} from "../../common/button";
import {UserCard} from "../../userCard";
import {Loader} from "../../common/loader";
import {on} from "../../../utils/events";

export default function UsersSection() {
  const [pageNumber, setPageNumber] = useState<number>(1)
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [loadingError, setLoadingError] = useState<boolean>(false)
  const [allUsersLoaded, setAllUsersLoaded] = useState<boolean>(false)

  const usersRef = useRef<IUser[]>([])

  const getUsers = useCallback(async (page: number) => {
    setIsLoading(true)
    setLoadingError(false)
    const response = await Api.getUsers(page, 6)

    if (response.statusCode === 200) {
      usersRef.current = page === 1 ? response.data : usersRef.current.concat(response.data)

      if (usersRef.current.length + 6 > response.pagesNumber! * 6) {
        setAllUsersLoaded(true)
      }
    } else {
      setLoadingError(true)
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    on("userSignedUp", () => {
      setPageNumber(1);
      setAllUsersLoaded(false);
      getUsers(1);
    });
  }, []);

  useEffect(() => {
    getUsers(pageNumber)
  }, [pageNumber])

  const handleClickShowMore = useCallback(() => {
    setPageNumber((prev) => prev + 1)
  }, [])

  return (
    <section id="usersSection">
      <div className="container">
        <Title text="Working with GET request" level={2} />

        <div className="usersList">
          {usersRef.current.map(user => <UserCard user={user} key={user.id}/>)}
        </div>

        {loadingError && <p>Something went wrong</p>}

        {isLoading ? <Loader /> : !allUsersLoaded && !loadingError && (
          <Button
            text="Show more"
            onClick={handleClickShowMore}
            disabled={isLoading}
          />
        )}
      </div>
    </section>
  );
}
