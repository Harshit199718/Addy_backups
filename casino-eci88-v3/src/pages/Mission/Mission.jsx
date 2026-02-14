import React, { useEffect, useState } from "react";
import { MissionClaimButton, MissionBanner, MissionContainer, MissionItem, MissionList, MissionTitle, MissionTab, MissionTabs, MissionProgressBar, MissionProgress, MissionDescription, MissionProgressText, MissionImage, MissionRewardContainer } from "./Mission.styled";
import { useClaimMissionMutation, useGetMissionsQuery, useWalletQuery } from "../../api/hooks";
import MissionTimer from "./MissionTimer";
import Modal from "../../components/common/Modal";
import "../Promo/suneditor.min.css";
import Loading from "../../components/common/Loading";
import { Icon } from '@iconify/react'
import { useTranslation } from "react-i18next";
import DailyCheckin from "../../features/Rewards/DailyCheckin";

const Mission = () => {
    const { t } = useTranslation();
    const [activeTab, setActiveTab] = useState('daily');
    const [categoryTab, setCategoryTab] = useState(null);
    const [succesfullyClaimed, setSuccessfullyClaimed] = useState(null);
    const [errorClaimed, setErrorClaimed] = useState(null);
    const [showMissionDescription, setShowMissionDescription] = useState(null);
    const { data: missionData, refetch: missionDataRefetch, isFetching } = useGetMissionsQuery();
    const [ claimMission, { data: claimMissionData, isSuccess, error } ] = useClaimMissionMutation();
    const { data: wallet, refetch: walletRefetch } = useWalletQuery();
    const seenCategories = new Set();

    useEffect(() => {
        if(isSuccess){
            setSuccessfullyClaimed({ message: t("Mission claimed successfully") });
        }
        if(error){
            setErrorClaimed({ message: t("There is some error while claim mission")})
        }
    },[isSuccess, error])
    
    return (
        <MissionContainer>
            <MissionBanner>
                <MissionTitle>
                    {t("Token Mission")}
                    <div className="token" style={{ display: "flex", alignItems: "center", textAlign: "center", justifyContent: "center" }}>
                        {t("token")}: {wallet?.checkin_token_available}
                        <Icon icon="ri:refresh-line" style={{ color: "white", marginLeft: "8px"  }} 
                            onClick={() => {
                                missionDataRefetch()
                                walletRefetch()
                            }}
                        />
                    </div>
                </MissionTitle>
            </MissionBanner>
            <MissionTabs>
                <MissionTab active={activeTab === 'daily'} onClick={() => setActiveTab('daily')}>{t("daily")}</MissionTab>
                <MissionTab active={activeTab === 'weekly'} onClick={() => setActiveTab('weekly')}>{t("weekly")}</MissionTab>
                <MissionTab active={activeTab === 'monthly'} onClick={() => setActiveTab('monthly')}>{t("monthly")}</MissionTab>
                <MissionTab active={activeTab === 'checkin'} onClick={() => setActiveTab('checkin')}>{t("checkin")}</MissionTab>
                {/* <MissionTab active={activeTab === null} onClick={() => setActiveTab(null)}>Endless</MissionTab> */}
            </MissionTabs>
            <MissionTimer period={activeTab} t={t}/>
            <MissionList $activeTab={activeTab}>
            {isFetching ? <Loading isLoading={isFetching} fullscreen={false} /> 
            :
            activeTab === "checkin" ?
                <DailyCheckin />
            :
            missionData?.length > 0 && 
            <>
                <MissionTabs>
                    <MissionTab active={categoryTab === null} onClick={() => setCategoryTab(null)}>{t("all")}</MissionTab>
                        {missionData?.filter(mission => {
                            if (mission?.recurrence_frequency !== activeTab) {
                                return false;
                            }
                            if (seenCategories.has(mission?.category)) {
                                return false;
                            } else {
                                seenCategories.add(mission?.category);
                                return true;
                            }
                        }).map(mission => (
                            <MissionTab key={mission?.category} active={categoryTab === mission?.category} onClick={() => setCategoryTab(mission?.category)}>
                                {t(mission?.category)}
                            </MissionTab>
                        ))}
                </MissionTabs>
                
                {missionData.filter((mission) => mission?.recurrence_frequency === activeTab && (!categoryTab || mission?.category === categoryTab))?.length > 0 ? 
                    missionData.filter((mission) => mission?.recurrence_frequency === activeTab && (!categoryTab || mission?.category === categoryTab))?.map((mission) => {
                        const progress = (Number(mission?.other?.passed_count) / Number(mission?.other?.checked_count)) * 100
                        return (
                            <MissionItem key={mission.id} isClaimed={!mission?.other?.applicable && progress === 100}>
                                <MissionDescription>
                                    <div className="title">{mission?.title}</div>
                                    <div className="description" onClick={() => setShowMissionDescription(mission)}>
                                        {t("View Details")} 🛈
                                    </div>
                                    {Object.keys(mission?.other?.multi_condition).length > 0 ?
                                    <>
                                        <MissionProgressBar>
                                            <MissionProgress progress={(Number(mission?.other?.multi_condition?.passed_item_count)/Number(mission?.other?.multi_condition?.checked_item_count)*100)} />
                                            <MissionProgressText>{mission?.other?.multi_condition?.passed_item_count}/{mission?.other?.multi_condition?.checked_item_count}</MissionProgressText>
                                        </MissionProgressBar>
                                        <MissionProgressBar>
                                            <MissionProgress progress={(Number(mission?.other?.multi_condition?.passed_item_amount)/Number(mission?.other?.multi_condition?.checked_item_amount)*100)} />
                                            <MissionProgressText>{mission?.other?.multi_condition?.passed_item_amount}/{mission?.other?.multi_condition?.checked_item_amount}</MissionProgressText>
                                        </MissionProgressBar>
                                    </>
                                    :
                                        <MissionProgressBar>
                                            <MissionProgress progress={progress} />
                                            <MissionProgressText>{mission?.other?.passed_count}/{mission?.other?.checked_count}</MissionProgressText>
                                        </MissionProgressBar>
                                    }
                                </MissionDescription>
                                <MissionRewardContainer>
                                    <MissionImage src={mission?.image}/>
                                    <span className="reward">{t(mission?.type_offer)}: {Number(mission?.quantity_offer)?.toFixed(0) || null}</span>
                                </MissionRewardContainer>
                                <MissionRewardContainer>
                                    <MissionClaimButton disabled={!mission?.other?.applicable} onClick={() => claimMission({id: mission?.id})}>
                                        {
                                        (mission?.other?.applicable && progress === 100) ? 
                                            t("Claim")
                                        : 
                                            progress === 100 ? t("Claimed") : t("Claim")
                                        }
                                    </MissionClaimButton>
                                    {/* {!mission?.other?.applicable && 
                                        <span className="navigation" onClick={() => setShowMissionDescription(mission)}>
                                            {t("Go to")} {t(mission?.category)}
                                        </span>
                                    } */}
                                </MissionRewardContainer>
                            </MissionItem>                                
                        )
                    })
                    :
                    <MissionItem style={{ justifyContent: "center", textAlign: "center" }}>
                        {t("No Mission Found")} 
                    </MissionItem>
                }
            </>
            }
            </MissionList>
            <Modal
            title={showMissionDescription?.title}
            isOpen={showMissionDescription}
            onClose={() => setShowMissionDescription(null)}
            >
                <div className='sun-editor-editable' dangerouslySetInnerHTML={{__html: showMissionDescription?.description}} />
            </Modal>
            <Modal
            onClose={() => {
                setSuccessfullyClaimed(null)
                setErrorClaimed(null)
            }}
            isOpen={succesfullyClaimed || errorClaimed}
            success={succesfullyClaimed}
            error={errorClaimed}
            />
        </MissionContainer>
    )
}

export default Mission;