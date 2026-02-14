import React, { useState } from 'react'
import { AuthForm2Container } from '../../Auth/Auth.styled'
import LayoutSpacing from '../../../features/Layout/LayoutSpacing'
import Withdraw2Tabs from '../Withdraw/Withdraw2Tabs'
import DepositForm2 from './DepositForm2'
import DepositSelector from './DepositSelector'
import { LayoutCard } from '../../../components/common/LayoutCard/LayoutCard.styled'

function Deposit2() {
  const [selected, setSelected] = useState({id: "manual"});
  return (
    <AuthForm2Container>
      <LayoutSpacing>
        <Withdraw2Tabs />
      </LayoutSpacing>
      <LayoutSpacing>
        <LayoutCard>
          <DepositSelector selected={selected} setSelected={setSelected} />
        </LayoutCard>
        <DepositForm2 id={selected?.id} accountId={selected?.accountId} accountName={selected?.accountName} />
      </LayoutSpacing>
    </AuthForm2Container>
  )
}

export default Deposit2