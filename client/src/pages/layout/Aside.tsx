
import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Menu, MenuProps } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';

type MenuItem = Required<MenuProps>['items'][number];

const Aside: React.FC = function () {
  const items: MenuItem[] = [
    { label: '首页', key: '/' }, // key使用路由路径
    { label: '电影列表', key: '/movie' }, // 菜单项务必填写 key
    { label: '添加电影', key: '/movie/add' }
  ];
  const navigate = useNavigate();
  const handleClick = ({key}: MenuInfo) => {
    navigate(key);
  }

  const location = useLocation();

  return (
    <Menu
      mode="inline"
      theme="dark"
      items={items}
      onClick={handleClick}
      selectedKeys={[location.pathname]}
    />
  )
}

export default Aside