import React, {useCallback, useEffect, useRef, useState} from 'react';
import {Form, Formik, FormikProps} from "formik";

import './SignUpForm.styles.scss';

import {Api} from "../../api";
import {IPosition, ISignUpRequest} from "../../entities";
import validationSchema from "./formValidation";
import {InputField} from "../form/inputField";
import {SubmitButton} from "../form/submitButton";
import {RadioFieldsGroup} from "../form/radioFieldsGroup";
import UploadPhotoField from "../form/uploadPhotoField/UploadPhotoField";
import {Loader} from '../common/loader';
import {SuccessImage} from "../../assets/images";
import {Title} from "../common/title";
import {trigger} from "../../utils/events";

interface IForm {
  name: string
  email: string
  phone: string
  positionId: number
  photo: File | null
}

export default function SignUpForm() {
  const [positionsLoadingError, setPositionsLoadingError] = useState<boolean>(false)
  const [successfullySignedUp, setSuccessfullySignedUp] = useState<boolean>(false)
  const [initialValues, setInitialValues] = useState<IForm>()
  const [serverError, setServerError] = useState<string>('')

  const positionsListRef = useRef<IPosition[]>([]);

  const getPositionsList = useCallback(async () => {
    const response = await Api.getPositions();

    if (response.statusCode !== 200) {
      setPositionsLoadingError(true)
    } else {
      positionsListRef.current = response.data
      setInitialValues({
        name: '',
        email: '',
        phone: '',
        positionId: positionsListRef.current[0].id,
        photo: null
      })
    }
  }, [])

  useEffect(() => {
    getPositionsList()
  }, [])

  const onSubmit = useCallback(async (values: IForm) => {
    setServerError('');
    const tokenResponse = await Api.getToken();

    if (tokenResponse.statusCode === 200) {
      const signUpResponse = await Api.signUp(values as ISignUpRequest);

      if (signUpResponse.statusCode >= 200 && signUpResponse.statusCode < 300) {
        setSuccessfullySignedUp(true)
        trigger("userSignedUp", undefined);
      } else {
        setServerError(signUpResponse.error || 'Something went wrong')
      }
    }
  }, [])

  function renderForm({
    values,
    errors,
    setFieldValue,
  }: FormikProps<IForm>) {
    return (
      <Form>
        <InputField
          type="text"
          name="name"
          placeholder="Your name"
          value={values.name}
          onChange={setFieldValue}
          error={errors.name}
        />
        <InputField
          type="email"
          name="email"
          placeholder="Email"
          value={values.email}
          onChange={setFieldValue}
          error={errors.email}
        />
        <InputField
          type="tel"
          name="phone"
          placeholder="Phone"
          value={values.phone}
          onChange={setFieldValue}
          hint="+38 (XXX) XXX - XX - XX"
          extraClassName="phoneField"
          error={errors.phone}
        />
        <RadioFieldsGroup
          name="positionId"
          label="Select your position"
          value={values.positionId}
          onChange={setFieldValue}
          data={positionsListRef.current}
        />
        <div className="uploadPhotoFieldWrapper">
          <UploadPhotoField
            name="photo"
            value={values.photo}
            onChange={(file: File) => setFieldValue('photo', file)}
            error={errors.photo}
          />
        </div>
        <div className="submitButtonWrapper">
          <SubmitButton disabled={Object.keys(errors).length > 0} text="Sign up"/>
          {serverError && <p className="serverError">{serverError}</p>}
        </div>
      </Form>
    )
  }

  return (
    <div className="signUpForm">
      {!initialValues && !positionsLoadingError && <Loader />}

      {positionsLoadingError && <p>Failed to load positions</p>}

      {!successfullySignedUp && initialValues && (
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={validationSchema()}
        >
          {renderForm}
        </Formik>
      )}

      {successfullySignedUp && (
        <div className="successfullySignedUp">
          <Title text="You have successfully signed up!" level={2} />
          <img src={SuccessImage} alt="success"/>
        </div>
      )}
    </div>
  );
}
