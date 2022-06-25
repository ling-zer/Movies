import React from "react";
import { IMovieState } from "../redux/features/MovieSlice";
import { Table, Switch } from "antd";
import { ColumnsType } from "antd/lib/table/interface";
import { IMovie } from "../services/MovieService";
import defaultPoster from "../assets/default.jpg";
import "./MovieTable.css"
import { SwitchType } from "../services/CommonTypes";

export interface IMovieTableEvent {
    /**
     * 完成加载之后的事件
     */
    onLoad: () => void,
    onSwitchChange: (type: SwitchType, newVal: boolean, id: string) => void
}

export default class MovieTable extends React.Component<IMovieTableEvent & IMovieState> {
    componentDidMount() {
        if(this.props.onLoad) {
            this.props.onLoad();
        }
    }

    private getCloums(): ColumnsType<IMovie>  {
        return [
            {
                title: "海报",
                dataIndex: "poster",
                render: poster => {
                    if(poster) {
                        return <img className="tablePoster" src={poster} alt="" />
                    }
                    return <img className="tablePoster" src={defaultPoster} alt="" />
                }
            },
            {title: "名称", dataIndex: "name"},
            {
                title: "地区", dataIndex: "area",
                render: (text: string[]) => {
                    return text.join(' , ')
                }
            },
            {
                title: "类型", dataIndex: "types",
                render: (text: string[]) => {
                    return text.join(' , ')
                }
            },
            {
                title: "时长", dataIndex: "timeLong",
                render: text => {
                    return text + "分钟"
                }
            },
            {
                title: "正在热映",
                dataIndex: "isHot",
                render: (isHot, record) => {
                    return <Switch defaultChecked={isHot} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isHot, newVal, record._id!)
                    }}/>
                }
            },
            {
                title: "即将上映",
                dataIndex: "isComing",
                render: (isComing, record) => {
                    return <Switch defaultChecked={isComing} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isComing, newVal, record._id!)
                    }}/>
                }
            },
            {
                title: "经典影片",
                dataIndex: "isClassic",
                render: (isClassic, record) => {
                    return <Switch defaultChecked={isClassic} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isClassic, newVal, record._id!)
                    }}/>
                }
            }
        ]
    }

    render() {
        return(
            <Table 
                rowKey="_id" 
                dataSource={this.props.data}
                columns={this.getCloums()}
            />
        )
    }
}