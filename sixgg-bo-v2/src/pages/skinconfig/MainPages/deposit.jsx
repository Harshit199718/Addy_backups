import { Tabs } from "antd"
import { mainDeposit } from "../skinConfigTab"

export const Deposit = (apiErrors, initialValues, watchValue, t) => {
    return (
        <Tabs
            type="card"
            items={mainDeposit(apiErrors, initialValues, watchValue, t)}
        />
    )
}