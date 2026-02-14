import React from 'react'
import { Step, StepsContainer } from './Steps.styled'

function Steps({totalSteps=0, currentStep=0}) {
  return (
    <StepsContainer>
        {
            Array.from({length: totalSteps}).map((_, index) => {
                const width = `${100/totalSteps}%`;
                const lastStep = index===(totalSteps-1);
                const active = index===(currentStep-1)
                const activeLine = index===(currentStep-2)
                const completed = index<(currentStep-1)
                return (
                    <Step key={index} $width={width} $lastStep={lastStep} $active={active} $activeLine={activeLine} $completed={completed}>
                        <div className="number">{index+1}</div>
                        <div className="line" />
                    </Step>
                )
            })
        }
    </StepsContainer>
  )
}

export default Steps