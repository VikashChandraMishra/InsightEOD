import {
    Chart,
    ChartTitle,
    ChartLegend,
    ChartSeries,
    ChartTooltip,
    ChartSeriesItem,
    ChartSeriesLabels,
} from "@progress/kendo-react-charts";
import 'hammerjs';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ApprovalStatsPie = (props) => {

    const navigate = useNavigate(null);
    const { text } = props;

    const renderTooltip = context => {
        const { category, value } = context.point || context;

        return (
            <div>
                {category}: {value}%
            </div>
        );
    };

    // const labelContent = e => e.category;

    const COLORS = {
        approved: "green",
        pending: "blue",
        rejected: "red",
    };

    const [data, setData] = useState([{
        status: "Approved",
        value: 0,
        color: COLORS.approved,
    },
    {
        status: "Rejected",
        value: 0,
        color: COLORS.rejected,
    },
    {
        status: "Pending Assessment",
        value: 0,
        color: COLORS.rejected,
    }]);

    useEffect(() => {
        if (!localStorage.getItem('authToken'))
            navigate('/');

        const fetchData = async () => {

            const response = await fetch(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/api/fetch-stats/eod-approval-status`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'authToken': localStorage.getItem('authToken')
                }
            })

            const json = await response.json();
            if (json.success) {

                let series = [{
                    status: "Approved",
                    value: json.data.approvalPercentage,
                    color: COLORS.approved,
                },
                {
                    status: "Rejected",
                    value: json.data.rejectionPercentage,
                    color: COLORS.rejected,
                },
                {
                    status: "Pending Assessment",
                    value: (100 - (json.data.rejectionPercentage + json.data.approvalPercentage)),
                    color: COLORS.pending,
                }];

                setData(series);
            }
            else alert("Cannot fetch employees' data at the moment!");
        }
        fetchData();
        // eslint-disable-next-line
    }, [])

    return (
        <div className="flex justify-center">
            <Chart className="w-96 md:w-full">
                <ChartTitle text={text} />
                <ChartLegend visible={true} />
                <ChartTooltip render={renderTooltip} />
                <ChartSeries>
                    <ChartSeriesItem
                        type="donut"
                        data={data}
                        categoryField="status"
                        field="value"
                    >
                        <ChartSeriesLabels
                            color="#fff"
                            background="none"
                        // content={labelContent}
                        />
                    </ChartSeriesItem>
                </ChartSeries>
            </Chart>
        </div>
    )
}

export default ApprovalStatsPie;