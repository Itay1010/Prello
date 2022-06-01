import React from "react"
import { Formik } from 'formik'


export const LoginForm = ({ onLogin }) => {
    return <section>

        <div className="login">
            <h2>Sign in</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values, actions) => {
                    onLogin(values)
                    actions.setSubmitting(false)
                }}
                enableReinitialize={true}
                validateOnChange={false}
                validateOnBlur={false}
                validate={values => {
                    const errors = {};
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
                    <form className='login-form' onSubmit={handleSubmit}>
                        <label className="inputs-wrapper flex col">
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                                placeholder='Email address'
                            />
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                                placeholder='Password'
                            />
                        </label>
                        <button type="submit" disabled={isSubmitting}>
                            Continue
                        </button>
                    </form>
                )}
            </Formik>
        </div>

    </section >
}