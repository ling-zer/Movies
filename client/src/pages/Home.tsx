import React from "react";
import { IMovie, MovieService } from "../services/MovieService";
import defaultImg from "../assets/defaults.jpg"
import "./Home.css"
import { Card } from "antd";
import Meta from "antd/lib/card/Meta";
import { EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { NavigateFunction, useNavigate } from "react-router-dom"

interface IHomeState {
    movie: IMovie[]
}

interface IHomeProps {
    navigate: NavigateFunction
}

class Home extends React.Component<IHomeProps, IHomeState> {
    state: IHomeState = {
        movie: []
    }
    async componentDidMount() {
        const resp = await MovieService.getHotMovies()
        if (resp.data) {
            let movies = resp.data;
            movies = movies.filter(m => m.isHot)
            this.setState({
                movie: movies
            })
        }
    }
    render() {
        const movieList = this.state.movie.map((m, i) => (
            <Card
                key={i}
                className="home-item"
                hoverable
                cover={
                    <img
                        alt="example"
                        src={m.poster || defaultImg}
                    />
                }
                actions={[
                    <EditOutlined key="edit" onClick={() => {
                        this.props.navigate(`/movie/edit/${m._id}`)
                    }} />,
                    <EllipsisOutlined key="ellipsis" />,
                ]}
            >
                <Meta
                    title={m.name}
                    description={"时长:" + m.timeLong + "分钟"}
                />
            </Card>
        ))
        return (
            <div className="home-container">
                {movieList}
            </div>
        )
    }
}

const withNavigate = (Comp: typeof Home) => {
    return () => (<Comp navigate={useNavigate()}/> )
}

export default withNavigate(Home)