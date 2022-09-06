import React, { useEffect, useMemo } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik, Field } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { UserOperation } from "../../../../../store/reducers/user/user";
import { AppRoute } from "../../../../../assets/services/consts/routes";

const AuthPageType = {
  LOGIN: `login`,
  REGISTER: `register`,
};

const AuthPage = (props) => {
  const { isAuth } = props;

  const { authName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuth) {
      navigate(AppRoute.ROOT);
    }
  }, [isAuth, navigate]);

  const formTitle = useMemo(() => {
    switch (authName) {
      case AuthPageType.LOGIN:
        return `Вход`;
      case AuthPageType.REGISTER:
        return `Регистрация`;
      default:
        return ``;
    }
  }, [authName]);

  const linkText = useMemo(() => {
    switch (authName) {
      case AuthPageType.LOGIN:
        return `Зарегистрироваться`;
      case AuthPageType.REGISTER:
        return `Уже есть аккаунт`;
      default:
        return ``;
    }
  }, [authName]);

  const submitButtonText = useMemo(() => {
    switch (authName) {
      case AuthPageType.LOGIN:
        return `Войти`;
      case AuthPageType.REGISTER:
        return `Зарегистрироваться`;
      default:
        return ``;
    }
  }, [authName]);

  const handleSubmit = (values) => {
    switch (authName) {
      case AuthPageType.LOGIN:
        return dispatch(UserOperation.login(values));
      case AuthPageType.REGISTER:
        return dispatch(UserOperation.register(values));
      default:
        return null;
    }
  };

  const initialValues = useMemo(() => {
    switch (authName) {
      case AuthPageType.LOGIN:
        return { email: ``, password: `` };
      case AuthPageType.REGISTER:
        return { login: ``, email: ``, password: `` };
      default:
        return {};
    }
  }, [authName]);

  return (
    <Container className="layout">
      <Row>
        <Col>
          <main className="layout__main">
            <div className="page">
              <div className="page__body">
                <Formik
                  initialValues={initialValues}
                  // validationSchema={validationSchema}
                  enableReinitialize
                  onSubmit={handleSubmit}>
                  {({ values, ...formikProps }) => {
                    return (
                      <Form
                        className="form"
                        onSubmit={formikProps.handleSubmit}>
                        <header className="form__header">
                          <h3
                            className="heading"
                            data-level="3"
                            data-color-theme="dark-primary">
                            <span className="heading__text">{formTitle}</span>
                          </h3>
                        </header>
                        <div className="form__body">
                          <div className="form__section">
                            {authName === AuthPageType.REGISTER && (
                              <Field name="login">
                                {({ field }) => (
                                  <Form.Group
                                    className="mb-3"
                                    controlId="formBasicLogin">
                                    <Form.Label>Login</Form.Label>
                                    <Form.Control
                                      {...field}
                                      type="text"
                                      placeholder="Enter login"
                                    />
                                  </Form.Group>
                                )}
                              </Field>
                            )}

                            <Field name="email">
                              {({ field }) => (
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicEmail">
                                  <Form.Label>Email address</Form.Label>
                                  <Form.Control
                                    {...field}
                                    type="email"
                                    placeholder="Enter email"
                                  />
                                </Form.Group>
                              )}
                            </Field>

                            <Field name="password">
                              {({ field }) => (
                                <Form.Group
                                  className="mb-3"
                                  controlId="formBasicPassword">
                                  <Form.Label>Password</Form.Label>
                                  <Form.Control
                                    {...field}
                                    type="password"
                                    placeholder="Password"
                                  />
                                </Form.Group>
                              )}
                            </Field>

                            <p className="d-flex justify-content-end">
                              <Link
                                to={
                                  authName === AuthPageType.LOGIN
                                    ? AppRoute.REGISTER
                                    : AppRoute.LOGIN
                                }>
                                {linkText}
                              </Link>
                            </p>

                            <Button
                              variant="primary"
                              type="submit"
                              data-color-theme="orange-primary">
                              {submitButtonText}
                            </Button>
                          </div>
                        </div>
                      </Form>
                    );
                  }}
                </Formik>
              </div>
            </div>
          </main>
        </Col>
      </Row>
    </Container>
  );
};

export default AuthPage;
