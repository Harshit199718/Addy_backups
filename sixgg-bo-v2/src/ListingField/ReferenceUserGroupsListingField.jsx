import { Spin, Tag } from 'antd';
import { useGetUserGroupsListQuery } from "../features/usergroups/usergroupsApiSlices";

const ReferenceUserGroupsListingField = ({ id }) => {
    const { 
        data: userGroupsList,
        isLoading: userGroupLoading, 
    } = useGetUserGroupsListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            active: true,
        }
    });

    if (userGroupLoading) {
        return <Spin />;
    }

    const userGroups = userGroupsList?.list || [];
    const filteredUserGroups = userGroups?.filter(usergroup => id?.includes(usergroup.id));
    return (
        <div>
            {filteredUserGroups.map(usergroup => (
                <Tag key={usergroup.id} color="blue" style={{ borderRadius: '10px', marginBottom: '5px' }}>{usergroup.name}</Tag>
            ))}
        </div>
    );
}

export default ReferenceUserGroupsListingField;
