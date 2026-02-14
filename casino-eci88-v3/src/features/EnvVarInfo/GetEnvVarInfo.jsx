import { useGetEnvVarInfoQuery } from "../../api/hooks";

const GetEnvVarInfo = ({ name, type, overwrite }) => {
    const { data: EnvVarInfo, isError } = useGetEnvVarInfoQuery();
    let formattedValue;
    let overwriteValue;
    const envVar = Array.isArray(EnvVarInfo) ? EnvVarInfo.find(envVar => envVar.key === name) : undefined;
    
    if(!isError){
        switch(type){
            case "string":
                formattedValue = envVar ? envVar.value : "";
                overwriteValue = overwrite ? overwrite : "";
            break;
            case "number":
                formattedValue = envVar ? Number(envVar.value)?.toFixed(2) : "0.00";
                overwriteValue = overwrite ? overwrite.toFixed(2)  : "";
            break;
            case "boolean":
                formattedValue = envVar ? Number(envVar.value) === 1 : false;
                overwriteValue = overwrite ? overwrite : false;
            break;
            default:
                formattedValue = envVar ? envVar.value : "";
                overwriteValue = overwrite ? overwrite : "";

        }
    } else {
        formattedValue = "";
        overwriteValue = "";
    }

    return overwrite ? overwriteValue : formattedValue;
}

export default GetEnvVarInfo;