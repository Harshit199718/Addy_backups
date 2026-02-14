export const getFilterStyles = (selectedFilter, filter) => {
  return selectedFilter !== filter
    ? {
        $background: "transparent",
        $color: "#475f7b",
        $border: "1px solid #475f7b",
      }
    : {};
};

export const formatMessageDate = (dateString) => {
  const date = new Date(dateString);
  const now = new Date();
  
  const isToday = (someDate) => {
    return someDate.getDate() === now.getDate() &&
      someDate.getMonth() === now.getMonth() &&
      someDate.getFullYear() === now.getFullYear();
  };

  const isYesterday = (someDate) => {
    const yesterday = new Date();
    yesterday.setDate(now.getDate() - 1);
    return someDate.getDate() === yesterday.getDate() &&
      someDate.getMonth() === yesterday.getMonth() &&
      someDate.getFullYear() === yesterday.getFullYear();
  };

  const pad = (num) => (num < 10 ? `0${num}` : num);

  if (isToday(date)) {
    return `${pad(date.getHours())}:${pad(date.getMinutes())}`;
  } else if (isYesterday(date)) {
    return 'Yesterday';
  } else {
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
  }
};