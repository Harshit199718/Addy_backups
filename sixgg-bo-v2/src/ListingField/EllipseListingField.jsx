import React, { useState } from 'react';

const EllipseListingField = ({ text }) => {
  const [showFullText, setShowFullText] = useState(false);

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  const renderText = () => {
    if (!text) return '-';
    if (showFullText || text.length <= 20) return text;
    return `${text.substring(0, 20)}...`;
  };

  return (
    <span onClick={toggleText} style={{ cursor: 'pointer' }}>
      {renderText()}
    </span>
  );
};

export default EllipseListingField