const device_urls={
    "Pussy888": "pussy888://pussy888.com/?user",
    "918kiss": "lobbykiss://lobbykiss?account",
    "Mega888": "lobbymegarelease://?account",
    "EVO888": "evo888android://lobbyevoandroid?account",
    "Candy888": "candy888android://lobbycandyandroid?account",
}

const getDeviceUrl = (name, username, password) => {
    if (!device_urls[name]) return "/"
    const url = `${device_urls[name]}=${username}&password=${password}`;
    return url
}
const getCurrency = (country) => {
    switch (country) {
        case "SG":
          return "S$";
        case "MY":
          return "MYR";
        case "ID":
          return "IDR";
        case "TH":
          return "฿";
        case "AUS":
          return "AU$";  
        case "BN":
          return "$B"; 
        default:
            return "$";
      }
}

const getPhoneFormat = (country) => {
  switch (country) {
    case "SG":
      return "sg";
    case "MY":
      return "my";
    case "ID":
      return "id";
    case "TH":
      return "th";
    case "AUS":
      return "au";  
    case "VN":
      return "vn";
    case "BN":
      return "bn";  
    default:
        return "my";
  }
}

// Function to check and update the popup shown status
function updatePopupShownStatus(storageKey, noticeId) {
    let shownPopups = JSON.parse(window[storageKey].getItem("popup_isonce")) || [];
    if (!shownPopups.includes(noticeId)) {
      shownPopups.push(noticeId);
      window[storageKey].setItem("popup_isonce", JSON.stringify(shownPopups));
      return true;
    }
    return false;
}

const url_key = [
    "reward_rebates_bg",
    "reward_open_box",
    "reward_close_box",
    "level_reward",
    "checkin_reward",
    "spin_reward",
    "redeem_reward",
    "message_reward",
    "mission_reward",
    "category_tab_1_icon",
    "category_tab_2_icon",
    "category_tab_3_icon",
    "category_tab_4_icon",
    "category_tab_5_icon",
    "category_tab_6_icon",
    "category_tab_7_icon",
    "category_tab_8_icon",
    "category_tab_9_icon",
    "category_tab_10_icon",
    "language_icon",
    "marquee_bg",
    "checkin_bg",
    "marquee_text_color",
    "livechat",
    "general_copy_link",
    "general_downline",
    "general_more_info",
    "general_share",
    "vip_ranking",
    "logo",
    "menu_home",
    "menu_promo",
    "menu_deposit",
    "menu_history",
    "menu_contract_us",
    "menu_contact_us",
    "banner",
    "banner2",
    "deposit_ewallet",
    "deposit_dgpay_ewallet",
    "deposit_manual_deposit",
    "deposit_easypay_manual_deposit",
    "deposit_easypay",
    "deposit_surepay",
    "deposit_sun2pay",
    "deposit_dgpay",
    "deposit_telcopay",
    "deposit_gspay",
    "deposit_doitnow",
    "deposit_tng",
    "deposit_quickpay",
    "deposit_quickpay_ewallet",
    "home_login_btn",
    "home_register_btn",
    "more_info_modal",
    "payment_banner",
    "promo_moredetails",
    "promo_joinnow",
    "qrcode",
    "telegram",
    "whatsapp",
    "wallet_deposit",
    "wallet_withdraw",
    "wallet_profile",
    "wallet_refresh",
    "withdraw_title",
    "login_image",
    "forget_password_image",
    "livechat_image",
    "subline_icon",
    "partner_icon",
    "menusidebar_bg",
    "footer_bg",
    "header_bg",
    "root_bg",
    "wallet_welcome_bg",
    "wallet_container_bg",
    "profile_tab_icon_1",
    "profile_tab_icon_2",
    "profile_tab_icon_3",
    "profile_tab_icon_4",
    "profile_tab_icon_5",
    "profile_tab_icon_6",
    "profile_tab_icon_7",
    "profile_tab_icon_8",
    "profile_tab_icon_9",
    "side_menu_icon_1",
    "side_menu_icon_2",
    "side_menu_icon_3",
    "side_menu_icon_4",
    "side_menu_icon_5",
    "side_menu_icon_6",
    "side_menu_icon_7",
    "side_menu_icon_8",
    "side_menu_icon_9",
    "side_menu_icon_10",
    "side_menu_icon_11",
    "side_menu_icon_12",
    "logout_icon",
    "login_icon",
    "menu_contact_us_text",
    "menu_deposit_text",
    "menu_history_text",
    "menu_promo_text",
    "menu_home_text",
    "profile_tab_icon_1",
    "profile_tab_icon_2",
    "profile_tab_icon_3",
    "profile_tab_icon_4",
    "profile_tab_icon_5",
    "profile_tab_icon_6",
    "profile_tab_icon_7",
    "profile_tab_icon_8",
    "profile_tab_icon_9",
    "loading_image",
    "jackpot_image",
    "ctc_bg",
    "luckywheel_information_images",
    "luckywheel_registration_wheel",
    "luckywheel_registration_wheel_spin",
    "luckywheel_registration_wheel_win",
    "luckywheel_registration_wheel_win_popup",
    "game_demo_image1",
    "game_demo_image2",
    "game_demo_image3",
    "notification_accept_images",
    "floating_icon",
    "sticky_button1",
    "sticky_button2",
    "banner3",
    "banner4",
    "banner5",
    "leaderboard_image"
]
export {url_key, getDeviceUrl, getCurrency, updatePopupShownStatus, getPhoneFormat}