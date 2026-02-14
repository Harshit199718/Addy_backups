import React from 'react';
import NotAuthorized403 from "./NotAuthorized403";
import { CheckUserAuth } from "./dataAuth"

const PermissionsAuth = {
    checkPermissions: (type, permission, children) => {
        const permissions = localStorage.getItem('permissions');
        const hasPermission = permissions?.includes(permission);

        if (hasPermission) {
            return children;
        } else {
            switch(type){
                case "list":
                    return <NotAuthorized403 />
                case "button":
                    return true
                case "menu":
                    return false
                case "others":
                    return false
                case "undefined":
                    return undefined
            }
        }
    },
    
    // Can't be use in menu 
    checkAdminPermissions: (type, children) => {
        const { username } = CheckUserAuth();
        const hasPermission = username === "admin";
        
        if (hasPermission) {
            return children;
        } else {
            switch(type){
                case "list":
                    return <NotAuthorized403 />
                case "button":
                    return true
                case "menu":
                    return false
                case "others":
                    return false
            }
        }
    },
};

export default PermissionsAuth;