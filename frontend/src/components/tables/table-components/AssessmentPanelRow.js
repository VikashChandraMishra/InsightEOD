const AssessmentPanelRow = (props) => {
    const { data } = props;
    const { _id, date, task, status } = data;

    const approve = async (id) => {
        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/eod/approve-eod/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            }
        })

        const json = await response.json();
        if (json.success) {
            alert("Task approved!");

        } else alert(json.message);

    }

    const reject = async (id) => {

        const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/eod/reject-eod/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authToken': localStorage.getItem('authToken')
            },
        })

        const json = await response.json();
        if (json.success) {
            alert("Task rejected!");

        } else alert(json.message);
    }

    return (
        <tr className="text-xs md:text-base border-2 text-center">
            <td>{(new Date(date)).toDateString()}</td>
            <td>{task}</td>
            <td>{status}</td>
            <td>
                <button className="px-2 md:px-4 w-16 md:w-32 h-6 md:h-10 text-white font-semibold rounded-lg text-xs md:text-base bg-green-500 my-1 md:mx-4" id="approve-btn" onClick={() => { approve(_id) }} >Approve</button>
                <button className="w-16 md:w-32 h-6 md:h-10 text-white font-semibold rounded-lg text-xs md:text-base bg-red-500 px-4 my-1 md:mx-4" id="reject-btn" onClick={() => { reject(_id) }}>Reject</button>
            </td>
        </tr>
    )
}

export default AssessmentPanelRow;