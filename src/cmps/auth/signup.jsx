import { Formik } from 'formik';


export const SignupForm = ({ onSignup }) => {


    return <div className="signup">
        <Formik
            initialValues={{ firstName: '', lastName: '', username: '', password: '' }}
            onSubmit={(values) => {
                onSignup(values)
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
                <form className='signup' onSubmit={handleSubmit}>
                    {errors.firstName && touched.firstName && errors.firstName} <br />
                    {errors.lastName && touched.lastName && errors.lastName} <br />
                    {errors.username && touched.username && errors.username}
                    {errors.password && touched.password && errors.password}
                    <label className="inputs-wrapper">
                        <label htmlFor="">FIrst name
                            <input
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                        </label>
                        <label>Last name
                            <input
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                            />
                        </label>
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
                        Sign up
                    </button>
                </form>
            )}
        </Formik>
    </div>
}