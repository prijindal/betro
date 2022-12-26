import React, { useEffect, useState } from "react";
import { UserSettingResponse, UserSettingsType } from "@prijindal/betro-js-client/src";
import { wrapLayout } from "../../components/Layout";
import { useFetchUserSettings, useFetchCountHook } from "../../hooks";
import BetroApiObject from "../../api/context";
import Switch from "../../ui/Switch";
import { LoadingSpinnerCenter } from "../../ui/LoadingSpinner";

interface Setting {
    type: UserSettingsType;
    text: string;
    enabled: boolean;
}

const SETTINGS: Array<{
    type: UserSettingsType;
    text: string;
}> = [
        {
            type: "notification_on_approved",
            text: "When somebody approves your follow request",
        },
        {
            type: "notification_on_followed",
            text: "When somebody sends you a follow request",
        },
        {
            type: "allow_search",
            text: "Allow to be searchable",
        },
    ];

const parseUserSettings = (settings: Array<UserSettingResponse>): Array<Setting> => {
    return SETTINGS.map((a) => {
        const userSetting = settings.find((b) => b.type === a.type);
        let enabled = false;
        if (userSetting !== null && userSetting !== undefined) {
            enabled = userSetting.enabled;
        }
        return { ...a, enabled: enabled };
    });
};

const UserSetting = (params: { userSetting: Setting }) => {
    const userSetting = params.userSetting;
    const [enabled, setEnabled] = useState<boolean>(userSetting.enabled);
    const [saving, setSaving] = useState<boolean>(false);
    const fetchCount = useFetchCountHook();
    const handleChange = (value: boolean) => {
        setEnabled(value);
        setSaving(true);
        BetroApiObject.settings
            .changeUserSettings(userSetting.type, value)
            .then(() => {
                fetchCount(true);
            })
            .finally(() => {
                setSaving(false);
            });
    };
    return (
        <li className="relative flex flex-row items-center py-4 px-8">
            <Switch
                label={userSetting.text}
                labelPosition="right"
                disabled={saving}
                value={enabled}
                onChange={handleChange}
            />
        </li>
    );
};

const UserSettings = () => {
    const { fetchUserSettings, loaded, settings } = useFetchUserSettings();
    useEffect(() => {
        fetchUserSettings();
    }, [fetchUserSettings]);
    if (loaded === false) {
        return <LoadingSpinnerCenter />;
    }
    if (settings === null) {
        return <div>Some error</div>;
    }
    return (
        <ul>
            {parseUserSettings(settings).map((a) => (
                <UserSetting key={a.type} userSetting={a} />
            ))}
        </ul>
    );
};

export default wrapLayout(UserSettings);
