import { Tabs } from "antd"
import { mainOthersPage } from "../skinConfigTab"

export const OthersPage = (apiErrors, initialValues, watchValue, t) => {
    return (
        <Tabs
        type="card"
        items={mainOthersPage(apiErrors, initialValues, watchValue, t)}
        />
    )
}