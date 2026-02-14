function splitPaymentOptions (paymentOptions, t) {
    const allPayments = [
      // Quickpay VN PG
      { key: "907", label: t("Online Banking") },
      { key: "908", label: t("Online Transfer") },
      // Quickpay VN EW
      { key: "909", label: t("QRPay") },
      { key: "921", label: t("ZaloPay") },
      { key: "923", label: t("MomoPay") },
      { key: "926", label: t("ViettelPay") },
      // DGPay MY PG
      { key: "MAYB", label: t("Maybank") },
      { key: "CIMB", label: t("CIMB Bank") },
      { key: "PBBB", label: t("Public Bank") },
      { key: "RHBB", label: t("RHB Bank") },
      { key: "HOLB", label: t("Hong Leong Bank") },
      { key: "AFIN", label: t("Affin Isalamic Bank") },
      { key: "SINA", label: t("Bank Simpanan Nasional") },
      // DGPay SG PG
      { key: "DBS", label: t("DBS Bank LTD") },
      { key: "UOB", label: t("United Overseas Bank") },
      { key: "OCBC", label: t("Oversea-Chinese Banking Corporation") },
      // DGPay ID EW
      { key: "10", label: t("Dana") },
      { key: "11", label: t("OVO") },
      { key: "12", label: t("ShopeePay") },
      { key: "30", label: t("Qris (Barcode sekali pakai saja)") },
    ]
    const paymentOptionsArray = paymentOptions.split(",");
    const filteredPayment = allPayments.filter(payment => (paymentOptionsArray.includes(payment.key)));

    return filteredPayment
}

const GetPaymentOptions = (id, config, t) => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
    const isAndroid = /Android/.test(navigator.userAgent);
    const isWindowsPhone = /Windows Phone/.test(navigator.userAgent);
    const isBlackBerry = /BlackBerry/.test(navigator.userAgent);

    switch (config?.country) {
      case "ID":
        switch (id) {
          case "dgpay-ewallet":
            if (isIOS || isAndroid || isWindowsPhone || isBlackBerry) {
                return splitPaymentOptions(config?.dgpay_available_ewallet, t)
            } else {
                const desktopPayment = splitPaymentOptions(config?.dgpay_available_ewallet, t)
                const desiredKeys = ["10", "30"];
                const desktopPaymentFinal = desktopPayment.filter(payment => desiredKeys.includes(payment.key));
                return desktopPaymentFinal
            }
        }
      case "MY":
        switch (id) {
            case "dgpay":
                return splitPaymentOptions(config?.dgpay_available_pg, t)
        default:
            return null
        }
      case "VN":
        switch (id) {
            case "quickpay":
                return splitPaymentOptions(config?.quickpay_available_pg, t)
            case "quickpay-ewallet":
                return splitPaymentOptions(config?.quickpay_available_ewallet, t)
            default:
                return null
        }
      default:
        return null
    }
};

export default GetPaymentOptions;