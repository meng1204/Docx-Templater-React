import React from "react";
import 'antd/dist/antd.css';
import { Button,message } from 'antd';
import { DownloadOutlined,ThunderboltOutlined} from '@ant-design/icons';
import { UploadDocs } from "../components/upload/UploadDocs"
import { UploadExcel } from "../components/upload/UploadExcel"



export const Home = class Home extends React.Component {

    constructor(props) {
        super(props);
        this.DocsRef = React.createRef();
        this.ExcelRef = React.createRef();
    }

    handleClick = info => {
    };

    render() {
        return (
            <div>
                <UploadDocs ref={this.DocsRef}></UploadDocs>
                <UploadExcel  ref={this.ExcelRef}></UploadExcel>
                <Button type="primary" shape="round" icon={<ThunderboltOutlined />} size="large" style={mt20} onClick={this.handleClick}>
                    Generate
                </Button>
                {/* <Button type="default" shape="round" icon={<DownloadOutlined />} size="large" style={mt20,ml20}>
                    Download
                </Button> */}
            </div>
            
        );
    }
};

const mt20 = {
    marginTop: '20px',
};

const ml20 = {
    marginLeft: '20px',
};