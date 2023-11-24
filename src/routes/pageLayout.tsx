import { Layout } from 'antd';
import { ReactNode, useEffect, useState } from 'react';
import Header from '../components/header/header';
import { useLocation } from 'react-router-dom';
import ApplicantsList from '../components/applicants/applicantsList';
import ApplicantMenu from '../components/applicants/applicantMenu';

interface PageLayoutProps {
  children: ReactNode;
}
function PageLayout({ children }: PageLayoutProps) {
  const location = useLocation();
  const [path, setPath] = useState('/');
  useEffect(() => {
    setPath(location.pathname);
  }, [location.pathname]);
  return (
    <Layout>
      <Layout.Header style={{ display: 'flex', alignItems: 'center' }}>
        <Header />
      </Layout.Header>
      <Layout>
        {!path.startsWith('/new') && (
          <Layout.Sider theme="light" width={250} style={{ padding: 5 }} collapsible collapsedWidth={35}>
            {path === '/' && <ApplicantsList />}
            {path.startsWith('/applicant/') && <ApplicantMenu />}
          </Layout.Sider>
        )}
        <Layout.Content
          style={{
            height: 'calc(100vh - 64px)',
            padding: 10,
            overflowY: 'scroll',
            overflowX: 'hidden',
          }}
        >
          {children}
        </Layout.Content>
      </Layout>
    </Layout>
  );
}
export default PageLayout;
