import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Formik, Form } from "formik";
import TextAreaInput from './form-components/TextAreaInput';
import * as Yup from 'yup';

const SubmitEOD = () => {

    const navigate = useNavigate(null);

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');
    })

    const handleSubmit = async (values) => {

        const confirmation = window.prompt("Are you sure you want to submit, you will not be able to edit it later? Yes/No");

        if (!(confirmation.toUpperCase() === "YES")) return;

        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/save-data/save-eod`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
            body: JSON.stringify(values)
        })

        const json = await response.json();

        if (json.success) {
            navigate('/user/profile');

        } else if (!json.success) {
            alert(json.message);
            navigate('/user/profile');

        } else {
            alert("Invalid Entry!");
        }
    }

    return (
        <div className="grid grid-cols-1 w-ful">
            <div className="flex flex-col justify-center px-4">
                <Formik
                    initialValues={{
                        task: ''
                    }}
                    validationSchema={Yup.object({
                        task: Yup.string()
                            .min(5, 'Must be 5 characters or more')
                            .required('Required')
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values)
                            .then(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    <Form className="flex flex-col items-center max-w-[250px] md:max-w-[600px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8 my-12">

                        <h2 className='text-lg md:text-3xl dark:text-white font-bold text-center'>EOD SUBMISSION</h2>

                            <div className="flex flex-col items-center text-gray-400 py-2">
                                <TextAreaInput
                                    label="Task"
                                    id="task"
                                    name="task"
                                    type="text"
                                />
                            </div>
                            <button className="w-28 md:w-48 my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg text-xs md:text-base" type="submit">Submit</button>

                    </Form>
                </Formik>
            </div>
        </div>
    )
}

export default SubmitEOD;