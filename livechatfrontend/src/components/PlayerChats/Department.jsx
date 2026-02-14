import React from 'react'
import { Department, DepartmentsContainer } from './PlayerChats.styled'

function Departments() {
  return (
    <DepartmentsContainer $direction="column" $justifyContent="flex-start">
        <Department $selected>All</Department>
        <Department>442</Department>
        <Department>343</Department>
    </DepartmentsContainer>
  )
}

export default Departments