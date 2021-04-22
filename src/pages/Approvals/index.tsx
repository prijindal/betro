import { Button, List } from "@material-ui/core";
import { throttle } from "lodash";
import { useCallback, useEffect } from "react";
import { useSelector } from "react-redux";
import { wrapLayout } from "../../components/Layout";
import { getGroup } from "../../store/app/selectors";
import { useFetchApprovals, useFetchGroupsHook } from "../../util/customHooks";
import ApprovalComponent from "./ApprovalComponent";

const Approvals = () => {
    const groupData = useSelector(getGroup);
    const fetchGroups = useFetchGroupsHook();
    const { fetchPendingApprovals, response, loaded } = useFetchApprovals();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const fetchPendingApprovalsThrottled = useCallback(throttle(fetchPendingApprovals, 2000), []);
    useEffect(() => {
        fetchGroups();
        fetchPendingApprovalsThrottled();
    }, [fetchGroups, fetchPendingApprovalsThrottled]);
    if (loaded === false || groupData.isLoaded === false) {
        return <div>Loading</div>;
    }
    if (response === null) {
        return <div>Some error</div>;
    }
    return (
        <List>
            {response.total === 0 && <div>No Approvals</div>}
            {response.data.map((a) => (
                <ApprovalComponent
                    key={a.id}
                    approval={a}
                    onApproved={fetchPendingApprovalsThrottled}
                />
            ))}
            {response.next && (
                <Button onClick={() => fetchPendingApprovals()}>
                    Load More (Loaded {response.data.length} out of {response.total})
                </Button>
            )}
        </List>
    );
};

export default wrapLayout(Approvals);
