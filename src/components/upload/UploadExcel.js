import React from "react";
import 'antd/dist/antd.css';
import { Upload, Button, message,Tooltip } from 'antd';
import { FileExcelOutlined, FileWordOutlined, DownloadOutlined} from '@ant-design/icons';

const excel_extension = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

export const UploadExcel = class UploadExcel extends React.Component {
    state = {
        excelList: [
        ],
    };
    

    handleExcelChange = info => {
        let excelList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        excelList = excelList.slice(-1);
        this.setState({ excelList: excelList });
    }

    
    render() {

        const propsExcel = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange: this.handleExcelChange,
            beforeUpload: file => {
                if (!excel_extension.includes(file.type)) {
                  message.error(`${file.name} is not a excel file`);
                }
                return excel_extension.includes(file.type) ? true : Upload.LIST_IGNORE;
            },
        };

        return (
            <div style={mt20}>
                <div style={displayInline}>
                    <Tooltip title="上传数据文件, 只支持Extension: .csv .xls .xlsx">
                        <Upload {...propsExcel} fileList={this.state.excelList} >
                            <Button icon={<FileExcelOutlined />}>上传数据文件(Excel)</Button>
                        </Upload>
                    </Tooltip>
                </div>
                <div style={displayInline}>
                    <a href={process.env.PUBLIC_URL + '/assets/exampleExcel.xlsx'} download style={{marginLeft:"20px"}}> 下载Excel文件实例 </a>
                </div>
            </div>
        );
    }
};

const mt20 = {
    marginTop: '20px',
};

const displayInline = {
    display: 'inline-block',
};