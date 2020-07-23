import React, { useEffect } from 'react';
import { useFetchItems } from '../redux/fetchItems';
import { useResetItem } from '../redux/reset';
import {
  Pendable,
  QuestionLoading,
  Question,
  LoadableList,
} from '../../common';

export default function QuestionList(props) {
  const { id, url } = { ...props };
  const {
    items,
    fetchItems,
    fetchItemPending,
    fetchItemAfter,
  } = useFetchItems();

  const { resetItem } = useResetItem();

  useEffect(() => {
    fetchItems(url);
  }, [fetchItems, url]);

  useEffect(() => {
    return () => {
      resetItem();
    };
  }, [resetItem]);
  console.log(items);
  return (
    <div>
      <LoadableList
        hasMore={fetchItemAfter}
        loading={fetchItemPending}
        onLoadClick={() => fetchItems(url, id, fetchItemAfter)}
      >
        <Pendable
          pending={fetchItemPending && items.length === 0}
          pendContent={<QuestionLoading style={{ width: 650 }} />}
          repeat={5}
        >
          {items.length > 0
            ? items.map((item) => <Question question={item} />)
            : null}
        </Pendable>
      </LoadableList>
    </div>
  );
}
