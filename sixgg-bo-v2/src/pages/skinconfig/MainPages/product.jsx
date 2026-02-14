import { Tabs } from "antd"
import { mainProduct } from "../skinConfigTab"

export const Product = (apiErrors, initialValues, watchValue, t) => {
    return (
        <Tabs
            type="card"
            items={mainProduct(apiErrors, initialValues, watchValue, t)}
        />
    )
}