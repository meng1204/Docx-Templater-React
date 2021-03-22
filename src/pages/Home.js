import React from "react";
import 'antd/dist/antd.css';
import { Upload, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";


const props = {
    action: '//jsonplaceholder.typicode.com/posts/',
    listType: 'picture',
    previewFile(file) {
      console.log('Your upload file:', file);
      // Your process logic. Here we just mock to the same file
      return fetch('https://next.json-generator.com/api/json/get/4ytyBoLK8', {
        method: 'POST',
        body: file,
      })
        .then(res => res.json())
        .then(({ thumbnail }) => thumbnail);
    },
};

function loadFile(url, callback) {
    PizZipUtils.getBinaryContent(url, callback);
}

export const Home = class Home extends React.Component {
    render() {
        const generateDocument = () => {
        loadFile("https://docxtemplater.com/tag-example.docx", function(
            error,
            content
        ) {
            if (error) {
            throw error;
            }
            var zip = new PizZip(content);
            var doc = new Docxtemplater().loadZip(zip);
            doc.setData({
            first_name: "John1232",
            last_name: "Doe333",
            phone: "0652455478",
            description: "New Website"
            });
            try {
            // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
            doc.render();
            } catch (error) {
            // The error thrown here contains additional information when logged with JSON.stringify (it contains a properties object containing all suberrors).
            function replaceErrors(key, value) {
                if (value instanceof Error) {
                return Object.getOwnPropertyNames(value).reduce(function(
                    error,
                    key
                ) {
                    error[key] = value[key];
                    return error;
                },
                {});
                }
                return value;
            }
            console.log(JSON.stringify({ error: error }, replaceErrors));

            if (error.properties && error.properties.errors instanceof Array) {
                const errorMessages = error.properties.errors
                .map(function(error) {
                    return error.properties.explanation;
                })
                .join("\n");
                console.log("errorMessages", errorMessages);
                // errorMessages is a humanly readable message looking like this :
                // 'The tag beginning with "foobar" is unopened'
            }
            throw error;
            }
            var out = doc.getZip().generate({
            type: "blob",
            mimeType:
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            }); //Output the document using Data-URI
            saveAs(out, "output.docx");
        });
        };

        return (
            <Upload {...props}>
                <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
        );
    }
};