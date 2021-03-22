import React from "react";
import 'antd/dist/antd.css';
import { Upload, Button, message,Tooltip } from 'antd';
import { FileWordOutlined} from '@ant-design/icons';

const docx_extension = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';


export const UploadDocs = class UploadDocs extends React.Component {
    state = {
        docsList: [
        ],
    };
    
    handleDocsChange = info => {
        let docsList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        docsList = docsList.slice(-1);


        this.setState({ docsList:docsList });
    };

    downloadExample = info => {
        
    }

    
    render() {

        const propsDocs = {
            action: '//jsonplaceholder.typicode.com/posts/',
            onChange: this.handleDocsChange,
            beforeUpload: file => {
                if (file.type !== docx_extension) {
                  message.error(`${file.name} is not a docx file`);
                }
                return file.type === docx_extension ? true : Upload.LIST_IGNORE;
            },
        };


        return (
            <div>
                <div style={displayInline}>
                    <Tooltip title="上传模板文件, 只支持Extension: .docs">
                        <Upload {...propsDocs} fileList={this.state.docsList}>
                            <Button icon={<FileWordOutlined />}>上传模板文件(Word)</Button>
                        </Upload>
                    </Tooltip>
                </div>

                <div style={displayInline}>
                    <a href={process.env.PUBLIC_URL + '/assets/exampleExcel.xlsx'} download style={{marginLeft:"20px"}}> 下载Docs文件实例 </a>
                </div>

                
            </div>
        );
    }
};


const displayInline = {
    display: 'inline-block',
};