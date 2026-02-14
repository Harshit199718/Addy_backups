import React, { useState } from 'react'
import { BetContainer, BetDescription, BetHistoryContainer, BetTab } from './BetHistory.styled'
import LayoutSpacing from '../../features/Layout/LayoutSpacing'
import { Icon } from '@iconify/react';
import { useGetBetHistoryQuery } from '../../api/hooks';
import Loading from '../../components/common/Loading';
import { selectConfigData } from '../../api/generalApi';
import { useSelector } from 'react-redux';

function Bet({bet}) {
    const [showDescription, setShowDescription] = useState(false);
    const { secondary_color } = useSelector(selectConfigData);
    return (
        <BetContainer>
            <BetTab $result={bet?.winlose} onClick={() => setShowDescription(!showDescription)}>
                <div className="details">
                    <div style={{ display: 'flex', alignItems: 'center' }}>
                        {bet?.product_img && 
                        <img
                        src={bet?.product_img}
                        alt=""
                        style={{
                            borderRadius: '50%',
                            border: `1px solid ${secondary_color}`,
                            width: '50px',
                            height: '50px',
                            marginRight: '10px', 
                        }}
                        />
                        }
                        <div>
                            <h4 className="bet-details">
                                {bet?.product_name} {bet?.detail?.GameName && `[${bet?.detail?.GameName}]` } Bet: {bet?.bet} 
                                <span>{(Number(bet?.winlose) < 0) ? ' Lose ' : ' Win '} {bet?.winlose}</span>
                            </h4>
                            <h4 className="time-details">{new Date(bet?.matchtime).toLocaleString()}</h4>
                        </div>
                    </div>
                </div>
                <Icon icon={`mingcute:${showDescription?"up":"down"}-line`} />
                
            </BetTab>
            {
                showDescription?
                <BetDescription>
                    <div className="ids_container">
                        <div className="id">
                            <label htmlFor="">Bet ID:</label>
                            <h4 className="value">{bet?.betid}</h4>
                        </div>
                        <div className="id">
                            <label htmlFor="">Product:</label>
                            <h4 className="value">{bet?.product_name}</h4>
                        </div>
                    </div>
                    {/* <h4 className="balance">
                        Start Balance: <span>{bet?.detail?.StartBalance}</span> {bet?.detail?.CurrencyCode}
                    </h4> */}
                    <h4 className="balance">
                        Win Lose: <span>{bet?.winlose}</span> 
                    </h4>
                    <h4 className="balance">
                        Payout: <span>{bet?.payout}</span> 
                    </h4>
                    <h4 className="balance">
                        Turnover: <span>{bet?.turnover}</span> 
                    </h4>
                </BetDescription>
                :null
            }
        </BetContainer>
    )
}
function BetHistory() {
    const {data: betHistory, isLoading} = useGetBetHistoryQuery();
    
  return (
    <LayoutSpacing>
        <Loading isLoading={isLoading} />
        <BetHistoryContainer>
                {betHistory?.map(bet=>(
                    <Bet key={bet.betid} bet={bet} />
                ))}
        </BetHistoryContainer>
    </LayoutSpacing>
  )
}

export default BetHistory