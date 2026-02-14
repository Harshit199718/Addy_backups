import { Space, Spin, Tag } from 'antd';
import { useGetSitesListQuery } from "../features/sites/sitesApiSlices";

const ReferenceSiteListingField = ({ id }) => {
    const { 
        data: sitesList,
        isLoading: siteLoading, 
    } = useGetSitesListQuery({
        pagination: {
            startPageRow: 0,
            endPageRow: 100
        },
        filters : {
            active: true,
        }
    });

    if (siteLoading) {
        return <Spin />;
    }

    const sites = sitesList?.list || [];
    const filteredSites = sites.filter(site => id?.includes(site.id));

    return (
        <div>
            {filteredSites.map(site => (
                <Tag key={site.id} color="blue" style={{ borderRadius: '10px', marginBottom: '5px', marginRight: '3px' }}>
                    {site.name}
                </Tag>
            ))}
        </div>
    );
}

export default ReferenceSiteListingField;
