import React from "react"
import { Formik } from 'formik'


export const LoginForm = ({ onLogin }) => {
    return <section>

        <div className="login">
            <h2>Sign in</h2>
            <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => {
                    onLogin(values)
                }}
            >
                {({
                    values,
                    errors,
                    touched,
                    handleChange,
                    handleBlur,
                    handleSubmit,
                    isSubmitting,
                    /* and other goodies */

                }) => (
                    <form className='login-form' onSubmit={handleSubmit}>
                        {errors.firstName && touched.firstName && errors.firstName}
                        {errors.lastName && touched.lastName && errors.lastName}
                        <label className="inputs-wrapper flex col">
                            <input
                                type="text"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder='Email address'
                            />
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
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

    </section>
}