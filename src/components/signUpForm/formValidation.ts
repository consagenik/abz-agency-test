import * as Yup from 'yup';

const emailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
const phoneRegExp = /^\+38\d{10}$/
const MAX_FILE_SIZE = 5_120_000;

const validationSchema = () => Yup.object({
  name: Yup.string().required("Required"),
  email: Yup.string().matches(emailRegExp, 'Email is not valid').required("Required"),
  phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("Required"),
  photo: Yup.mixed().required('Required').test("is-valid-size", "Max allowed size is 100KB",
    (value: any) => value && value.size <= MAX_FILE_SIZE),
});

export default validationSchema;
