import React from 'react';
import './Question.less';

export default function TagList(props) {
  const tags = props.tags;
  return (
    <div className="common-tag-container">
      {tags.map((item) => (
        <div className="common-tag">{item.label}</div>
      ))}
    </div>
  );
}
