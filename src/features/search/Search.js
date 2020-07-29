import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import { useFetchSearchResults, useReset } from './redux/hooks';
import { QuestionLoading, LoadableList, Pendable, TagList } from '../common';
import './Search.less';

function SearchAnswer(props) {
  const { answer } = { ...props };
  return (
    <div className="feature-search-item-answer">
      <Link to={`/profile/${answer.author.id}`}>{`${answer.author.name}`}</Link>
      {': '}

      {answer.body}
      <Link to={`/question/${answer.parentId}/answer/${answer.id}`}>
        (see answer)
      </Link>
    </div>
  );
}

function SearchItem(props) {
  const { item } = { ...props };

  return (
    <Paper
      square
      style={{
        minHeight: 100,
        marginBottom: 10,
        padding: '10px 15px',
        width: 650,
      }}
    >
      <Typography
        variant="h6"
        component={Link}
        to={`/question/${item.question.id}`}
      >
        {item.question.title}
      </Typography>
      {item.answer ? (
        <SearchAnswer answer={item.answer} />
      ) : (
        <div className="feature-search-item-info">
          <RssFeedIcon />
          <div className="feature-search-item-info-word">
            {item.question.followCount}
          </div>
          <div className="feature-search-item-info-word">Follow</div>
        </div>
      )}
    </Paper>
  );
}

export default function Search(props) {
  const location = useLocation();

  const urlParams = new URLSearchParams(location.search);
  const searchKey = urlParams.get('q');

  const {
    searchResult,
    fetchSearchResults,
    searchPending,
    searchAfter,
  } = useFetchSearchResults();

  const { resetState } = useReset();

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  useEffect(() => {
    fetchSearchResults(searchKey);
  }, [fetchSearchResults, searchKey]);

  return (
    <div className="feature-search-item">
      <Grid container spacing={1} style={{ margin: '50px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={7}>
          <div style={{ display: 'flex' }}>
            {`Results for: `}
            <div style={{ fontWeight: 'bold', marginLeft: 10 }}>
              {searchKey}
            </div>
          </div>
          <hr style={{ width: '100%', borderTop: '1px dashed #788691' }} />

          <Pendable
            pending={searchPending && searchResult.length === 0}
            repeat={5}
            pendContent={<QuestionLoading />}
          >
            <LoadableList
              hasMore={searchAfter}
              loading={searchPending}
              onLoadClick={() => fetchSearchResults(searchKey, searchAfter)}
            >
              {searchResult.map((item) => (
                <SearchItem item={item} />
              ))}
            </LoadableList>
          </Pendable>
        </Grid>
      </Grid>
    </div>
  );
}
