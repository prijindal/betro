import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Button from "@material-ui/core/Button";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import isEmpty from "lodash/isEmpty";
import { getGroup } from "../../store/app/selectors";

import UserListItem from "../../components/UserListItem";
import ConfirmDialog from "../../components/ConfirmDialog";
import BetroApiObject from "../../api/context";
import { ApprovalResponse } from "../../api";

const ApprovalComponent: React.FunctionComponent<{
    approval: ApprovalResponse;
    onApproved: () => void;
}> = (props) => {
    const { approval, onApproved } = props;
    const [confirmApprove, setConfirmApprove] = useState<boolean>(false);
    const [groupId, setGroupId] = useState<string>("");
    const groupData = useSelector(getGroup);
    useEffect(() => {
        if (isEmpty(groupId)) {
            const defaultGroup = groupData.data.find((a) => a.is_default);
            if (defaultGroup != null) {
                setGroupId(defaultGroup.id);
            }
        }
    }, [groupId, groupData]);
    const approveHandler = () => {
        const group = groupData.data.find((a) => a.id === groupId);
        if (group !== undefined) {
            BetroApiObject.follow
                .approveUser(approval.id, approval.public_key, groupId, group.sym_key)
                .then(onApproved);
        }
    };
    return (
        <UserListItem user={approval}>
            <ConfirmDialog
                id={`user-approve-${approval.username}`}
                open={confirmApprove}
                handleCancel={() => setConfirmApprove(false)}
                handleConfirm={approveHandler}
                title={`Approve user ${approval.username}?`}
                description="By approving this user, you agree to allow them to see your email and name"
            />
            <Select value={groupId} onChange={(e) => setGroupId(e.target.value as string)}>
                {groupData.data.map((g) => (
                    <MenuItem key={g.id} value={g.id}>
                        {g.name}
                    </MenuItem>
                ))}
            </Select>
            <Button onClick={() => setConfirmApprove(true)}>Approve</Button>
        </UserListItem>
    );
};

export default ApprovalComponent;
