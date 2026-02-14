import styled from "styled-components";

export const SidebarContainer = styled.aside`
    width: 15rem;
    border: 1px solid rgba(72, 94, 144, 0.16);
    background-color: #ffffff;
    display: flex;
    flex-direction: column;

    select {
        margin: 10px auto 0;
    }

    @media screen and (max-width: 1025px) {
        position: absolute;
        z-index: 20;
        min-height: 100%;
        width: ${({sidebarOpen}) => sidebarOpen?"15rem":"0"};
        overflow: hidden;
        transition: .5s;
    }
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
    color: ${({$active, theme}) => $active?theme.secondary_color: theme.primary_color};
`