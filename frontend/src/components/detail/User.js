import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const User = () => {

    const navigate = useNavigate(null);
    const [user, setUser] = useState({});
    useEffect(() => {

        if (localStorage.getItem('user') !== 'user')
            navigate('/');

        const fetchData = async () => {
            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/user/fetch-user-profile`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken'),
                }
            })

            const json = await response.json();

            if (json.success) {
                setUser(json.user);
            } else {
                alert(json.message);
            }
        }

        fetchData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="py-4 px-4 md:px-10 text-xs md:text-base">
            <div className="flex flex-col md:flex-row md:border">
                <div className="flex flex-col md:px-1">
                    <span className="py-1">
                        <strong>EMP ID: </strong>
                        {user.empID}
                    </span>
                    <span className="py-1">
                        <strong>NAME: </strong>
                        {user.name}
                    </span>
                    <span className="py-1">
                        <strong>GENDER: </strong>
                        {user.gender}
                    </span>
                </div>
                <div className="flex flex-col md:px-1">
                    <span className="py-1">
                        <strong>MOBILE NUMBER: </strong>
                        {user.mobile}
                    </span>
                    <span className="py-1">
                        <strong>EMAIL: </strong>
                        {user.email}
                    </span>
                    <span className="py-1">
                        <strong>BRANCH: </strong>
                        {user.branch}
                    </span>
                </div>
                <div className="flex flex-col md:px-1">
                    <span className="py-1">
                        <strong>REPORTING MANAGER: </strong>
                        {user.reportingManagerName}
                    </span>
                    <span className="py-1">
                        <strong>DESIGNATION: </strong>
                        {user.designation}
                    </span>
                    <span className="py-1">
                        <strong>SUBORDINATE COUNT: </strong>
                        {user.subordinateCount}

                    </span>
                </div>
            </div>
        </div>
    )
}

export default User;