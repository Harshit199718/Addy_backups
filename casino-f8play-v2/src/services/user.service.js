import api from './api';

class UserService {

  getClickToClaims() {
    return api.get('/clicktoclaims/');
  }

  getPromotionGroups() {
    return api.get('/promotiongroups/');
  }
  createDeposit(values) {
    return api.post('/deposits/', values);
  }
  
  claimCTCPromotion(id) {
    return api.post(`/clicktoclaims/`,{
      id
    });
  }

  getDailyCheckins() {
    return api.get('/daily-checkins/v2/')
  }

  getTokens() {
    return api.get('/daily-checkins/v2/get_tokens/')
  }

  getLuckyWheelSlots() {
    return api.get('/luckywheel/')
  }

  spinLuckyWheel() {
    return api.get('/luckywheel/spin/')
  }

  claimTodayCheckin() {
    return api.post('/daily-checkins/v2/')
  }
  
  getBalance() {
    return api.get('/wallet/');
  }
  
  getProducts(category) {
    return api.get(`/products/?category=${category}`);
  }

  getOtherProducts(start, end, product_name) {
    return api.get(`/product/${product_name}/games/?_start=${start}&_end=${end}`)
  }

  getProductsDirectGameListByName(category, name) {
    return api.get(`/products/?category=${category}&name=${name}`);
  }

  getNewsfeeds() {
    return api.get('/newsfeeds/');
  }

  getConfigs() {
    return api.get('/skinconfigv2/');
  }

  getBanks() {
    return api.get('/banks/')
  }

  getCustomerBanks() {
    return api.get('/customer-bank-accounts/');
  }

  withdraw(payload) {
    return api.post('/withdrawals/', payload);
  }

  // getEztechProducts(start, end) {
  //   return api.get(`/product/eztech88/games/?_start=${start}&_end=${end}`)
  // }

  // getJokerProducts(start, end) {
  //   return api.get(`/product/joker/games/?_start=${start}&_end=${end}`)
  // }

  // getHabaneroProducts(start, end) {
  //   return api.get(`/product/habanero/games/?_start=${start}&_end=${end}`)
  // }

  // getPlaytechProducts(start, end) {
  //   return api.get(`/product/playtech/games/?_start=${start}&_end=${end}`)
  // }

  // getJDBProducts(start, end) {
  //   return api.get(`/product/jdb/games/?_start=${start}&_end=${end}`)
  // }

  // getSpadeGamingProducts(start, end) {
  //   return api.get(`/product/spadegaming/games/?_start=${start}&_end=${end}`)
  // }

  // getLive22Products(start, end) {
  //   return api.get(`/product/live22/games/?_start=${start}&_end=${end}`)
  // }

  // getPragmaticProducts(start, end) {
  //   return api.get(`/product/pragmatic/games/?_start=${start}&_end=${end}`)
  // }

  // getVpowerProducts(start, end) {
  //   return api.get(`/product/vpower/games/?_start=${start}&_end=${end}`)
  // }

  // getJiliProducts(start, end) {
  //   return api.get(`/product/jili/games/?_start=${start}&_end=${end}`)
  // }


  getStartedGames(id) {
    return api.get(`/user-game-account/${id}`)
  }

  startProduct(id, selectedCredit) {
    return api.post(`/product/${id}/start/?credit_type=${selectedCredit}`);
  }

  stopProduct(id) {
    return api.post(`/product/${id}/stop/`);
  }

  startEasytechProduct(id, selectedCredit) {
    return api.post(`/product/eztech88/start/${id}/?credit_type=${selectedCredit}`);
  }

  startEasytogoProduct(id, gameid, selectedCredit) {
    return api.post(`/product/easytogo/start/${id}/${gameid}/?credit_type=${selectedCredit}`);
  }

  getSession() {
    return api.get('/session/')
  }
  getBetHistory(userId) {
    return api.get(`/user-bet-history/`, userId)
  }
  getOrders(type) {
    return type == "orders"?api.get(`/actors/transactions/`):api.get(`/${type}/`)
  }
  getLuckyWheelRewards() {
    return api.get(`/rewards/luckywheel_rewards/`)
  }
  deleteOrder(id) {
    return api.delete(`/actors/transactions/${id}/`)
  }
  getMail() {
    return api.get(`/mail/`)
  }
  getTopWinnings() {
    return api.get('/topwinning/')
  }
  updateIsRead(id, payload) {
    return api.put(`/mail/${id}/`, payload)
  }
  changeGameId(id) {
    return api.put(`/changegameid/${id}`);
  }

  getMerchantBankAccount() {
    return api.get('/merchant-bank-accounts/')
  }

  getMerchantBankAccountEW() {
    return api.get('/merchant-ewallet-accounts/?ewallet_provider=surepay-ewallet')
  }
}

const userService = new UserService();
export default userService;