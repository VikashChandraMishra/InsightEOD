import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Formik, Form } from "formik";
import * as Yup from 'yup';
import DateInput from "../forms/form-components/DateInput";
import AssessmentPanelRow from "./table-components/AssessmentPanelRow";

const EODAssessmentPanel = () => {
    const navigate = useNavigate(null);
    const location = useLocation();
    const [eods, setEods] = useState([]);

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');

        const begin = (new Date()).toISOString().slice(0, 10);
        const currentDate = begin.split('-');
        const end = currentDate[0] + '-' + currentDate[1] + '-' + (parseInt(currentDate[2]) + 1);

        const fetchData = async () => {
            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/eod/fetch-subordinate-eods`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                    'empID': location.state.empID
                },
                body: JSON.stringify({ begin, end })
            })

            const json = await response.json();

            if (json.success) {
                setEods(json.eods);
            } else alert("Cannot fetch eods' list at the moment!");
        }

        fetchData();
        // eslint-disable-next-line
    }, [])

    const handleSubmit = async (values) => {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/eod/fetch-subordinate-eods`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken'),
                'empID': location.state.empID
            },
            body: JSON.stringify(values)
        })

        const json = await response.json();

        if (json.success) {
            setEods(json.eods);
        } else alert("Cannot fetch eods' list at the moment!");
    }

    return (
        <>
            <div className="px-2">
                <Formik
                    initialValues={{
                        begin: '',
                        end: '',
                    }}
                    validationSchema={Yup.object({
                        begin: Yup.string()
                            .required('Required'),
                        end: Yup.string()
                            .required('Required'),
                    })}
                    onSubmit={(values, { setSubmitting }) => {
                        handleSubmit(values)
                            .then(() => {
                                setSubmitting(false);
                            });
                    }}
                >
                    <Form className="my-3 flex flex-row justify-around items-center text-xs md:text-base text-gray-600">
                        <span className='text-xs md:text-lg mt-6 md:mt-8 text-center'>Search</span>

                        <div className="flex flex-col items-center text-gray-400 py-2">
                            <DateInput
                                label="Begin Date: "
                                id="begin"
                                name="begin"
                                type="date"
                            />
                        </div>

                        <div className="flex flex-col items-center text-gray-400 py-2">
                            <DateInput
                                label="End Date: "
                                id="end"
                                name="end"
                                type="date"
                            />
                        </div>

                        <button className="w-20 md:w-44 h-6 md:h-10 mt-6 md:mt-8 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg text-xs md:text-base" type="submit">Submit</button>
                    </Form>
                </Formik>
            </div>

            <div className="overflow-auto h-60 px-4 md:px-10">
                <table className="w-full text-xs md:text-base">
                    <thead className="text-xs md:text-base text-green-600 uppercase bg-gray-900">
                        <tr>
                            <th className="px-6 py-3">DATE</th>
                            <th className="px-6 py-3">TASK</th>
                            <th className="px-6 py-3">STATUS</th>
                            <th className="px-6 py-3">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            eods.map((data) => {
                                return <AssessmentPanelRow key={data._id} data={data} />
                            })
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default EODAssessmentPanel;