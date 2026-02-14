import React, { useCallback, useEffect, useState } from "react";
import {
  useGetCheckinsQuery,
  useGetSlotsQuery,
  useSpinWheelMutation,
  useWalletQuery,
} from "../api/hooks";
import GetEnvVarInfo from "../features/EnvVarInfo/GetEnvVarInfo";

function withSpin(WrappedComponent) {
  return (props) => {
    const { data: slots, isLoading } = useGetSlotsQuery();
    const { data: wallet } = useWalletQuery();
    const { data: checkin, isLoading: checkinLoading } = useGetCheckinsQuery();
    const [spinWheel, { data: spinResult, isSpinning }] = useSpinWheelMutation();
    const [mustSpin, setMustSpin] = useState(false);
    const [afterSpin, setAfterSpin] = useState(null);
    const autoApproveCredit = GetEnvVarInfo({name: "FE_LUCKYWHEEL_AUTO_APPROVED_CASH", type: "boolean"})

    useEffect(() => {
      if (spinResult) {
        setMustSpin(true);
      }
    }, [spinResult]);

    const handleSpin = useCallback(() => {
      spinWheel({ slots, errorTitle: "Lucky Wheel" });
    }, [slots]);

    const onStopSpinning = useCallback(() => {
      setMustSpin(false);
      setAfterSpin({
        prizeWon: true,
        show_tnc: spinResult?.show_tnc,
        terms: spinResult?.terms,
        amount: spinResult?.amount,
      });
    }, [spinResult]);

    const onClose = useCallback(() => {
        setAfterSpin({
          ...afterSpin,
          amount: null,
        })
    }, [])

    return (
      <WrappedComponent
        {...props}
        slots={slots}
        isLoading={isLoading || checkinLoading}
        isSpinning={isSpinning}
        wallet={wallet}
        spinResult={spinResult}
        handleSpin={handleSpin}
        onStopSpinning={onStopSpinning}
        afterSpin={afterSpin}
        mustSpin={mustSpin}
        onClose={onClose}
        autoApproveCredit={autoApproveCredit}
        checkin={checkin}
      />
    );
  };
}

export default withSpin;
