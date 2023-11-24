import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getApplicants } from '../../redux/actions/applicantActions';
import { Avatar, List } from 'antd';
import { getInitials } from '../../utils/getInitials';
import { Link } from 'react-router-dom';

function ApplicantsList() {
  const dispatch = useAppDispatch();
  const { applicants, loadingApplicants } = useAppSelector((state) => state.applicant);
  useEffect(() => {
    dispatch(getApplicants());
  }, []);
  return (
    <List
      loading={loadingApplicants}
      dataSource={applicants}
      renderItem={(item) => (
        <List.Item>
          <List.Item.Meta
            title={<Link to={`/applicant/${item.id}`}>{item.name}</Link>}
            description={item.choosenOption}
            avatar={<Avatar>{getInitials(item.name)}</Avatar>}
          />
        </List.Item>
      )}
    />
  );
}

export default ApplicantsList;
