import { Formik } from 'formik';


export const SignupForm = ({ onSignup }) => {


    return <div className="signup">
        <h2>Sign up for free</h2>
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
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
                    {errors.firstName && touched.firstName && errors.firstName}
                    {errors.lastName && touched.lastName && errors.lastName}
                    {errors.email && touched.email && errors.email}
                    {errors.password && touched.password && errors.password}
                    <div className="inputs-wrapper">
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder='Email address'
                            className='long-field'
                        />
                        <div className='user-name flex'>
                            <input
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder='First name'
                            />
                            <input
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.name}
                                placeholder='Last name'
                            />
                        </div>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder='Password'
                            className='long-field'
                        />
                    </div>
                    <button type="submit" disabled={isSubmitting}>
                        Continue
                    </button>
                </form>
            )}
        </Formik>
    </div>
}