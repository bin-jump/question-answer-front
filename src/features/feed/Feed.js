import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { useFetchFeeds, useReset } from './redux/hooks';
import {
  Pendable,
  QuestionLoading,
  Question,
  LoadableList,
  User,
} from '../common';
import { milisecToDate } from '../common/helper';

function FeedItem(props) {
  const { item } = { ...props };

  const resolveFeed = () => {
    if (item.feedType === 'USER') {
      return <User elevation={0} user={item.target} />;
    } else {
      return <Question elevation={0} question={item.target} />;
    }
  };

  return (
    <Paper square style={{ paddingTop: 10 }}>
      <Typography style={{ margin: '0 0 -12px 30px', color: '#9dabb7' }}>
        {`${item.feedReason} · ${milisecToDate(item.created)}`}
      </Typography>
      {resolveFeed()}
    </Paper>
  );
}

export default function Feed(props) {
  const { feeds, feedAfter, fetchFeedsPending, fetchFeed } = useFetchFeeds();
  const { resetState } = useReset();

  useEffect(() => {
    fetchFeed();
  }, [fetchFeed]);

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  return (
    <div className="feature-timeline">
      <Grid container spacing={1} style={{ margin: '50px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={7}>
          <Pendable
            pending={fetchFeedsPending && feeds.length === 0}
            pendContent={<QuestionLoading />}
            repeat={5}
          >
            <LoadableList
              hasMore={feedAfter}
              loading={fetchFeedsPending}
              onLoadClick={() => fetchFeed(feedAfter)}
            >
              {feeds.map((item) => (
                <FeedItem item={item} />
              ))}
            </LoadableList>
          </Pendable>
        </Grid>
      </Grid>
    </div>
  );
}
