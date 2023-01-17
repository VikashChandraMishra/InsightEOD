import { Formik, Form } from "formik";
import TextInput from './form-components/TextInput';
import * as Yup from 'yup';
import SelectInput from "./form-components/SelectInput";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {

    const navigate = useNavigate(null);

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (values) => {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/save-data/registration`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(values)
        })

        const json = await response.json();

        alert(json.message);
    }

    return (
        <div className="grid grid-cols-1 w-ful">
            <div className="py-8 flex flex-col justify-center px-4">
                <Formik
                    initialValues={{
                        username: '',
                        password: '',
                        name: '',
                        gender: 'Others',
                        mobile: '',
                        email: '',
                        empID: 0,
                        designation: 'Manager',
                        reportingManagerID: 0,
                        branch: 'Guwahati',
                    }}
                    validationSchema={Yup.object({
                        username: Yup.string()
                            .max(15, 'Must be 15 characters or less')
                            .required('Required'),
                        password: Yup.string()
                            .max(20, 'Must be 20 characters or less')
                            .required('Required'),
                        name: Yup.string()
                            .min(5, 'Must be 5 characters or more')
                            .required('Required'),
                        gender: Yup.string()
                            .required('Required'),
                        mobile: Yup.number()
                            .positive("Mobile number can't start with a minus")
                            .min(6000000000, 'Must be 10 digits')
                            .max(10000000000, 'Must be 10 digits')
                            .required('Required'),
                        email: Yup.string()
                            .email('Invalid email')
                            .required('Required'),
                        empID: Yup.number()
                            .required('Required'),
                        designation: Yup.string()
                            .required('Required'),
                        branch: Yup.string()
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting, resetForm }) => {
                        handleSubmit(values)
                            .then(() => {
                                setSubmitting(false);
                                resetForm({ values: '' })
                            });
                    }}
                >
                    <Form className="max-w-[600px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8">
                        <h2 className='text-lg md:text-3xl text-slate-50 font-bold text-center'>REGISTER USER</h2>

                        <div className="flex flex-col">

                            <div className="flex flex-row justify-around">
                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Username"
                                        id="username"
                                        name="username"
                                        type="text"
                                    />
                                </div>

                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Password"
                                        id="password"
                                        name="password"
                                        type="password"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row justify-around">
                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Name"
                                        id="name"
                                        name="name"
                                        type="text"
                                    />
                                </div>

                                <div className="flex flex-col text-gray-400 py-2">
                                    <SelectInput
                                        label="Gender"
                                        id="gender"
                                        name="gender"
                                        type="text"
                                        options={["Others", "Male", "Female"]}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row justify-around">
                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Mobile"
                                        id="mobile"
                                        name="mobile"
                                        type="number"
                                    />
                                </div>

                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Email"
                                        id="email"
                                        name="email"
                                        type="email"
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row justify-around">
                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Employee ID"
                                        id="empID"
                                        name="empID"
                                        type="number"
                                    />
                                </div>

                                <div className="flex flex-col text-gray-400 py-2">
                                    <SelectInput
                                        label="Designation"
                                        id="designation"
                                        name="designation"
                                        type="text"
                                        options={["SDE Intern", "Manager", "Consultant", "Asst. Manager"]}
                                    />
                                </div>
                            </div>

                            <div className="flex flex-row justify-around">
                                <div className="flex flex-col text-gray-400 py-2">
                                    <TextInput
                                        label="Reporting Manager ID"
                                        id="reportingManagerID"
                                        name="reportingManagerID"
                                        type="number"
                                    />
                                </div>

                                <div className="flex flex-col text-gray-400 py-2">
                                    <SelectInput
                                        label="Branch"
                                        id="branch"
                                        name="branch"
                                        type="text"
                                        options={["Guwahati", "Delhi", "Chennai", "Mumbai"]}
                                    />
                                </div>
                            </div>


                        </div>

                        <div className="text-center">
                            <button className="w-28 md:w-44 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg" type="submit">Submit</button>
                        </div>

                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default Register;