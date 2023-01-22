import { Formik, Form } from "formik";
import TextInput from './form-components/TextInput';
import * as Yup from 'yup';
import { useNavigate } from "react-router-dom";

const Home = () => {

    const navigate = useNavigate(null);

    const handleSubmit = async (values) => {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })

        const json = await response.json();

        if (json.success) {
            localStorage.setItem('authToken', json.authToken);
            localStorage.setItem('user', json.user);
            localStorage.setItem('isReportingManager', json.isReportingManager);

            if (json.user === "admin") {
                navigate('/admin/dashboard');
            } else if (json.user === "user" && json.isReportingManager === true) {
                navigate('/user/dashboard');
            } else if (json.user === "user" && json.isReportingManager === false) {
                navigate('/user/profile');
            } 

        } else alert("Invalid Credentials!");
    }

    return (
        <div className="grid grid-cols-1 w-ful">
            <div className="flex flex-col justify-start">
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        password: Yup.string()
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values)
                            .then(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    <Form className="flex flex-col items-center max-w-[250px] md:max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8 my-12">
                        <h2 className='text-lg md:text-3xl text-white font-bold text-center'>SIGN IN</h2>

                        <div className="flex flex-col items-center text-gray-400 py-2">
                            <TextInput
                                label="Username"
                                id="username"
                                name="username"
                                type="text"
                            />
                        </div>

                        <div className="flex flex-col items-center text-gray-400 py-2">
                            <TextInput
                                label="Password"
                                id="password"
                                name="password"
                                type="password"
                            />
                        </div>

                        <button className="w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg text-xs md:text-base" type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Home;