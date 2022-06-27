import { Button, Checkbox, Form, Input, message, Switch } from "antd"
import React from "react"
import { IMovie } from "../services/MovieService"
import { ImgUploader } from "./ImgUploader"
import { NavigateFunction, useNavigate } from "react-router"
import { FormInstance } from "antd"


const allAreas: {label: string, value: string}[] = [
    {label: "中国大陆", value: "中国大陆"},
    {label: "中国香港", value: "中国香港"},
    {label: "中国台湾", value: "中国台湾"},
    {label: "美国", value: "美国"},
    {label: "日本", value: "日本"}
]

const allTypes: {label: string, value: string}[] = [
    {label: "喜剧", value: "喜剧"},
    {label: "动作", value: "动作"},
    {label: "灾难", value: "灾难"},
    {label: "爱情", value: "爱情"},
    {label: "科幻", value: "科幻"}
]

interface IFormProp {
    /**
     * 提交数据
     */
    onSubmit: (movie: IMovie) => Promise<string>
    /**
     * 路由跳转
     */
    navigate?: NavigateFunction
    /**
     * 获取Form组件
     */
    ref1?: React.ForwardedRef<FormInstance<any>>
}

class MovieForm extends React.Component<IFormProp> {
    /**
     * 提交表单且数据验证成功后回调事件
     */
    private async finished(value: any) {
        const result = await this.props.onSubmit(value as IMovie)
        if(result) {
            message.error(result)
        } else {
            message.success("处理成功");
            // 跳转页面
            this.props.navigate && this.props.navigate(-1)
        }
    }

    render() {
        return (
            <Form
                name="basic"
                labelCol={{ span: 4 }}
                wrapperCol={{ span: 8 }}
                autoComplete="off"
                onFinish={this.finished.bind(this)}
                ref={this.props.ref1}
            >
                <Form.Item
                    label="电影名称"
                    name="name"
                    rules={[{ required: true, message: '电影名称不能为空!' }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item label="电影类型" name="types" wrapperCol={{ offset: 0, span: 16 }} rules={[{required: true, message: "电影类型不能为空"}]}>
                    <Checkbox.Group 
                        options={allTypes}
                    />
                </Form.Item>

                <Form.Item
                    label="上映地区"
                    name="area"
                    wrapperCol={{ offset: 0, span: 16 }}
                    rules={[{ required: true, message: '上映地区不能为空!' }]}
                >
                    <Checkbox.Group 
                        options={allAreas}
                    />
                </Form.Item>

                <Form.Item
                    label="时长 (分钟)"
                    name="timeLong"
                    rules={[{required: true, message: "时长不能为空"}, 
                    {pattern: /^([1-9]\d{0,2})$/, message: "时长必须在1~999之间"}]}
                >
                    <Input type="number" min={1} max={999}/>

                </Form.Item>

                <Form.Item 
                    label="正在热映"
                    name="isHot"
                    initialValue={false}
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item 
                    label="即将上映"
                    name="isComing"
                    initialValue={false}
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item 
                    label="经典影片"
                    name="isClassic"
                    initialValue={false}
                    valuePropName="checked"
                >
                    <Switch />
                </Form.Item>

                <Form.Item 
                    label="电影描述"
                    name="description"
                >
                    <Input.TextArea />
                </Form.Item>

                <Form.Item
                    label="海报"
                    name="poster"
                >
                    <ImgUploader />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" htmlType="submit">
                        提交
                    </Button>
                    <Button htmlType="button" 
                        onClick={() => {
                            this.props.navigate && this.props.navigate(-1)
                        }}
                        style={{
                            marginLeft: 50
                        }}>
                        返回
                    </Button>
                </Form.Item>
            </Form>
        )
    }
}

// 传递navigate函数，用于路由跳转
// ref转发
const MovieFormWrapper = React.forwardRef<FormInstance, IFormProp>((props, ref)=>{
    return <MovieForm {...props} ref1={ref} navigate={useNavigate()}/>
  })

export default MovieFormWrapper