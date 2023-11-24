import { FileFilled, PlusOutlined, FileOutlined, MenuOutlined, DownloadOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { Link, useParams } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

const sufixItems: ItemType<MenuItemType>[] = [
  {
    key: 'new',
    icon: <PlusOutlined />,
    label: <Link to="/new">New</Link>,
  },
];

function Header() {
  const { applicant } = useAppSelector((state) => state.applicant);
  const { id } = useParams();
  const docMenu: ItemType<MenuItemType>[] = [
    {
      key: 'download',
      icon: <DownloadOutlined />,
      label: 'Download',
    },
    {
      key: 'topics',
      icon: <MenuOutlined />,
      label: 'Topics',
    },
    {
      key: 'document',
      icon: <FileOutlined />,
      label: <Link to={`/document/${id}`}>Document</Link>,
    },
    ...sufixItems,
  ];
  if (id)
    return (
      <div>
        <Menu style={{ minWidth: 0, flex: 'auto' }} theme="light" mode="horizontal" items={docMenu} />
      </div>
    );
  else
    return (
      <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
        <div>
          <Link to="/">Visa AI</Link>
        </div>
        <div>{applicant && applicant.name}</div>
      </div>
    );
}

export default Header;
