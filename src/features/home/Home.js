import React, { useEffect, useRef } from 'react';
import Grid from '@material-ui/core/Grid';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
//import InfiniteScroll from 'react-infinite-scroller';
import { useFetchQuestionList } from './redux/hooks';
import { Loading, Question, LoadableList } from '../common';
import './Home.less';

export default function Home(props) {
  const {
    questionList,
    questionAfter,
    fetchQuestionList,
    fetchQuestionListPending,
  } = useFetchQuestionList();
  //const scroll = useRef({});
  let scroll = { cur: null };

  useEffect(() => {
    fetchQuestionList();
  }, [fetchQuestionList]);

  const clear = () => {
    console.log('clear', scroll);
    //scroller.current.reset();
    scroll.pageLoaded = 0;
  };

  useEffect(() => {
    // Your code here

    return () => {
      //clear();
    };
  }, []);

  return (
    <div className="feature-home">
      <Grid container spacing={1} style={{ margin: '50px 0', width: '100%' }}>
        <Grid item xs={2} />
        <Grid item xs={7}>
          {/* <InfiniteScroll
            pageStart={0}
            loadMore={() => {
              console.log(scroll);
              fetchQuestionList(questionAfter);
            }}
            hasMore={questionAfter}
            loader={<Loading />}
            ref={(r) => {
              scroll = r;
            }}
          >
            
          </InfiniteScroll> */}
          <LoadableList
            hasMore={questionAfter}
            loading={fetchQuestionListPending}
            onLoadClick={() => fetchQuestionList(questionAfter)}
          >
            {questionList.length > 0 ? (
              questionList.map((item) => <Question question={item} />)
            ) : (
              <div className="list-empty-sign">
                <DraftsRoundedIcon
                  style={{ width: 80, height: 80, color: '#bcbcbc' }}
                />
                <div className="list-empty-sign-words">No Content</div>
              </div>
            )}
          </LoadableList>
        </Grid>
      </Grid>
    </div>
  );
}
