import { Button, Divider, Skeleton, Typography } from 'antd';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { chooseBusinessOptions, createBusinessOptions, getApplicant } from '../../redux/actions/applicantActions';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';

function BusinessOptions() {
  const { id } = useParams();
  const { applicant, loadingBusinessOptions, loadingApplicant } = useAppSelector((state) => state.applicant);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (id) {
      dispatch(getApplicant(id));
    }
  }, [id]);
  if (loadingApplicant) return <Skeleton active />;
  if (applicant && applicant.businessOptions.length === 0) {
    return (
      <div>
        <Typography.Title level={3}>You haven't generated options for your business yet</Typography.Title>
        <Button loading={loadingBusinessOptions} onClick={() => id && dispatch(createBusinessOptions(id))}>
          Click here so that AI can give you some options based on your background
        </Button>
      </div>
    );
  } else
    return (
      <div>
        <Typography.Title level={3}>Here are three options of business to start</Typography.Title>
        {applicant?.businessOptions.map((c, index) => (
          <div key={c}>
            <Button onClick={() => dispatch(chooseBusinessOptions({ id: id!, option: c }))}>{`${
              index + 1
            }: ${c}`}</Button>
          </div>
        ))}
        <Button loading={loadingBusinessOptions} onClick={() => id && dispatch(createBusinessOptions(id))}>
          Generate Other Options
        </Button>
        {!applicant?.choosenOption && (
          <Typography.Text>Select the option that you believe it most fit to you</Typography.Text>
        )}
        <Divider>Current Option</Divider>
        {applicant?.choosenOption && <Typography.Text>{applicant?.choosenOption}</Typography.Text>}
      </div>
    );
}

export default BusinessOptions;
