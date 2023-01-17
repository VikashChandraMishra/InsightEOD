const AccountTableRow = (props) => {

    const { data } = props;
    const { date, task, status } = data;

    return (
        <tr className="text-xs md:text-base border-2 text-center">
            <td>{(new Date(date)).toDateString()}</td>
            <td>{task}</td>
            <td>{status !== 'pending' ? (status === 'approved' ? <span>✔</span> : <span>❌</span>) : 'pending'}</td>
        </tr>
    )
}

export default AccountTableRow;