import styled from "styled-components";

export const SidebarContainer = styled.aside`
    width: 15rem;
    border: 1px solid rgba(72, 94, 144, 0.16);
    background-color: #ffffff;
`

export const NavLinks = styled.ul`
    list-style: none;
    padding-left: 10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
`
export const NavLink = styled.li`
    font-size: 1.4em;
    font-weight: 500;
    line-height: 1;
    text-transform: capitalize;
    display: flex;
    align-items: flex-end;
    gap: 5px;
    cursor: pointer;
    color: ${({$active}) => $active?"#6993ff":"#7792b1"};
`