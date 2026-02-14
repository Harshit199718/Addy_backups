const standardOption = [
    'title',
    'sequence',
    'sites',
    'promo_type',
    'group',
    'max_payout_amount',
    'ctc_background_overwrite_enabled',
    'active',
    'selected_product',
    'limit',
    'limit_per_user',
    'promotion_day',
    'withdrawal_condition',
    'is_bankaccount_required',
    'require_approval',
    'can_claim_promo_group',
    'is_wallet_balance_check',
]

const yesterdayreward = [
    'bonus_percent',
    'max_bonus_amount',
    'yesterday_deposit',
    'total_deposit_required',
]

const weeklyrebate = [
    'bonus_percent',
    'max_bonus_amount',
    'total_deposit_required',
    'is_reward',
]

const redpacket = [
    'bonus_amount',
    'min_x_deposit_min_y_amount',
    'check_promotion_applied_deposit_date',
    'total_deposit_required',
]

const coupon = [

]

const referral = [
    'bonus_amount',
    'referral_check',
]

const newregister = [
    'bonus_amount',
    'new_member',
]

const luckywheel = [
    'is_lucky_wheel'
]

const CTCConditionChecking = (promo_template, field) => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    let backgroundColorSet = false;
    let backgroundColor = undefined;

    switch(promo_template){
        case 'yesterdayreward':
            const yesterdayrewardMerged = standardOption.concat(yesterdayreward);
            if(yesterdayrewardMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'weeklyrebate':
            const weeklyrebateMerged = standardOption.concat(weeklyrebate);
            if(weeklyrebateMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'redpacket':
            const redpacketMerged = standardOption.concat(redpacket);
            if(redpacketMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'coupon':
            const couponMerged = standardOption.concat(coupon);
            if(couponMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'referral':
            const referralMerged = standardOption.concat(referral);
            if(referralMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'newregister':
            const newregisterMerged = standardOption.concat(newregister);
            if(newregisterMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'luckywheel':
            const nluckywheelMerged = standardOption.concat(luckywheel);
            if(nluckywheelMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        default:
            backgroundColorSet = false
    }
    
    if(backgroundColorSet){
        backgroundColor = isDarkMode ? '#006400' : '#FFFFE0';
    } else {
        backgroundColor = backgroundColor
    }

    return (
        {
            backgroundColor: backgroundColor
        }
    )
}

export default CTCConditionChecking;