import React, { useEffect, useState } from 'react'
import styled from 'styled-components'

const TabsWrapper = styled.div`
    display: flex;
    flex-direction: ${({$vertical})=> $vertical?"row":"column"};
    gap: ${({$gap})=>$gap?$gap:"5px"};
`
const TabsContainer = styled.div`
    display: flex;
    flex-direction: ${({$vertical})=> !$vertical?"row":"column"};
    align-items: center;
    gap: 5px;
    overflow-x: ${({$vertical})=> !$vertical?"auto":"none"};

    border-top: 1px solid ${({$tabsBorder, theme}) => $tabsBorder && (theme.border_color ? theme.border_color : "#cd9f15")};
    border-bottom: 1px solid ${({$tabsBorder, theme}) => $tabsBorder && (theme.border_color ? theme.border_color : "#cd9f15")};

    .tab {
        min-width: 50px;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 2px;
        border-radius: 4px;
        padding: 23px 10px;
        padding: ${({$vertical})=> $vertical?"10px":"23px 10px"};
        max-width: max-content;
        color: ${props=>props.theme.text_color};

        ${({$tabStyles})=>$tabStyles?$tabStyles:({})};

        @media screen and (max-width: 600px) {
            padding: ${({$vertical})=> $vertical?"0px":"10px"};
        }
        &.active {
            background: ${props=>props.theme.secondary_color};
        }
        &:hover {
            cursor: pointer;
        }
    }
`
const TabsContent = styled.div`
    width: 100%;
    max-height: ${({$maxHeight}) => $maxHeight?$maxHeight:"none"};
    height: ${({$height}) => $height?$height:"auto"};
    overflow-y: auto;

    // @media screen and (min-width: 768px) {
    //     max-height: calc(100vh - 120px);
    // }
`

function Tabs({defaultActive, tabs, vertical, onChange, children, sx, tabsBorder, tabStyles, gap}) {
    const [activeTab, setActiveTab] = useState(defaultActive);
    
  return (
    <TabsWrapper $vertical={vertical} $gap={gap}>
        <TabsContainer $vertical={vertical} $tabsBorder={tabsBorder} $tabStyles={tabStyles}>
            {
                tabs.map(tab=>(
                    <div className={`tab ${tab.key===activeTab?"active":""}`} key={tab.key} onClick={()=>{
                        setActiveTab(tab.key)
                        onChange(tab.key)
                    }}>
                        {tab.label}
                    </div>
                ))
            }
        </TabsContainer>
        <TabsContent $vertical={vertical} $maxHeight={sx?.maxHeight} $height={sx?.height}>
            {children}
        </TabsContent>
    </TabsWrapper>
  )
}

export default Tabs