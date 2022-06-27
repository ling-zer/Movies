import { message, Modal, Upload } from "antd";
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons"
import { UploadRequestOption } from "rc-upload/lib/interface"
import { IResponseData, IResponseError } from "../services/CommonTypes";
import { UploadFile } from "antd/lib/upload/interface";

interface IImgUploaderProps {
    value?: string,
    /**
     * 手动上传
     */
    onChange?: (img: string) => void;
}

export const ImgUploader: React.FC<IImgUploaderProps> = function (props) {
    const [previewVisible, setPreviewVisible] = useState(false);
    // 上传图片后，根据filelist的url进行显示
    const fileList: UploadFile<any>[] = props.value ? [
        {
            uid: props.value,
            name: props.value,
            url: props.value
        }
    ] : []
    return (
        <div>
            <Upload
                action="/api/upload"
                listType="picture-card"
                name="imgfile"
                accept=".jpg,.png,.gif,.jiff"
                fileList={fileList}
                customRequest={(options) => {
                    handleRequest(options, props)
                }}
                onRemove={() => {
                    props.onChange && props.onChange("")
                }}
                onPreview={() => {
                    setPreviewVisible(true);
                }}
            >
                {props.value ? null :
                    (<div>
                        <PlusOutlined />
                        <div style={{ marginTop: 8 }}>Upload</div>
                    </div>)
                }
            </Upload>
            <Modal
                visible={previewVisible} footer={null} onCancel={() => {
                    setPreviewVisible(false);
                }}
            >
                <img src={props.value} alt="" style={{ width: '100%' }} />
            </Modal>
        </div>

    )
}

async function handleRequest(p: UploadRequestOption, props: IImgUploaderProps) {
    let formData = new FormData();
    formData.append(p.filename!, p.file)
    // fetch api
    const request = new Request(p.action, {
        method: "post",
        body: formData
    })
    const resp: IResponseData<string> | IResponseError = await fetch(request).then(resp => resp.json());
    if (resp.err) {
        message.error(`上传失败！${resp.err}`)
    } else {
        props.onChange && props.onChange(resp.data!);
    }
}