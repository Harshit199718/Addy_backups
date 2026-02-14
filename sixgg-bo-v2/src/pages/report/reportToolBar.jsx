import { Row, Col, Button, Select } from 'antd';
import { useDispatch } from 'react-redux';
import { filtersActions } from '../../features/filtersSlice';
import FormToDatePicker from '../../customToolbar/FromToDatePicker';
import { Icon } from '@iconify/react';
import { ExportToExcel, MultipleExportToExcel } from '../../customToolbar/ExportToExcel';
import PermissionsAuth from '../../components/permissionAuth';
import { dayType } from '../../customField/customOption';
import SelectOption from '../../customToolbar/SelectOption';
import SearchBar from '../../customToolbar/SearchBar';
import { useTranslation } from 'react-i18next';

const ReportToolBar = ({ isLoading, refetch, disabled, sheetname, filename, exportData, toolbarOption="datepicker" }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const dayTypeOption = dayType(t);

  return (
    <Row gutter={[16, 16]} style={{ marginBottom: "10px" }}>
      {toolbarOption === "datepicker" ? 
        <Col xs={refetch ? 22 : 24} sm={24} md={9} >
          <FormToDatePicker 
            disabled={disabled}
            isLoading={isLoading}
            onChangeFromDate={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'fromDate' }))}
            onChangeToDate={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'toDate' }))}
            defaultToday={true}
          />
        </Col>
      :
      toolbarOption === "searchbar" ?
        <Col xs={refetch ? 22 : 24} sm={9}>
          <SearchBar
            onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'password' }))}
            loading={isLoading} 
            placeholder={t("common.Search")}
            style={{ width: 300 }}
            />
        </Col>
      :
      toolbarOption === "dayoption" ?
      <Col xs={refetch ? 22 : 24} sm={9}>
        <SelectOption
          onChange={(value) => dispatch(filtersActions({ value: value, type: 'input', event: 'dayfilter' }))}
          isLoading={isLoading}
          placeholder={t("report.Please select day")}
          options={dayTypeOption}
          width={'200px'}
          defaultValue={'3'}
          filterNumeric
        />
      </Col>
      :
      <Col xs={refetch ? 22 : 24} sm={9}>
      </Col>
      }
      {refetch &&
      <Col xs={2} sm={2} Col md={2} lg={2}>
        <Icon 
          icon="material-symbols:refresh-rounded" 
          width="2rem" 
          height="2rem"  
          style={{color: "black", cursor: "pointer"}} 
          onClick={() => refetch()}
        />
      </Col>
      }
      <Col align="right" xs={24} sm={refetch ? 22 : 24} md={refetch ? 13 : 15} >
        {PermissionsAuth.checkPermissions('menu', 'export_report_excel',
        <Button 
          type="primary" 
          icon={
            <Icon icon="line-md:download-loop" width="1.2rem" height="1.2rem" />
          }
          style={{ display: 'flex', alignItems: 'center' }}
          onClick={() => {
            exportData ?
            ExportToExcel({
              filename: filename,
              sheetname: sheetname,
              data: exportData
            })
            :
            MultipleExportToExcel({
              filename: filename,
              sheetname: sheetname,
            })
          }
        }
        >
          {t("feature.Export Excel")}
        </Button>
        )}
      </Col>
    </Row>        
  );
}

export default ReportToolBar;
