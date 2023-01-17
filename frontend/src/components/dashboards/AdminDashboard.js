import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SubmissionStatsPie from "../graphs/SubmissionStatsPie";
import EmployeeList from "../tables/EmployeesList";

const AdminDashboard = () => {
    const navigate = useNavigate(null);

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex flex-col md:flex-row px-2 md:px-4">
            <div className="w-full md:w-1/2">
                <SubmissionStatsPie text="Subordinate Submission Summary" />
            </div>
            <div className="w-full md:w-1/2">
                <EmployeeList />
            </div>
        </div>
    )
}

export default AdminDashboard;