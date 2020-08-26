import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { useFetchSearchResults, useReset } from './redux/hooks';
import { QuestionLoading, LoadableList, Pendable, Content } from '../common';
import { milisecToDate, striphtml } from '../common/helper';
import './Search.less';

function SearchItem(props) {
  const { item } = { ...props };
  const questionId = item.parentId ? item.parentId : item.id;
  const [colorStartHtml, startMark] = [
    `<em style='background:yellow'>`,
    '%!?&%',
  ];
  const [colorEndHtml, endMark] = [`</em>`, '%/!?&%'];

  const stripLayout = (content) => {
    let html = content
      .replace(colorStartHtml, startMark)
      .replace(colorEndHtml, endMark);
    html = striphtml(html);

    return html
      .replace(startMark, colorStartHtml)
      .replace(endMark, colorEndHtml);
  };

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
      <Typography variant="h6" component={Link} to={`/question/${questionId}`}>
        <Content content={item.title} />
      </Typography>
      {item.searchType === 'ANSWER' ? (
        <div className="feature-search-item-answer">
          <Link to={`/profile/${item.author.id}`}>{`${item.author.name}`}</Link>
          {': '}
          <Content
            style={{ display: 'inline-block' }}
            content={stripLayout(item.body)}
          />

          <Link to={`/question/${questionId}/answer/${item.id}`}>
            (see answer)
          </Link>
        </div>
      ) : (
        <div className="common-question-author">
          {`Asked by `}
          <Link style={{ color: '#33b4de' }} to={`/profile/${item.author.id}`}>
            {item.author.name}
          </Link>
          {` on ${milisecToDate(item.created)}.`}
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
  }, [resetState, searchKey]);

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
