import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { AppState, AuthState } from "../../store/app/types";
import {
  GroupResponse,
  fetchGroups,
  deleteGroup,
  createGroup,
} from "../../api/account";

const NewGroupForm = (params: { onCreated: () => void }) => {
  const [name, setName] = useState<string>("");
  const auth = useSelector<{ app: AppState }, AuthState>((a) => a.app.auth);
  const handleNewGroup = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      auth.token !== null &&
      auth.encryptionKey !== null &&
      auth.encryptionMac !== null
    ) {
      createGroup(
        auth.token,
        auth.encryptionKey,
        auth.encryptionMac,
        name,
        false
      ).then(params.onCreated);
    }
  };
  return (
    <form onSubmit={handleNewGroup}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">New group</button>
    </form>
  );
};
const Page = () => {
  const auth = useSelector<{ app: AppState }, AuthState>((a) => a.app.auth);
  const [loaded, setLoaded] = useState<boolean>(false);
  const [groups, setGroups] = useState<Array<GroupResponse> | null>(null);
  const fetchGrps = useCallback(async () => {
    async function fetchgr() {
      if (auth.token !== null) {
        const resp = await fetchGroups(auth.token);
        setLoaded(true);
        if (resp !== null) {
          setGroups(resp);
        }
      }
    }
    fetchgr();
  }, [auth.token]);
  useEffect(() => {
    fetchGrps();
  }, [fetchGrps]);
  const deleteGroupHandler = (group_id: string) => {
    if (auth.token !== null) {
      deleteGroup(auth.token, group_id);
    }
  };
  if (loaded === false) {
    return <div>Loading</div>;
  }
  if (groups === null) {
    return <div>Some error</div>;
  }
  return (
    <div>
      {groups.length === 0 && <div>No Groups</div>}
      {groups.map((a) => (
        <div key={a.id}>
          <span>{a.name}</span>
          <span>{a.is_default && "Default"}</span>
          <button onClick={() => deleteGroupHandler(a.id)}>Delete</button>
        </div>
      ))}
      <NewGroupForm onCreated={() => fetchGrps()} />
    </div>
  );
};

export default Page;
