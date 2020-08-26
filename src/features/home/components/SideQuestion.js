import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import { useFetchHotQuestion } from '../redux/hooks';
import './Side.less';

function QuestionItem(props) {
  const { question } = { ...props };

  return (
    <div className="feature-home-side-question">
      <div>
        <Link to={`/question/${question.id}`}>{question.title}</Link>
      </div>
      <div className="feature-home-side-question-info">
        {question.answerCount} answers
      </div>
    </div>
  );
}

export default function SideQuestion(props) {
  const {
    hotQuestions,
    fetchHotQuestion,
    fetchHotQuestionsPending,
  } = useFetchHotQuestion();

  useEffect(() => {
    fetchHotQuestion();
  }, [fetchHotQuestion]);

  return (
    <div>
      {hotQuestions.length > 0 ? (
        <Paper square style={{ padding: '16px 20px' }}>
          <div className="feature-home-side-title">Hot Questions</div>
          <hr />
          {hotQuestions.map((item, i) => (
            <div>
              <QuestionItem index={i} question={item} />
              {i < hotQuestions.length - 1 ? <hr /> : null}
            </div>
          ))}
        </Paper>
      ) : null}
    </div>
  );
}
