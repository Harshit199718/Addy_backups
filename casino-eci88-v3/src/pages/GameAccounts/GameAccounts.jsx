import React, { useState } from "react";
import { useGetGameAccountsQuery, useGetGameAccountsSoccerQuery } from "../../api/hooks";
import {
  GameAccount,
  GameAccountsContainer,
  UserGameDetails,
} from "./GameAccounts.styled";
import { Icon } from "@iconify/react";
import Image from "../../components/common/Image";
import LayoutSpacing from "../../features/Layout/LayoutSpacing";

function GameAccountWrapper({ account }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <GameAccount>
      <Image src={account.product.image_mobile} width="100px" height="100px" />
      <UserGameDetails>
        <h3 className="username">{account.login}</h3>
        <div className="input-container">
          <input
            type={showPassword ? "text" : "password"}
            value={account.password}
            readOnly
          />
          <Icon
            icon="mdi:eye"
            color="#fff"
            onClick={() => setShowPassword(!showPassword)}
          />
        </div>
        <div className="amount-container">
          <div className="tag">{account?.product?.category}</div>
          <h3 className="amount">{account?.product?.ltype?.toUpperCase()}</h3>
        </div>
      </UserGameDetails>
    </GameAccount>
  );
}
function GameAccounts() {
  const { data: gameAccountsApp } = useGetGameAccountsQuery();
  const { data: gameAccountsSoccer } = useGetGameAccountsSoccerQuery();
  // Handle the case where either data might be undefined
  const gameAccountsAppData = gameAccountsApp || [];
  const gameAccountsSoccerData = gameAccountsSoccer || [];

  // Combine the two data sets
  const gameAccounts = [...gameAccountsAppData, ...gameAccountsSoccerData];
  
  return (
    <LayoutSpacing>
      <GameAccountsContainer>
        {gameAccounts?.map((account, index) => (
          <GameAccountWrapper key={account?.login + 1} account={account} />
        ))}
      </GameAccountsContainer>
    </LayoutSpacing>
  );
}

export default GameAccounts;
