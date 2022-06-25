
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, MenuProps } from 'antd';
import { MenuInfo } from 'rc-menu/lib/interface';

type MenuItem = Required<MenuProps>['items'][number];

const Aside: React.FC = function () {
  const items: MenuItem[] = [
    { label: '首页', key: '/' },
    { label: '电影列表', key: '/movie' }, // 菜单项务必填写 key
    { label: '添加电影', key: '/movie/add' },
    { label: '编辑电影', key: '/movie/edit/111' },
  ];
  const navigate = useNavigate();
  const handleClick = ({key}: MenuInfo) => {
    navigate(key);
  }

  return (
    <Menu
      mode="inline"
      theme="dark"
      items={items}
      onClick={handleClick}
    />
  )
}

export default Aside