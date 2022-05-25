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
                    {errors.firstName && touched.firstName && errors.firstName}
                    {errors.lastName && touched.lastName && errors.lastName}
                    {errors.username && touched.username && errors.username}
                    {errors.password && touched.password && errors.password}
                    <label className="inputs-wrapper">
                        <input
                            type="text"
                            name="firstName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder='Your first name'
                        />
                        <input
                            type="text"
                            name="lastName"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.name}
                            placeholder='Your last name'
                        />
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
}