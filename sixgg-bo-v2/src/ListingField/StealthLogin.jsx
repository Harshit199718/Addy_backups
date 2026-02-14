import { Icon } from "@iconify/react";
import { useGetPlayerStealthTokenMutation } from "../features/player/playerApiSlices";
import { Button } from "antd";

const StealthLoginListingField = ({record, label=null}) => {
    const [Create, { isLoading }] = useGetPlayerStealthTokenMutation();
    
    const handleLogin = async () => {
        let values = {
            username: record.username,
            password: record.sites.toString()
        }
        const result = await Create(values).unwrap();

        const {token_id, site_domain} = result;
        window.open(`https://${site_domain}/signin/?token_id=${token_id}`,  "_blank", "width=400,height=800,incognito=yes")
    };

    return (
        <Button 
        onClick={handleLogin}
        style={{ display: 'flex', alignItems: 'center', border: "none"}}
        >
        <Icon icon="uiw:login" style={{ color: 'red' }} />
        <span style={{ marginLeft: '5px' }}>{label}</span>
        </Button>
    )
}

export default StealthLoginListingField;