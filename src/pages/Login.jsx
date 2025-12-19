import { useFormik } from 'formik';
import { useContext } from "react";
import UserContext from '../context/UserContext';

export default function Login(props) {
    const { handleLogin, serverErrors } = useContext(UserContext);
    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        },
        onSubmit: (values, { resetForm }) => {
            console.log('formData', values);
            handleLogin(values, resetForm); 
        }
    })
    return(
        <div>
            <h2>Login with us</h2>
            { serverErrors && <p style={{ color: 'red' }}>{serverErrors}</p> }
            <form onSubmit={formik.handleSubmit}>
                <div>
                <input type="email"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        placeholder="Enter Email"
                />
                </div>
                <div>
                <input type="password"
                       name="password"
                       value={formik.values.password}
                       onChange={formik.handleChange}
                       placeholder="Enter password"
                />
              </div>
              <div>
                <input type="submit" value="Login" /> 
              </div>
            </form>
        </div>
    )
}
