import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { getApplicant } from '../../redux/actions/applicantActions';
import { Skeleton } from 'antd';

function Content() {
  const { id } = useParams();
  const { loadingApplicant, applicant } = useAppSelector((state) => state.applicant);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) dispatch(getApplicant(id));
  }, [id]);
  if (loadingApplicant) return <Skeleton active />;
  return <div>SUmmary</div>;
}

export default Content;
