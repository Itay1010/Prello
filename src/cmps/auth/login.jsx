import React from "react"
import { Formik } from 'formik';


export const LoginForm = ({ onLogin }) => {
    return <section>

        <div className="login">
            <Formik
                initialValues={{ username: '', password: '' }}
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
                        <label className="inputs-wrapper">


                            <input
                                type="text"
                                name="username"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder='Your username'
                            />
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder='Your password'
                            />
                        </label>
                        <button type="submit" disabled={isSubmitting}>
                            continue
                        </button>
                    </form>
                )}
            </Formik>
        </div>

    </section>
}