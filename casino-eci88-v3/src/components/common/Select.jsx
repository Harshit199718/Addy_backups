import { Icon } from '@iconify/react'
import React, { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const SelectWrapper = styled.div`
    font-size: ${props=>props.$fontSize?props.$fontSize:"12px"};
    padding: ${props=>props.$padding?props.$padding:"15px"};
    margin: ${props=>props.$margin?props.$margin:"0.375rem 0"};
    border: 1px solid ${props=>props.$borderColor?props.$borderColor:"rgba(255, 255, 255, 0.1)"};
    border-radius: ${props=>props.$borderRadius?props.$borderRadius:"10px"};
    outline: none;
    background: ${props=>props.$background?props.$background:"#fff"};
    color: ${props=>props.$color?props.$color:"#000"};
    width: ${props=>props.$width?props.$width:"100%"};
    line-height: 1.5;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;

    .select-placeholder {
        color: #8e8e8e;
    }

    .options {
        display: block;
        position: absolute;
        top: 110%;
        left: 50%;
        width: 100%;
        transform: translateX(-50%);
        height: auto;
        background: #fff;
        border-radius: ${props=>props.$borderRadius?props.$borderRadius:"0"};
        overflow: hidden;
        z-index: 20;
    }

    @media screen and (max-width: 800px) {
      font-size: 0.75rem;
    }
`

const Option = styled.div`
    margin: 4px 0;
    padding: 10px;
    background: ${props=> props.$selected?"#0d6efd":"rgba(134, 183, 254, .2)"};
    color: gray;
    display: block;
    border: none;
    width: 100%;
    text-align: left;

    &>* {
        max-height: 60px;
    }
`
function Select({ options, onChange, placeholder, ...props}) {
    const [selected, setSelected] = useState({showOptions: false})
    const [showOptions, setShowOptions] = useState(false);
    const selectWrapperRef = useRef(null);
    const { t } = useTranslation();
    
    useEffect(() => {
      setShowOptions(selected?.showOptions)
    }, [selected])
    
  return (
    <SelectWrapper {...props} tabIndex={0} onClick={(e)=>{
        e.stopPropagation();
        setShowOptions(!showOptions);
        setSelected({...selected, showOptions: !selected.showOptions})
    }} ref={selectWrapperRef}>
        {selected?.option?selected.option.label:<span className="select-placeholder">{placeholder?placeholder:t("Please_select_an_option")}</span>}
        <Icon icon="uil:angle-down" fontSize="22px" />
            <div className="options">
                {
                    showOptions && options && options.map(option=>(
                        <Option key={option.key} onClick={(e)=>{
                            e.stopPropagation();
                            setSelected({option, showOptions: false})
                            onChange && onChange({
                                target: {
                                    name: props.name, 
                                    value: option.key 
                                }
                            })
                            // setShowOptions(false)
                        }} $selected={selected?.showOptions?.key === option.key} {...props}>
                            {option.label}
                        </Option>
                    ))
                }
            </div>
    </SelectWrapper>
  )
}

export default Select