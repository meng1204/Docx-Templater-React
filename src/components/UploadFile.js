import React from "react";
import 'antd/dist/antd.css';
import { Upload, Button, message,Tooltip } from 'antd';
import { FileExcelOutlined, FileWordOutlined} from '@ant-design/icons';

const docx_extension = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
const excel_extension = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

export const UploadFile = class UploadFile extends React.Component {
    state = {
        fileList: [
        ],
        fileList2: [
        ],
    };
    
    handleChange = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);


        this.setState({ fileList });
    };

    handleChange2 = info => {
        let fileList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        fileList = fileList.slice(-1);
        this.setState({ fileList2: fileList });
    }

    
    render() {

        const props = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange: this.handleChange,
            beforeUpload: file => {
                if (file.type !== docx_extension) {
                  message.error(`${file.name} is not a docx file`);
                }
                return file.type === docx_extension ? true : Upload.LIST_IGNORE;
            },
        };

        const props2 = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange: this.handleChange2,
            beforeUpload: file => {
                if (!excel_extension.includes(file.type)) {
                  message.error(`${file.name} is not a excel file`);
                }
                return excel_extension.includes(file.type) ? true : Upload.LIST_IGNORE;
            },
        };

        return (
            <div>
                <div>
                    <Tooltip title="上传模板文件, 只支持Extension: .docs">
                        <Upload {...props} fileList={this.state.fileList}>
                            <Button icon={<FileWordOutlined />}>上传模板文件(Word)</Button>
                        </Upload>
                    </Tooltip>
                </div>

                <div style={{ marginTop: '20px' }}>
                    <Tooltip title="上传数据文件, 只支持Extension: .csv .xls .xlsx" style={{ marginTop: '20px' }}>
                        <Upload {...props2} fileList={this.state.fileList2} >
                            <Button icon={<FileExcelOutlined />}>上传数据文件(Excel)</Button>
                        </Upload>
                    </Tooltip>
                </div>
            </div>
        );
    }
};