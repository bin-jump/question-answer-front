import React from 'react';
import dompurify from 'dompurify';
import './Content.less';

export default function Content(props) {
  const { content } = { ...props };

  return (
    <div className="common-content-container">
      <div dangerouslySetInnerHTML={{ __html: dompurify.sanitize(content) }} />
    </div>
  );
}
