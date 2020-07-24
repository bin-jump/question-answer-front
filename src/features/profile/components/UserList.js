import React, { useEffect } from 'react';
import { useFetchUsers } from '../redux/fetchItems';
import { useResetItem } from '../redux/reset';
import { Pendable, UserLoading, User, LoadableList } from '../../common';

export default function Userist(props) {
  const { id, url } = { ...props };
  const {
    users,
    fetchUsers,
    fetchUserAfter,
    fetchUserPending,
  } = useFetchUsers();

  const { resetItem } = useResetItem();

  useEffect(() => {
    fetchUsers(url);
  }, [fetchUsers, url]);

  useEffect(() => {
    return () => {
      resetItem();
    };
  }, [resetItem]);

  return (
    <div>
      <LoadableList
        hasMore={fetchUserAfter}
        loading={fetchUserPending}
        onLoadClick={() => fetchUsers(url, id, fetchUserAfter)}
      >
        <Pendable
          pending={fetchUserPending && users.length === 0}
          pendContent={<UserLoading style={{ width: 680 }} />}
          repeat={5}
        >
          {users.length > 0 ? users.map((item) => <User user={item} />) : null}
        </Pendable>
      </LoadableList>
    </div>
  );
}
