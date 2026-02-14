import { addThousandSeparator } from "../components/common/NumberConvertion";

export function getRandomMinMaxDecimalAmount(rangeString) {
  const [min, max] = rangeString.replace(/[{}]/g, '').split(',');
  
  let minNum = parseFloat(min.trim()).toFixed(2);
  let maxNum = parseFloat(max.trim()).toFixed(2);
  const random = Math.random();
  const scaled = parseFloat(random * (maxNum - minNum) + minNum).toFixed(2);
  return scaled;
}

export function getRandomMinMaxAmount(rangeString) {
  const [min, max] = rangeString.replace(/[{}]/g, '').split(',');
  let minNum = parseInt(min.trim());
  let maxNum = parseInt(max.trim());
  let result = Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
  
  return result
}

export function getRandomProductFromArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex];
}

export function createFakeData(
  numRows, 
  country, 
  leaderboard_dummy_data_game_show, 
  leaderboard_dummy_data_random_bet, 
  leaderboard_dummy_data_random_payout, 
  dummy_data_country_code, 
  dummy_data_star_between, 
  dummy_data_random_behind_mobile
) {
  const data = [];
  // Get Number
  const countryCode = dummy_data_country_code || '60';
  const starInBetwwen = dummy_data_star_between || '8'
  const randomBehindNumber = dummy_data_random_behind_mobile || '{10, 99}'
  const stars = '*'.repeat(starInBetwwen);

  // Get Game
  const gamestoshow = leaderboard_dummy_data_game_show || `Jili, Mega888, 918kiss, Pussy888`;
  const gamesArray = gamestoshow.split(', ').map(item => item.trim());

  // Get Amount
  const randomBet = leaderboard_dummy_data_random_bet || '{0.01, 10}'
  const randomPayoutRatio = leaderboard_dummy_data_random_payout || '{100, 300}'
  
  // Generate numRows rows of data
  for (let i = 0; i < numRows; i++) {
    const player = `${countryCode}${stars}${getRandomMinMaxAmount(randomBehindNumber)}`  
    const game = getRandomProductFromArray(gamesArray)
    const bet = getRandomMinMaxDecimalAmount(randomBet);
    const ratio = getRandomMinMaxAmount(randomPayoutRatio);
    const win = parseFloat((bet * ratio).toFixed(2));

    data.push({
      rank:{
        value: 0
      },
      player: {
        value: player,
      },
      game: {
        value: game,
      },
      bet: {
        value: bet, 
      },
      win: {
        value: win,
      },
      payout_ratio: {
        value: ratio,
      },
    });
  }
  data.sort((a, b) => b.win.value - a.win.value);
  data.forEach((item, index) => {
    item.rank = {
      value: index + 1
    }
    item.bet = {
      value: addThousandSeparator(item.bet.value, country),
    }
    item.win = {
      value: addThousandSeparator(item.win.value, country),
    }
  });

  return data;
}

export function setItemWithExpiry(key, value, expiryInMinutes) {
  const now = new Date();

  // Set the expiry time
  const item = {
    value: value,
    expiry: now.getTime() + expiryInMinutes * 60 * 1000,
  };

  localStorage.setItem(key, JSON.stringify(item));
}

export function getItemWithExpiry(key) {
  const itemStr = localStorage.getItem(key);

  // If the item doesn't exist, return null
  if (!itemStr) {
    return null;
  }

  const item = JSON.parse(itemStr);
  const now = new Date();

  // Compare the expiry time with the current time
  if (now.getTime() > item.expiry) {
    // If the item is expired, remove it from storage and return null
    localStorage.removeItem(key);
    return null;
  }

  return item.value;
}

