import React, { useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import DraftsRoundedIcon from '@material-ui/icons/DraftsRounded';
//import InfiniteScroll from 'react-infinite-scroller';
import { useFetchQuestionList } from './redux/hooks';
import { useReset } from './redux/resetState';
import { Pendable, QuestionLoading, Question, LoadableList } from '../common';
import SideQuestion from './components/SideQuestion';
import './Home.less';

export default function Home(props) {
  const {
    questionList,
    questionAfter,
    fetchQuestionList,
    fetchQuestionListPending,
  } = useFetchQuestionList();
  //const scroll = useRef({});
  //let scroll = { cur: null };

  const { resetState } = useReset();

  useEffect(() => {
    fetchQuestionList();
  }, [fetchQuestionList]);

  // const clear = () => {
  //   console.log('clear', scroll);
  //   //scroller.current.reset();
  //   scroll.pageLoaded = 0;
  // };

  useEffect(() => {
    return () => {
      resetState();
    };
  }, [resetState]);

  return (
    <div className="feature-home">
      <Grid
        container
        spacing={0}
        direction="row"
        alignItems="flex-start"
        justify="center"
        style={{ margin: '30px 0', width: '100%' }}
      >
        <Grid item xs={1} />
        <Grid item xs={7}>
          <LoadableList
            hasMore={questionAfter}
            loading={fetchQuestionListPending}
            onLoadClick={() => fetchQuestionList(questionAfter)}
          >
            <Pendable
              pending={fetchQuestionListPending && questionList.length === 0}
              pendContent={<QuestionLoading style={{ width: 650 }} />}
              repeat={5}
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
            </Pendable>
          </LoadableList>
        </Grid>

        <Grid item xs={3}>
          <SideQuestion />
        </Grid>
      </Grid>
    </div>
  );
}
