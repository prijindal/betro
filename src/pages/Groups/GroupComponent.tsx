import React, { useCallback, useState } from "react";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { useFetchGroupsHook } from "../../hooks";
import ConfirmDialog from "../../components/ConfirmDialog";
import { Group } from "../../store/app/types";
import BetroApiObject from "../../api/context";
import Chip from "../../components/Chip";
import Button from "../../components/Button";

const GroupComponent: React.FunctionComponent<{ group: Group }> = (props) => {
    const { group } = props;
    const [confirmDeletion, setConfirmDeletion] = useState<boolean>(false);
    const fetchGroups = useFetchGroupsHook();
    const deleteGroupHandler = useCallback(() => {
        setConfirmDeletion(false);
        BetroApiObject.group.deleteGroup(group.id).then(() => fetchGroups(true));
    }, [fetchGroups, group.id]);
    return (
        <ListItem>
            <Typography variant="h5">{group.name}</Typography>
            {group.is_default && <Chip selected={true}>Default</Chip>}
            <Button onClick={() => setConfirmDeletion(true)}>Delete</Button>
            <ConfirmDialog
                id="groups-new-form"
                open={confirmDeletion}
                handleCancel={() => setConfirmDeletion(false)}
                handleConfirm={deleteGroupHandler}
                title={`Delete Group ${group.name}`}
                description="All Followers under this group will become unfollowed"
            />
        </ListItem>
    );
};

export default GroupComponent;
