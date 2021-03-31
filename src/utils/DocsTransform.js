import { message } from 'antd';
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";


const DocsTransform = props => {

    const docs = props.docs.docsList[0];
    const excel = props.excel.jsonData;

    /* set up FileReader */
    const reader = new FileReader();;

    reader.onload = e => {
        const content = e.target.result;
        const zip = new PizZip(content);

        const doc = new Docxtemplater().loadZip(zip);
        doc.setData({ data : excel });

        try {
            doc.render();
        } catch (error) {
            message.error(`Error ${error}`)
            return;
        }
        
        //Output the document using Data-URI
        const output = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        }); 
        
        saveAs(output, "output.docx");
    };

    reader.readAsBinaryString(docs.originFileObj);
  };

export default DocsTransform