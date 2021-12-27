import React, { useEffect, useMemo } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Formik, Field } from "formik";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  AuthorizationStatus,
  UserOperation,
} from "../../../../../store/reducers/user/user";
import { getAuthStatus } from "../../../../../store/reducers/user/selectors";
import { AppRoute } from "../../../../../assets/services/consts/routes";

const AuthPageType = {
  LOGIN: `login`,
  REGISTER: `register`,
};

const AuthPage = () => {
  const { authName } = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authorizationStatus = useSelector(getAuthStatus);

  useEffect(() => {
    if (authorizationStatus === AuthorizationStatus.AUTH) {
      navigate(AppRoute.ROOT);
    }
  }, [authorizationStatus, navigate]);

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

  const handleSubmit = (values) => {
    dispatch(UserOperation.login(values));
  };

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
