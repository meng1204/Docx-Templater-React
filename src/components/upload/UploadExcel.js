import React from "react";
import 'antd/dist/antd.css';
import { Upload, Button, message,Tooltip } from 'antd';
import { FileExcelOutlined} from '@ant-design/icons';
import * as XLSX from 'xlsx';
import { make_cols } from './../../utils/MakeColumns';

const excel_extension = [
    'text/csv',
    'application/vnd.ms-excel',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
]

export const UploadExcel = class UploadExcel extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            excelList: [
            ],
            jsonData: [],
            cols: []
        };
    }

    handleExcelChange = info => {        
        let excelList = [...info.fileList];

        // 1. Limit the number of uploaded files
        excelList = excelList.slice(-1);
        this.setState({ excelList: excelList });


        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }

        /* set up FileReader */
        const reader = new FileReader();;

        reader.onload = e => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, {
                type:  "binary",
                bookVBA: true
            });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws);

            console.log("data",data);

            /* Update state */
            this.setState({jsonData: data, cols: make_cols(ws["!ref"]) }, () => {
                console.log(JSON.stringify(this.state.jsonData, null, 2));
            });
        };

        reader.readAsBinaryString(info.file.originFileObj);
        
        console.log("this.state",this.state)
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