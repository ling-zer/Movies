import React from "react";
import { IMovieState } from "../redux/features/MovieSlice";
import { Table, Switch, Button, message, Popconfirm, Space, Input } from "antd";
import { ColumnsType, FilterValue, TablePaginationConfig } from "antd/lib/table/interface";
import { IMovie } from "../services/MovieService";
import defaultPoster from "../assets/default.jpg";
import "./MovieTable.css"
import { SwitchType } from "../services/CommonTypes";
import { NavigateFunction, useNavigate } from "react-router";
import { SearchOutlined } from "@ant-design/icons"


export interface IMovieTableEvent {
    /**
     * 完成加载之后的事件
     */
    onLoad: () => void,
    /**
     * 切换Switch状态
     */
    onSwitchChange: (type: SwitchType, newVal: boolean, id: string) => void
    /**
     * 删除电影
     */
    onDelete: (id: string) => Promise<void>,
    /**
     * 页码或页容量改变
     */
    onChange: (newPage: number, newLimit: number) => void
    /**
     * 查询条件key改变
     */
    onKeyChange: (newKey: string) => void
    /**
     * 搜素
     */
    onSearch: () => void
}

export interface INavigate {
    navigate: NavigateFunction
}

class MovieTable extends React.Component<IMovieTableEvent & IMovieState & INavigate> {
    componentDidMount() {
        if (this.props.onLoad) {
            this.props.onLoad();
        }
    }

    private getFilterDrowpdown(p: Object) {
        return (
            <div style={{ padding: 8 }}>
                <Input
                    style={{ marginBottom: 8, display: 'block' }}
                    value={this.props.condition.key}
                    onChange={e => this.props.onKeyChange(e.target.value)}
                    onPressEnter={this.props.onSearch}
                />
                <Space>
                    <Button
                        type="primary"
                        icon={<SearchOutlined />}
                        size="small"
                        style={{ width: 90 }}
                        onClick={this.props.onSearch}
                    >
                        搜索
                    </Button>
                    <Button
                        size="small"
                        style={{ width: 90 }}
                        onClick={() => {
                            this.props.onKeyChange("")
                            this.props.onSearch()
                        }}
                    >
                        重置
                    </Button>
                </Space>
            </div>
        )
    }

    private getCloums(): ColumnsType<IMovie> {
        return [
            {
                title: "海报",
                dataIndex: "poster",
                render: poster => {
                    if (poster) {
                        return <img className="tablePoster" src={poster} alt="" />
                    }
                    return <img className="tablePoster" src={defaultPoster} alt="" />
                }
            },
            {
                title: "名称", dataIndex: "name",
                filterDropdown: this.getFilterDrowpdown.bind(this),
                filterIcon: <SearchOutlined />
            },
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
                },
                sorter: (a, b) => a.timeLong - b.timeLong
            },
            {
                title: "正在热映",
                dataIndex: "isHot",
                render: (isHot, record) => {
                    return <Switch defaultChecked={isHot} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isHot, newVal, record._id!)
                    }} />
                }
            },
            {
                title: "即将上映",
                dataIndex: "isComing",
                render: (isComing, record) => {
                    return <Switch defaultChecked={isComing} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isComing, newVal, record._id!)
                    }} />
                }
            },
            {
                title: "经典影片",
                dataIndex: "isClassic",
                render: (isClassic: boolean, record) => {
                    return <Switch defaultChecked={isClassic} onChange={(newVal) => {
                        this.props.onSwitchChange(SwitchType.isClassic, newVal, record._id!)
                    }} />
                }
            }
            ,
            {
                title: "操作",
                dataIndex: "_id",
                render: (id: string, record) => {
                    return (
                        <div>
                            <Button type="primary" size="small" onClick={() => {
                                this.props.navigate(`/movie/edit/${id}`)
                            }}>编辑</Button>
                            <Popconfirm
                                title="确认删除该条数据吗?"
                                onConfirm={async () => {
                                    await this.props.onDelete(id)
                                    message.success("删除成功");
                                    this.props.onSearch()
                                }}
                                okText="确定"
                                cancelText="取消"
                            >
                                <Button danger size="small" style={{
                                    marginLeft: 5
                                }}>删除</Button>
                            </Popconfirm>

                        </div>
                    )
                }
            }
        ]
    }

    getPaginConfig(): false | TablePaginationConfig | undefined {
        if (this.props.total === 0) {
            return false;
        }
        return {
            current: this.props.condition.page,
            pageSize: this.props.condition.limit,
            total: this.props.total
        }
    }

    handleChange(pagination: TablePaginationConfig, filters: Record<string, FilterValue | null>) {
        this.props.onChange(pagination.current!, pagination.pageSize!)
    }

    render() {
        return (
            <Table
                rowKey="_id"
                dataSource={this.props.data}
                columns={this.getCloums()}
                pagination={
                    this.getPaginConfig()
                }
                onChange={this.handleChange.bind(this)}
                loading={this.props.isLoading}
            />
        )
    }
}

const withNavigate = (Comp: typeof MovieTable) => {
    return (props: any) => <Comp {...props} navigate={useNavigate()} />
}

export default withNavigate(MovieTable)