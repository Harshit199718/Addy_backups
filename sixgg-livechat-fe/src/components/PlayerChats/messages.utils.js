const groupMessagesByDate = (messages) => {
  if (!messages?.length) {
    return [];
  }

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

  // Function to format the date title
  const formatDateTitle = (dateString) => {
    const date = new Date(dateString);
    if (isToday(date)) {
      return "Today";
    } else if (isYesterday(date)) {
      return "Yesterday";
    } else {
      const options = { year: "numeric", month: "short", day: "numeric" };
      return date.toLocaleDateString("en-US", options);
    }
  };

  // Function to format the time
  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  // Reduce the array into an object grouped by date
  const grouped = messages.reduce((acc, message) => {
    const dateKey = formatDateTitle(message.createdAt);
    if (!acc[dateKey]) {
      acc[dateKey] = [];
    }
    acc[dateKey].push({
      ...message,
      time: formatTime(message.createdAt), // Add formatted time to each message
    });
    return acc;
  }, {});

  // Convert the object back to an array with title for easier use in React
  return Object.entries(grouped).map(([date, messages]) => ({
    title: date,
    messages,
  }));
};

export { groupMessagesByDate };
