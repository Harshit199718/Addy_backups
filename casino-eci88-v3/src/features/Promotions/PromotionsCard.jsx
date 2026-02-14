import { useEffect, useState } from "react";
import { PromotionContent, TimeContainer } from "./Promotions.styled";
import Button from "../../components/common/Button";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

const PromotionsCard = ({id, endDate, endTime}) => {
    const [timeRemaining, setTimeRemaining] = useState({
        days: "00",
        hours: "00",
        minutes: "00",
        seconds: "00",
    });
  const { t } = useTranslation();
  const navigate = useNavigate();

    useEffect(() => {
        const endDateTime = new Date(`${endDate}T${endTime}`).getTime();
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const difference = endDateTime - now;
            
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                setTimeRemaining({ 
                    days: days<10? ("0" + days):days,
                    hours: hours<10? ("0" + hours):hours, 
                    minutes: minutes<10? ("0" + minutes):minutes, 
                    seconds: seconds<10? ("0" + seconds):seconds, 
                });
            } else {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [endDate, endTime]);
    return (
        <PromotionContent>
            <TimeContainer>
                {
                    ["days", "hours", "minutes", "seconds"].map((key, i, time)=>(
                        <div key={key}>
                            <h3 className='time'><span>{t(key)}</span><span>{timeRemaining[key]}</span></h3>{i!==(time.length-1)?":":""}
                        </div>
                    ))
                }
            </TimeContainer>
            <Button $padding="8px 18px" $background="#007bff" onClick={() => navigate(`/promotions/${id}`)}>{t("More_Info")}</Button>
        </PromotionContent>
    )
  }

export default PromotionsCard;