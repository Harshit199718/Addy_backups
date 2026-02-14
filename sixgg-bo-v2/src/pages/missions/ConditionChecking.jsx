const standardOption = [
    'title',
    'sequence',
    'site',
    'category',
    'require_approval',
    'active',
    'is_bankaccount_required',
    'quantity_offer',
    'limit_per_user',
    'recurrence_frequency',
    'description'
]

const depositcount = [
    'type_offer',
    'max_token',
    'token_expired_days',
    'x_count_deposit',
]

const depositamount = [
    'type_offer',
    'max_token',
    'token_expired_days',
    'x_amount_deposit'
]

const firstdeposit = [
    'type_offer',
    'max_token',
    'token_expired_days',
    'first_deposit'
]
// const depositcountandmindeposit = [
//     'type_offer',
//     'max_token',
//     'token_expired_days',
//     'x_count_deposit',
//     'min_deposit'
// ]

const depositcountanddepositamount = [
    'type_offer',
    'max_token',
    'token_expired_days',
    'x_count_deposit',
    'x_amount_deposit',
]

const withdrawalcount = [
    'type_offer',
    'max_token',
    'token_expired_days',
    'x_count_withdrawal',
]

const withdrawalamount = [
    'type_offer',
    'max_token',
    'token_expired_days',
    'x_amount_withdrawal'
]

const firstwithdrawal = [
    'type_offer',
    'max_token',
    'token_expired_days',
    'first_withdrawal'
]
// const withdrawalcountandminwithdrawal = [
//     'type_offer',
//     'max_token',
//     'token_expired_days',
//     'x_count_withdrawal',
//     'min_withdrawal'
// ]

const withdrawalcountandwithdrawalamount = [
    'type_offer',
    'max_token',
    'token_expired_days',
    'x_count_withdrawal',
    'x_amount_withdrawal'
]

const turnoverbyproductcategory = [
    'type_offer',
    'max_token',
    'token_expired_days',
    'min_turnover_amount',
    'product_category'
]

const turnoverbyproduct = [
    'type_offer',
    'max_token',
    'token_expired_days',
    'x_turnover_amount',
    'selected_product'
]

// const consecutivecheckin = [
//     'type_offer',
//     'max_token',
//     'token_expired_days',
//     'x_count_checkin',
// ]

// const consecutivecheckinwithdeposit = [
//     'type_offer',
//     'max_coupon',
//     'coupon_tag',
//     'x_count_checkin',
//     'x_amount_deposit_checkin'
// ]

// const consecutivecheckinwithdepositcount = [
//     'type_offer',
//     'max_coupon',
//     'coupon_tag',
//     'x_count_checkin',
//     'x_count_deposit_checkin'
// ]

const ConditionChecking = (mission_template, field) => {
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    let backgroundColorSet = false;
    let backgroundColor = undefined;

    switch(mission_template){
        case 'depositcount':
            const depositcountMerged = standardOption.concat(depositcount);
            if(depositcountMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'depositamount':
            const depositamountMerged = standardOption.concat(depositamount);
            if(depositamountMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'firstdeposit':
            const firstdepositMerged = standardOption.concat(firstdeposit);
            if(firstdepositMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        // case 'depositcountandmindeposit':
        //     const depositcountandmindepositMerged = standardOption.concat(depositcountandmindeposit);
        //     if(depositcountandmindepositMerged?.includes(field)){
        //         backgroundColorSet = true
        //     }
        // break;
        case 'depositcountanddepositamount':
            const depositcountanddepositamountMerged = standardOption.concat(depositcountanddepositamount);
            if(depositcountanddepositamountMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'withdrawalcount':
            const withdrawalcountMerged = standardOption.concat(withdrawalcount);
            if(withdrawalcountMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'withdrawalamount':
            const withdrawalamountMerged = standardOption.concat(withdrawalamount);
            if(withdrawalamountMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'firstwithdrawal':
            const firstwithdrawalMerged = standardOption.concat(firstwithdrawal);
            if(firstwithdrawalMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        // case 'withdrawalcountandminwithdrawal':
        //     const withdrawalcountandminwithdrawalMerged = standardOption.concat(withdrawalcountandminwithdrawal);
        //     if(withdrawalcountandminwithdrawalMerged?.includes(field)){
        //         backgroundColorSet = true
        //     }
        // break;
        case 'withdrawalcountandwithdrawalamount':
            const withdrawalcountandwithdrawalamountMerged = standardOption.concat(withdrawalcountandwithdrawalamount);
            if(withdrawalcountandwithdrawalamountMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'turnoverbyproductcategory':
            const turnoverbyproductcategoryMerged = standardOption.concat(turnoverbyproductcategory);
            if(turnoverbyproductcategoryMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'turnoverbyproduct':
            const turnoverbyproductMerged = standardOption.concat(turnoverbyproduct);
            if(turnoverbyproductMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'consecutivecheckin':
            const consecutivecheckinMerged = standardOption.concat(consecutivecheckin);
            if(consecutivecheckinMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'consecutivecheckinwithdeposit':
            const consecutivecheckinwithdepositMerged = standardOption.concat(consecutivecheckinwithdeposit);
            if(consecutivecheckinwithdepositMerged?.includes(field)){
                backgroundColorSet = true
            }
        break;
        case 'consecutivecheckinwithdepositcount':
            const consecutivecheckinwithdepositcountMerged = standardOption.concat(consecutivecheckinwithdepositcount);
            if(consecutivecheckinwithdepositcountMerged?.includes(field)){
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

export default ConditionChecking