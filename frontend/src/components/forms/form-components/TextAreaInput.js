import { useField } from 'formik';

const TextAreaInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name} className="text-xs md:text-base">{label}</label>
            <textarea className="rounded-lg w-48 md:w-96 text-xs md:text-base bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error text-red-500">{meta.error}</div>
            ) : null}
        </>
    );
};

export default TextAreaInput;