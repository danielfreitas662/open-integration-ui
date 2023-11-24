import { Link, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useEffect } from 'react';
import { createSummary, getApplicant } from '../../redux/actions/applicantActions';
import { Button, Skeleton, Typography } from 'antd';

function Summary() {
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { loadingApplicant, applicant, creatingSummary } = useAppSelector((state) => state.applicant);
  useEffect(() => {
    if (id) dispatch(getApplicant(id));
  }, []);
  if (loadingApplicant) return <Skeleton active />;
  if (applicant && !applicant.choosenOption)
    return <Link to={`/applicant/options/${id}`}>Click here to pick a business idea</Link>;
  if (applicant && applicant.summary.length === 0)
    return (
      <div>
        <Typography.Title level={3}>Create a business plan summary</Typography.Title>
        <Button loading={creatingSummary} onClick={() => dispatch(createSummary(id!))}>
          Generate Summary
        </Button>
      </div>
    );
  return (
    <div>
      {applicant?.summary.map((c) => (
        <div key={c.index}>
          <Typography.Title level={3}>{`${c.index}. ${c.title}`}</Typography.Title>
          {c.topics.map((d, index) => (
            <Typography.Title level={4}>{`${c.index}.${index + 1}. ${d}`}</Typography.Title>
          ))}
        </div>
      ))}
    </div>
  );
}

export default Summary;
