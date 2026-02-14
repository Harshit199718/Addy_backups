export const getShareImages = (link, images) => {
    return [
        {
          id: "whatsapp",
          image: images?.whatsapp,
          title: "WhatsApp",
          link: `https://api.whatsapp.com/send?text=${encodeURIComponent(
            link
          )}`,
        },
        {
          id: "telegram",
          image: images?.telegram,
          title: "Telegram",
          link: `https://t.me/share/url?url=${encodeURIComponent(
            link
          )}`,
        },
        {
          id: "qrcode",
          image: images?.qrcode,
          title: "QRCode",
        },
      ]
}

export const getButtons = (images) => {
    return [
        { img: images?.general_downline, id: "downline", path: "/downline" },
        { img: images?.general_share, id: "share" },
        { img: images?.general_more_info, id: "more_info" },
        { img: images?.general_copy_link, id: "copy_link" },
      ];
}