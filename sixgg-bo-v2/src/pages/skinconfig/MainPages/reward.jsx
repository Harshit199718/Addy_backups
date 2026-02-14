import { Tabs } from "antd"
import { mainReward } from "../skinConfigTab"

export const Reward = (apiErrors, initialValues, watchValue, t) => {
    return (
        <Tabs
            type="card"
            items={mainReward(apiErrors, initialValues, watchValue, t)}
        />
    )
}