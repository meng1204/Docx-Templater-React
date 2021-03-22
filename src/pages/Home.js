import React from "react";
import 'antd/dist/antd.css';
import { Button } from 'antd';
import { DownloadOutlined} from '@ant-design/icons';
// import { UploadFile } from "../components/UploadFile"
import { UploadDocs } from "../components/upload/UploadDocs"
import { UploadExcel } from "../components/upload/UploadExcel"



export const Home = class Home extends React.Component {
    render() {
        return (
            <div>
                <UploadDocs></UploadDocs>
                <UploadExcel></UploadExcel>
                <Button type="primary" shape="round" icon={<DownloadOutlined />} size="large" style={mt20}>
                    Download
                </Button>
            </div>
            
        );
    }
};

const mt20 = {
    marginTop: '20px',
};