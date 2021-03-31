import React from "react";
import 'antd/dist/antd.css';
import { Button,message } from 'antd';
import { ThunderboltOutlined} from '@ant-design/icons';
import { UploadDocs } from "../components/upload/UploadDocs"
import { UploadExcel } from "../components/upload/UploadExcel"
import DocsTransform from "../utils/DocsTransform"



export const Home = class Home extends React.Component {

    constructor(props) {
        super(props);
        this.DocsRef = React.createRef();
        this.ExcelRef = React.createRef();
    }

    handleClick = () => {
        const excel = this.ExcelRef.current.state;
        const docs = this.DocsRef.current.state;

        if((excel.excelList).length === 0 || (docs.docsList).length === 0){
            message.error(` You should upload Docs/Excel Files!`);
        }

        DocsTransform({docs:docs, excel: excel })
    };

    render() {
        return (
            <div>
                <UploadDocs ref={this.DocsRef}></UploadDocs>
                <UploadExcel  ref={this.ExcelRef}></UploadExcel>
                <Button type="primary" shape="round" icon={<ThunderboltOutlined />} size="large" style={mt20} onClick={this.handleClick}>
                    Generate
                </Button>
            </div>
            
        );
    }
};

const mt20 = {
    marginTop: '20px',
};
