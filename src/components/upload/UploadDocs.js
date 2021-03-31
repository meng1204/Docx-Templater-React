import React from "react";
import 'antd/dist/antd.css';
import { Upload, Button, message,Tooltip } from 'antd';
import { FileWordOutlined} from '@ant-design/icons';

const docx_extension = 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';


export const UploadDocs = class UploadDocs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            docsList: [
            ],
        };
    }
    
    
    handleDocsChange = info => {
        let docsList = [...info.fileList];

        // 1. Limit the number of uploaded files
        // Only to show two recent uploaded files, and old ones will be replaced by the new
        docsList = docsList.slice(-1);


        this.setState({ docsList:docsList });
    };
    
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
                    <Tooltip title="Upload Template File, Only accept Extension: .docx">
                        <Upload {...propsDocs} fileList={this.state.docsList}>
                            <Button icon={<FileWordOutlined />}>Upload Template File(Word)</Button>
                        </Upload>
                    </Tooltip>
                </div>

                <div style={displayInline}>
                    <a href={process.env.PUBLIC_URL + '/assets/exampleDocs.docx'} download style={{marginLeft:"20px"}}> Download Docs Example </a>
                </div>

                
            </div>
        );
    }
};


const displayInline = {
    display: 'inline-block',
};