const RankingConverter = (rank) => {
    let formattedRank;
    switch(rank){
        case "1 Bronze":
            formattedRank = "VIP 1"
        break;
        case "2 Silver":
            formattedRank = "VIP 2"
        break;
        case "3 Gold":
            formattedRank = "VIP 3"
        break;
        case "4 Platinum":
            formattedRank = "VIP 4"
        break;
        case rank?.startsWith("VIP"):
            formattedRank = rank
        break;
        default:
            formattedRank = "VIP"
    }
    return formattedRank
}

export default RankingConverter