import React, { useState } from 'react';
import { useFormik } from 'formik';
import UserApi from 'utils/API/UserApi';
import { getJwt } from 'utils/cookies';
import {
  validateDate,
  validateName,
} from 'components/validateCheck/validateForm';
import { redirectToUrl } from '../../../utils/baseAPI';
import { useSelector } from 'react-redux';
import { userSelector } from '../../../redux/user/selector';
import Container from '../../Container';
import '../styled.css';
import BackButton from '../../Button';
import { Alert } from '../../AlertWindow/Alert';

const ChangeData = () => {
  const { username } = useSelector(userSelector);
  const [showModal, setShowModal] = useState(false);
  const Token = getJwt();
  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      birth: '',
    },
    validate: values => {
      const errors = {};
      if (!validateName(values.firstName)) {
        errors.firstName = 'Имя введено неверно';
      }
      if (!validateName(values.lastName)) {
        errors.lastName = 'Фамилия введена неверно';
      }
      if (!validateDate(values.birth)) {
        errors.birth = 'Введите дату в формате гггг-мм-дд';
      }
      return errors;
    },
    onSubmit: (values, { resetForm }) => {
      UserApi.updateData(
        username,
        values.firstName,
        values.lastName,
        values.birth,
        Token
      )
        .then(res => {
          setShowModal(true);
          resetForm();
        })
        .catch(er => console.log('er'));
    },
  });
  const onClick = () => {
    redirectToUrl('user/profile');
  };

  return (
    <Container>
      <form onSubmit={formik.handleSubmit} className="form-profile m-auto">
        <div className="form-group">
          {showModal && (
            <Alert severity="success" onClose={() => setShowModal(false)}>
              Данные успемшно изменены
            </Alert>
          )}

          <ul className="list-group container w-100 p-0">
            <BackButton onClick={onClick} title="Основные данные" />
            <li className="list-group-item">
              Имя
              <input
                className="form-control"
                type="text"
                name="firstName"
                placeholder="Имя"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.firstName}
              />
              <p className="m-0 text-danger mt-2">
                {formik.errors.firstName &&
                  formik.touched.firstName &&
                  formik.errors.firstName}
              </p>
            </li>

            <li className="list-group-item">
              Фамилия
              <input
                className="form-control"
                type="text"
                name="lastName"
                value={formik.values.lastName}
                placeholder="Фамилия"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <p className="m-0 text-danger mt-2">
                {formik.errors.lastName &&
                  formik.touched.lastName &&
                  formik.errors.lastName}
              </p>
            </li>
            <li className="list-group-item">
              Дата рождения
              <input
                className="form-control"
                type="text"
                name="birth"
                placeholder="ГГГГ-ММ-ДД"
                value={formik.values.birth}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
              />
              <button className="btn btn-dark mt-4 float-right" type="submit">
                Изменить
              </button>
            </li>
          </ul>
        </div>
      </form>
    </Container>
  );
};

export default ChangeData;
