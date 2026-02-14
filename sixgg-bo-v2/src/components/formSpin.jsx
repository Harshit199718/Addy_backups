import React, { useState } from 'react';
import { Alert, Skeleton, Space, Spin, Switch } from 'antd';

const FormSpin = ({ loading, message="Form is loading", description="Please wait while form is loading"}) => {

    if(loading){
        return (
            <Spin spinning={loading}>
                <Skeleton.Input active size={'small'} />
                <br />
                <br />
                <Skeleton.Input active size={'large'} block/>
                <br />
                <br />
                <Skeleton.Input active size={'small'} />
                <br />
                <br />
                <Skeleton.Input active size={'large'} block/>
                <br />
                <br />
                <Skeleton.Input active size={'small'} />
                <br />
                <br />
                <Skeleton.Input active size={'large'} block/>
                <br />
                <br />
                <Skeleton.Input active size={'small'} />
                <br />
                <br />
                <Skeleton.Input active size={'large'} block/>
                <br />
                <br />
                <Skeleton.Input active size={'small'} />
                <br />
                <br />
                <Skeleton.Image active />
                <br />
                <br />
                <Alert
                type="error"
                message={message}
                description={description}
                />
            </Spin>
        );
    }
};

export default FormSpin;