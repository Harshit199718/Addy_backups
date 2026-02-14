import { Tabs } from "antd"
import { mainHome } from "../skinConfigTab"

export const Home = (apiErrors, initialValues, watchValue, t) => {
    return (
        <Tabs
            type="card"
            items={mainHome(apiErrors, initialValues, watchValue, t)}
        />
    )
}