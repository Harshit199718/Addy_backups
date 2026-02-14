import { Tabs } from "antd"
import { mainGeneral } from "../skinConfigTab"

export const General = (apiErrors, initialValues, watchValue, t) => {
    return (
        <Tabs
            tabPosition="top"
            items={mainGeneral(apiErrors, initialValues, watchValue, t)}
        />
    )
}