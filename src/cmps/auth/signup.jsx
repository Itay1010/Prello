import { Formik } from 'formik';


export const SignupForm = ({ onSignup }) => {


    return <div className="signup">
        <h2>Sign up for free</h2>
        <Formik
            initialValues={{ firstName: '', lastName: '', email: '', password: '' }}
            onSubmit={(values) => {
                onSignup(values)
            }}
            enableReinitialize={true}
            validateOnChange={false}
            validateOnBlur={false}
            validate={values => {
                const errors = {};
                if (!values.firstName) {
                    errors.name = 'Required';
                }
                if (!values.lastName) {
                    errors.lastName = 'Required'
                }
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
                <form className='signup' onSubmit={handleSubmit}>
                    <div className="inputs-wrapper">
                        <input
                            type="text"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            placeholder='Email address'
                            className='long-field'
                        />
                        <div className='user-name flex'>
                            <input
                                type="text"
                                name="firstName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.firstName}
                                placeholder='First name'
                            />
                            <input
                                type="text"
                                name="lastName"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.lastName}
                                placeholder='Last name'
                            />
                        </div>
                        <input
                            type="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
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