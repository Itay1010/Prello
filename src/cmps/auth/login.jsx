import React from 'react'
import { Formik } from 'formik'


export const LoginForm = ({ onLogin }) => {
    return <section className="login">
        <h2>Sign in</h2>
        <Formik
            initialValues={{ email: '', password: '' }}
            onSubmit={(values, actions) => {
                onLogin(values)
                actions.setSubmitting(false)
            }}
            enableReinitialize={true}
            validateOnChange={true}
            validateOnBlur={true}
            validate={values => {
                const errors = {}
                if (!values.email) {
                    errors.email = 'Required'
                }
                if (!values.password) {
                    errors.password = 'Required'
                }
                return errors;
            }}
        >
            {({
                values,
                errors,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,

            }) => (
                <form className="login-form" onSubmit={handleSubmit}>
                    <label className="inputs-wrapper">
                        <input
                            type="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder="Email address"
                        />
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                            placeholder="Password"
                        />
                    </label>

                    <button className="auth-btn" type="submit" disabled={isSubmitting}>
                        Login
                    </button>
                </form>
            )}
        </Formik>
    </section>
}