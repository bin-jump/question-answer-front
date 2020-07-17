import React, { useState, useEffect } from 'react';
import Paper from '@material-ui/core/Paper';

export default function QuestionTitle(props) {
  const questionId = props.questionId;

  return (
    <div>
      <Paper square style={{ minHeight: 240, padding: '30px 25px' }}>
        Question
      </Paper>
    </div>
  );
}
