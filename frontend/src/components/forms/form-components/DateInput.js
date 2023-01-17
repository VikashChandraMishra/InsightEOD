import { useField } from 'formik';

const DateInput = ({ label, ...props }) => {

    const [field, meta] = useField(props);

    return (
        <>
            <label htmlFor={props.id || props.name} className="text-xs md:text-base">{label}</label>
            <input className="mx-1 border rounded-lg h-6 md:h-10 w-28 md:w-48 text-xs md:text-base mt-2 p-2" {...field} {...props} />
            {meta.touched && meta.error ? (
                <div className="error text-red-500">{meta.error}</div>
            ) : null}
        </>
    );
};

export default DateInput;