import ApprovalStatsPie from "../graphs/ApprovalStatsPie";
import Account from "./Account";
import User from "./User";

const Profile = () => {
    return (
        <div className="flex flex-col md:flex-row">
            <div className="w-full md:w-1/2">
                <User />
                <Account />
            </div>
            <div className="w-full md:w-1/2">
                <ApprovalStatsPie text="EOD Approval Status" />
            </div>
        </div>
    )
}

export default Profile;