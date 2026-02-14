import { addThousandSeparator } from "../../components/common/NumberConvertion";
import { getRandomMinMaxAmount, getRandomMinMaxDecimalAmount, getRandomProductFromArray } from "../../pages/leaderboardUtils";

const MAX_DISPLAY = 5;
const formatData = (deposits, withdrawals) => {
  // This function converts API data to the required format for the Table component
  return deposits.map((deposit, index) => ({
    mobile: {
      value: deposit.mobile || ''
    },
    amount: {
      value: `MYR${deposit.amount || 0}`,
      color: props=>props.theme.text_color_secondary,
    },
    ...withdrawals[index] ? {
      mobile_wd: {
        value: withdrawals[index].mobile || ''
      },
      amount_wd: {
        value: `MYR${withdrawals[index].amount || 0}`,
        color: props=>props.theme.text_color_secondary
      },
      name: {
        value: withdrawals[index].product_name || ''
      }
    } : {} // Handle case where there are fewer withdrawals than deposits
  }));
};
const getRandomData = (type) => {
  // Generate random data based on type
  const prods = SITE_NAME === 'i1EVO888H5'?PRODUCTS2:PRODUCTS;
  const randomProductIndex = Math.floor(Math.random() * prods.length);
  const randomProductName = prods[randomProductIndex];
  return {
    mobile: `60121*****${Math.floor(1000 + Math.random() * 9000)}`,
    amount: Math.floor(Math.random() * 200) + 50,
    product_name: type === 'withdraw' ? randomProductName : undefined,
  };
};

const getFilteredData = (deposits, withdrawals) => {
    const showedDeposit = JSON.parse(localStorage.getItem("showedDeposit"))
    const showedWithdrawl = JSON.parse(localStorage.getItem("showedWithdrawl"))
    let filteredApiDeposits=[];
    let filteredApiWithdrawls=[];
    if (!showedDeposit) {
      filteredApiDeposits=[...deposits];
      filteredApiWithdrawls=[...withdrawals];
      localStorage.setItem("showedDeposit", JSON.stringify(deposits.slice(0, MAX_DISPLAY)))
    } else {
      filteredApiDeposits = deposits.filter(item1 => !showedDeposit.some(item2 => JSON.stringify(item1) === JSON.stringify(item2)));
      const newArray1 = [...showedDeposit, ...filteredApiDeposits.slice(0, 1)];
      localStorage.setItem("showedDeposit", JSON.stringify(newArray1))
    }
    if (!showedWithdrawl) {
        localStorage.setItem("showedWithdrawl", JSON.stringify(withdrawals.slice(0, MAX_DISPLAY)))
    } else {
        filteredApiWithdrawls = withdrawals.filter(item1 => !showedWithdrawl.some(item2 => JSON.stringify(item1) === JSON.stringify(item2)));
        const newArray2 = [...showedWithdrawl, ...filteredApiWithdrawls.slice(0, 1)];
        localStorage.setItem("showedWithdrawl", JSON.stringify(newArray2))
    }
    return [filteredApiDeposits, filteredApiWithdrawls]
  }

  const updateTableData = (index, currentData, depositsApiData, withdrawalsApiData) => {
    // This function will be called periodically to update the data shown in the table
    let nextData = [...currentData.slice(1)]; // Remove the oldest record
    // Add a new record (either from API data or random data)
    const [filteredApiDeposits, filteredWithdrawls] = getFilteredData(depositsApiData, withdrawalsApiData);
    if (index < filteredApiDeposits.length || index < filteredWithdrawls.length) {
      const newRecord = formatData(
        [filteredApiDeposits[index] || getRandomData('deposit')],
        [filteredWithdrawls[index] || getRandomData('withdraw')]
      )[0]; // Only take the first record from the new data
      nextData.push(newRecord);
    } else {
      // If all API data has been shown, add random data
      nextData.push(formatData([getRandomData('deposit')], [getRandomData('withdraw')])[0]);
    }

    return {updatedIndex: (index+1), nextData}
  };

const getRandomLiveTableData = (
  currency_symbol,
  country, 
  livetable_dummy_data_game_show, 
  livetable_dummy_data_random_init, 
  livetable_dummy_data_random_multiplier,
  dummy_data_country_code, 
  dummy_data_star_between, 
  dummy_data_random_behind_mobile
) => {
  const data = [];

  // Get Number
  const countryCode = dummy_data_country_code || '60';
  const starInBetwwen = dummy_data_star_between || '8'
  const randomBehindNumber = dummy_data_random_behind_mobile || '{10, 99}'
  const stars = '*'.repeat(starInBetwwen);

  // Get Game
  const gamestoshow = livetable_dummy_data_game_show || `Jili, Mega888, 918kiss, Pussy888`;
  const gamesArray = gamestoshow.split(', ').map(item => item.trim());

  // Get Amount
  const randomBet = livetable_dummy_data_random_init || '{0.01, 10}'
  const randomPayoutRatio = livetable_dummy_data_random_multiplier || '{10, 20}'

  for (let i = 0; i < 5; i++) {
    const game = getRandomProductFromArray(gamesArray)
    const deposit_initial = getRandomMinMaxDecimalAmount(randomBet);
    const deposit_ratio = getRandomMinMaxAmount(randomPayoutRatio);
    const deposit_amount = parseFloat((deposit_initial * deposit_ratio).toFixed(0));
    const withdrawal_initial = getRandomMinMaxDecimalAmount(randomBet);
    const withdrawal_ratio = getRandomMinMaxAmount(randomPayoutRatio);
    const withdrawal_amount = parseFloat((withdrawal_initial * withdrawal_ratio).toFixed(2));

    data.push({
      mobile:{
        value: `${countryCode}${stars}${getRandomMinMaxAmount(randomBehindNumber)}`,
        fontSize: "11px",
      },
      amount: {
        value: deposit_amount,
      },
      mobile_wd: {
        value: `${countryCode}${stars}${getRandomMinMaxAmount(randomBehindNumber)}`,
        fontSize: "11px",
      },
      amount_wd: {
        value: (withdrawal_amount * 10).toFixed(2), 
      },
      name: {
        value: game,
        fontSize: "11px",
      }
    });
  }
  data.forEach((item, index) => {
    item.amount = {
      value: `${currency_symbol} ${addThousandSeparator(item.amount.value, country)}`,
      fontSize: "11px",
    }
    item.amount_wd = {
      value: `${currency_symbol} ${addThousandSeparator(item.amount_wd.value, country)}`,
      fontSize: "11px",
    }
  });

  return data;
};

export {
    getFilteredData,
    updateTableData,
    formatData,
    getRandomData,
    getRandomLiveTableData
}