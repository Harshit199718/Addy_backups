import { Tabs } from "antd"
import { mainPages } from "../skinConfigTab"

export const Pages = (apiErrors, initialValues, watchValue, t) => {
    return (
        <Tabs
            tabPosition="top"
            items={mainPages(apiErrors, initialValues, watchValue, t)}
        />
    )
}