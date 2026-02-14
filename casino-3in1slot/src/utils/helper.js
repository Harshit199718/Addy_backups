import moment from 'moment-timezone';
import FingerprintJS from '@fingerprintjs/fingerprintjs';
const timeZone = import.meta.env.VITE_TIME_ZONE;

const checkBg = (background) => {
  if (!background) {
    return "";
  }
  if (
    background[0] === "#" ||
    background.includes("rgb") ||
    background.includes("hsl")
  ) {
    return background;
  }
  return `url(${background})`;
};

const checkIsText = (text) => {
  if (text.includes("http") || text.includes(".png") || text.includes(".jpeg") || text.includes("jpg") || text.includes("svg") || text.includes('data:')) {
    return false
  }
  return true;
};

const imgToBase64 = (file, cb) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function () {
      const base64String = reader.result;
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

const formatDate = (dateString) => {
  // Your date string in ISO 8601 format
  const dateStr = dateString;

  // Parse the date string using Moment.js
  const momentDate = moment.tz(dateStr, timeZone);

  // Format the momentDate as "HH:mm" (24-hour time format)
  const time = momentDate.format("HH:mm");

  // Format the momentDate as "D MMM, YYYY" (e.g., 6 Sept, 2022)
  const date = momentDate.format("D/M/YY");

  // Combine the formatted time and date
  const formattedDateTime = {
    time,
    date
  }
  // const formattedDateTime = `${time} - ${formattedDate}`;

  return formattedDateTime;
}

const timeDifferences = (targetDateTime) => {
  const datetime = new Date(targetDateTime);
  const currentDateTime = new Date();

  // Calculate the time difference in milliseconds
  const timeDifferenceMs = currentDateTime - datetime;

  // Convert milliseconds to minutes
  const timeDifferenceMinutes = Math.floor(timeDifferenceMs / (1000 * 60));

  return timeDifferenceMinutes
}


const getDeviceIdentifier = async () => {
  // Initialize an agent at application startup.
  const fp = await FingerprintJS.load();

  // Get the visitor identifier when you need it.
  const result = await fp.get();

  // This is the visitor identifier.
  const visitorId = result.visitorId;

  return visitorId;
};

const setLocalStorageExpiry = (key, value, ttl) => {
  const now = new Date()
  const item = {
		value: value,
		expiry: now.getTime() + ttl,
	}
	localStorage.setItem(key, JSON.stringify(item))
}

function getLocalStorageExpiry(key) {
	const itemStr = localStorage.getItem(key)
	// if the item doesn't exist, return null
	if (!itemStr) {
		return null
	}
	const item = JSON.parse(itemStr)
	const now = new Date()
	// compare the expiry time of the item with the current time
	if (now.getTime() > item.expiry) {
		// If the item is expired, delete the item from storage
		// and return null
		localStorage.removeItem(key)
		return null
	}
	return item.value
}

function ConvertToArray(key) {
  try {
    const item = JSON.parse(key)
    return item;
  } catch (error) {
    return [];
  }

}

export { checkBg, checkIsText, imgToBase64, formatDate, timeDifferences, getDeviceIdentifier, setLocalStorageExpiry, getLocalStorageExpiry, ConvertToArray };
