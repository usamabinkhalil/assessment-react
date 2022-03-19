import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";

function Checkout(props: any) {
  const { state }: any = useLocation();
  const [service, setService] = useState<any>({});
  const [tier, setTier] = useState<any>([]);
  const [formValidated, setFormValidated] = useState<boolean>(false);
  const [forSubmited, setForSubmited] = useState<boolean>(false);
  useEffect(() => {
    if (state.service) {
      setService(state.service);
    }
    if (state.tier) {
      setTier(state.tier);
    }
  }, [state]);
  return (
    <div className="bg-light">
      <div className="container">
        <div className="py-5 text-center">
          <h2>Checkout form</h2>
          <p className="lead">
            Below is an example form built entirely with Bootstrap’s form
            controls. Each required form group has a validation state that can
            be triggered by attempting to submit the form without completing it.
          </p>
        </div>
        <div className="row">
          <div className="col-md-4 order-md-2 mb-4">
            <h4 className="d-flex justify-content-between align-items-center mb-3">
              <span className="text-muted">Your cart</span>
              <span className="badge badge-secondary badge-pill">1</span>
            </h4>
            <ul className="list-group mb-3">
              <li className="list-group-item d-flex justify-content-between lh-condensed">
                <div>
                  <h6 className="my-0">{service?.name}</h6>
                  <small className="text-muted">{tier?.name}</small>
                </div>
                <span className="text-muted">${tier?.price}</span>
              </li>
            </ul>
          </div>
          <div className="col-md-8 order-md-1">
            <h4 className="mb-3">Billing address</h4>
            <Formik
              initialValues={{
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                address: "",
                country: "",
                state: "",
                zip: "",
                sameAddress: false,
                saveInfo: false,
                paymentMethod: "",
              }}
              validate={(values) => {
                const errors: any = {};
                if (!values.firstName) {
                  errors.firstName = "Required";
                }
                if (!values.lastName) {
                  errors.lastName = "Required";
                }
                if (!values.username) {
                  errors.username = "Required";
                }
                if (!values.email) {
                  errors.email = "Required";
                } else if (
                  !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(
                    values.email
                  )
                ) {
                  errors.email = "Invalid email address";
                }
                if (!values.address) {
                  errors.address = "Required";
                }
                if (!values.country) {
                  errors.country = "Required";
                }
                if (!values.state) {
                  errors.state = "Required";
                }
                if (!values.zip) {
                  errors.zip = "Required";
                }
                setFormValidated(true);
                return errors;
              }}
              onSubmit={(values, { setSubmitting }) => {
                setSubmitting(true);
                fetch(`${process.env.REACT_APP_API}checkouts`, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(values),
                })
                  .then((response) => response.json())
                  .then((data) => {
                    setForSubmited(true);
                    setSubmitting(false);
                    console.log("Success:", data);
                  })
                  .catch((error) => {
                    setSubmitting(false);
                    console.error("Error:", error);
                  });
              }}
              validateOnChange={false}
              validateOnBlur={false}
            >
              {({ isSubmitting, values, setFieldValue }) => (
                <Form
                  className={`needs-validation ${
                    formValidated ? "was-validated" : ""
                  }`}
                  noValidate
                >
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label htmlFor="firstName">First name</label>
                      <Field
                        type="text"
                        name="firstName"
                        className="form-control"
                        required
                      />
                      <ErrorMessage
                        name="firstName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label htmlFor="lastName">Last name</label>
                      <Field
                        type="text"
                        name="lastName"
                        className="form-control"
                        required
                      />
                      <ErrorMessage
                        name="lastName"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="username">Username</label>
                    <div className="input-group">
                      <div className="input-group-prepend">
                        <span className="input-group-text">@</span>
                      </div>
                      <Field
                        type="text"
                        name="username"
                        className="form-control"
                        placeholder="Username"
                        required
                      />
                      <ErrorMessage
                        name="username"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email">Email</label>
                    <Field
                      type="email"
                      name="email"
                      className="form-control"
                      placeholder="you@example.com"
                      required
                    />
                    <ErrorMessage
                      name="email"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="address">Address</label>
                    <Field
                      type="text"
                      name="address"
                      className="form-control"
                      placeholder="1234 Main St"
                      required
                    />
                    <ErrorMessage
                      name="address"
                      component="div"
                      className="invalid-feedback"
                    />
                  </div>
                  <div className="row">
                    <div className="col-md-5 mb-3">
                      <label htmlFor="country">Country</label>
                      <Field
                        component="select"
                        id="country"
                        name="country"
                        multiple={false}
                        className="custom-select d-block w-100"
                        required
                      >
                        <option value="">Choose...</option>
                        <option>United States</option>
                      </Field>
                      <ErrorMessage
                        name="country"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-4 mb-3">
                      <label htmlFor="state">State</label>
                      <Field
                        component="select"
                        id="state"
                        name="state"
                        multiple={false}
                        className="custom-select d-block w-100"
                        required
                      >
                        <option value="">Choose...</option>
                        <option>California</option>
                      </Field>
                      <ErrorMessage
                        name="state"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                    <div className="col-md-3 mb-3">
                      <label htmlFor="zip">Zip</label>
                      <Field
                        type="text"
                        name="zip"
                        className="form-control"
                        required
                      />
                      <ErrorMessage
                        name="zip"
                        component="div"
                        className="invalid-feedback"
                      />
                    </div>
                  </div>
                  <hr className="mb-4" />
                  <div
                    className="custom-control custom-checkbox"
                    onClick={() =>
                      setFieldValue("sameAddress", !values.sameAddress)
                    }
                  >
                    <Field
                      type="checkbox"
                      name="sameAddress"
                      className="custom-control-input"
                      checked={values.sameAddress}
                    />
                    <label
                      className="custom-control-label"
                      htmlFor="sameAddress"
                    >
                      Shipping address is the same as my billing address
                    </label>
                  </div>
                  <div
                    className="custom-control custom-checkbox"
                    onClick={() => setFieldValue("saveInfo", !values.saveInfo)}
                  >
                    <Field
                      type="checkbox"
                      name="saveInfo"
                      className="custom-control-input"
                    />
                    <label className="custom-control-label" htmlFor="saveInfo">
                      Save this information for next time
                    </label>
                  </div>
                  <hr className="mb-4" />
                  <h4 className="mb-3">Payment</h4>
                  <div className="d-block my-3">
                    <div
                      className="custom-control custom-radio"
                      onClick={() =>
                        setFieldValue("paymentMethod", "Credit card")
                      }
                    >
                      <Field
                        type="radio"
                        name="paymentMethod"
                        className="custom-control-input"
                        value="Credit card"
                      />
                      <label className="custom-control-label" htmlFor="credit">
                        Credit card
                      </label>
                    </div>
                    <div
                      className="custom-control custom-radio"
                      onClick={() =>
                        setFieldValue("paymentMethod", "Debit card")
                      }
                    >
                      <Field
                        type="radio"
                        name="paymentMethod"
                        className="custom-control-input"
                        value="Debit card"
                      />
                      <label className="custom-control-label" htmlFor="debit">
                        Debit card
                      </label>
                    </div>
                    <div
                      className="custom-control custom-radio"
                      onClick={() => setFieldValue("paymentMethod", "PayPal")}
                    >
                      <Field
                        type="radio"
                        name="paymentMethod"
                        className="custom-control-input"
                        value="PayPal"
                      />
                      <label className="custom-control-label" htmlFor="paypal">
                        PayPal
                      </label>
                    </div>
                  </div>
                  <hr className="mb-4" />
                  {forSubmited && (
                    <div className="alert alert-success" role="alert">
                      Successfully subscribed thankyou.
                    </div>
                  )}
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Continue to checkout
                  </button>
                </Form>
              )}
            </Formik>
          </div>
        </div>
        <footer className="mt-5 py-5 text-muted text-center text-small">
          <p className="mb-1">© 2017-2020 Company Name</p>
        </footer>
      </div>
    </div>
  );
}

export default Checkout;
