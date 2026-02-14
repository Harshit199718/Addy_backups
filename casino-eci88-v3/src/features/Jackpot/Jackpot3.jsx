import { useSelector } from "react-redux"
import LayoutSpacing from "../Layout/LayoutSpacing"
import { Jackpot3Container, Jackpot3Digit, Jackpot3Wrapper, Jackpot3separator } from "./Jackpot3.styled"
import { selectConfigData } from "../../api/generalApi"
import React, { useEffect, useState, useRef } from "react";
import { addThousandSeparator } from "../../components/common/NumberConvertion";

const getRandomIncrement = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const Jackpot3 = () => {
    const { jackpot_number, jackpot_number_min_increment, jackpot_number_max_increment, jackpot_image, country } = useSelector(selectConfigData)
    const [finalJackpotNumber, setFinalJackpotNumber] = useState(jackpot_number || 18334466.93);

    useEffect(() => {
        const interval = setInterval(() => {
            // Generate random increment
            const randomIncrement = getRandomIncrement(jackpot_number_min_increment, jackpot_number_max_increment);
            setFinalJackpotNumber(prevNumber => prevNumber + randomIncrement);
        }, 3000); // Update every 1 second

        return () => clearInterval(interval); // Cleanup interval on component unmount
    }, [jackpot_number_min_increment, jackpot_number_max_increment]);

    return (
        <LayoutSpacing $padding={"0px 0px"}>
            <Jackpot3Wrapper $jackpot_image={jackpot_image}>
                <Jackpot3Container>
                    {addThousandSeparator(finalJackpotNumber, `${country}_Jackpot`)?.toString()?.split('').map((char, index) => (
                        char === '.' || char === ',' ? 
                        <Jackpot3separator key={index}>{char}</Jackpot3separator> : 
                        <Jackpot3Digit>
                            {char}
                        </Jackpot3Digit>
                    ))}
                </Jackpot3Container>
            </Jackpot3Wrapper>
        </LayoutSpacing>
    )
}

export default Jackpot3