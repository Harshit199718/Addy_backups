import React, { useState } from "react";
import DepositSelector3 from "./DepositSelector3";
import DepositForm3 from "./DepositForm3";

function Deposit3() {
  const [selected, setSelected] = useState({ id: "manual" });
    
  return (
    <div style={{ maxWidth: "1200px", margin: "auto", height: "calc(100vh - 110px)" }}>
      <DepositSelector3 selected={selected} setSelected={setSelected} />
      <DepositForm3 id={selected?.id} accountId={selected?.accountId} accountName={selected?.accountName} />
    </div>
  );
}

export default Deposit3;
