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
                    <form className='login' onSubmit={handleSubmit}>
                        {errors.firstName && touched.firstName && errors.firstName} <br />
                        {errors.lastName && touched.lastName && errors.lastName} <br />
                        <label className="inputs-wrapper">

                            <label>Username
                                <input
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                            </label>
                            <label>Password
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.name}
                                />
                            </label>
                        </label>
                        <button type="submit" disabled={isSubmitting}>
                            login
                        </button>
                    </form>
                )}
            </Formik>
        </div>

    </section>
}