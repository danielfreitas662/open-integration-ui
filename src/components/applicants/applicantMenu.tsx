import { Menu, Skeleton } from 'antd';
import { ItemType, MenuItemType } from 'antd/es/menu/hooks/useItems';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../redux/store';

function ApplicantMenu() {
  const { applicant } = useAppSelector((state) => state.applicant);
  const [path, setPath] = useState(window.location.pathname);
  useEffect(() => {
    const pathName = window.location.pathname.split('/');
    if (pathName.length <= 1) {
      setPath('summary');
    } else {
      setPath(pathName[2]);
    }
  }, [window.location.pathname]);
  const menuItems: ItemType<MenuItemType>[] = [
    { key: 'summary', label: <Link to={`/applicant/${applicant?.id}`}>Summary</Link> },
    { key: 'form', label: <Link to={`/applicant/form/${applicant?.id}`}>Form</Link> },
    { key: 'options', label: <Link to={`/applicant/options/${applicant?.id}`}>Business Options</Link> },
    { key: 'files', label: <Link to={`/applicant/files/${applicant?.id}`}>Files</Link> },
    { key: 'content', label: <Link to={`/applicant/content/${applicant?.id}`}>Content</Link> },
  ];
  if (!applicant) return <Skeleton active />;
  return <Menu theme="light" defaultSelectedKeys={['summary']} selectedKeys={[path]} items={menuItems} />;
}

export default ApplicantMenu;
