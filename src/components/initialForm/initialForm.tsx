import { Button, Col, Divider, Form, Input, Row, Select, Skeleton, Typography } from 'antd';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { createApplicant, getApplicant, getQuestions, updateApplicantForm } from '../../redux/actions/applicantActions';
import { ApplicantCreate, ApplicantType, Context } from '../../models/applicant';
import { useParams } from 'react-router-dom';

interface Question {
  id: string;
  value: string;
}

interface FormFields {
  name: string;
  type: ApplicantType;
  general: Question[];
  projects: Question[];
}
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 44 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: { span: 24, offset: 0 },
    sm: { span: 20, offset: 4 },
  },
};
function InitialForm() {
  const dispatch = useAppDispatch();
  const { questions, loadingQuestions, creatingApplicant, applicant } = useAppSelector((state) => state.applicant);
  const [form] = Form.useForm<FormFields>();
  const { id } = useParams();
  useEffect(() => {
    dispatch(getQuestions());
  }, []);

  const handleSubmit = (values: FormFields) => {
    const general: Context[] = questions
      .filter((c) => c.type === 'general')
      .map((c) => ({
        question: c.value,
        answer: values.general.find((x) => x.id === c.id)?.value || '',
        questionType: c.type,
        questionId: c.id,
        projectIndex: null,
      }));
    const projects: Context[] = values.projects?.map((c, index) => ({
      question: questions.find((d) => d.id === c.id)!.value,
      questionId: c.id,
      answer: c.value,
      questionType: 'project',
      projectIndex: index,
    }));
    if (projects) projects.forEach((c) => general.push(c));
    const applicant: ApplicantCreate = {
      id: id || null,
      name: values.name,
      type: values.type,
      context: general,
      fileId: [],
      businessOptions: [],
      choosenOption: '',
      content: [],
      summary: [],
    };
    if (id) {
      dispatch(updateApplicantForm(applicant));
    } else dispatch(createApplicant(applicant));
  };
  useEffect(() => {
    if (id) dispatch(getApplicant(id));
  }, [id]);
  useEffect(() => {
    if (applicant && applicant?.context) {
      form.setFieldValue('name', applicant.name);
      form.setFieldValue('type', applicant.type);
      applicant.context.forEach((c, index) => {
        console.log(c);
        if (c.questionType === 'general') {
          form.setFieldValue(['general', index, 'id'], c.questionId);
          form.setFieldValue(['general', index, 'value'], c.answer);
        }
      });
    }
  }, [applicant]);
  if (loadingQuestions) return <Skeleton active />;
  return (
    <React.Fragment>
      <Divider>General Questions</Divider>
      <Form layout="vertical" form={form} onFinish={handleSubmit} disabled={creatingApplicant} {...formItemLayout}>
        <Row justify="space-between">
          <Col>
            <Form.Item name="name" label="Full Name" required>
              <Input />
            </Form.Item>
          </Col>
          <Form.Item name="type" label="Application Type" required initialValue="BP">
            <Select>
              <Select.Option value="BP">Business Plan</Select.Option>
              <Select.Option value="PP">Personal Plan</Select.Option>
            </Select>
          </Form.Item>
          <Col></Col>
        </Row>
        <Form.List name="general">
          {() =>
            questions
              .filter((c) => c.type === 'general')
              .map((field, index) => (
                <Form.Item noStyle key={index}>
                  <Form.Item name={[index, 'id']} initialValue={field.id} hidden>
                    <Input />
                  </Form.Item>
                  <Form.Item
                    name={[index, 'value']}
                    label={
                      <span>
                        <strong>Question {index + 1}:</strong> <span>{field.value}</span>
                      </span>
                    }
                  >
                    <Input.TextArea />
                  </Form.Item>
                </Form.Item>
              ))
          }
        </Form.List>
        <Divider>Projects</Divider>
        <Typography.Text>List projects the applicant have worked on</Typography.Text>
        <Form.List name="projects">
          {(fields, { add, remove }) => (
            <div>
              {fields.map((field, index) => (
                <Form.Item
                  name={field.name}
                  key={field.key}
                  label={
                    <strong>
                      {`Project ${index + 1}: `}
                      <MinusCircleOutlined onClick={() => remove(field.name)} style={{ color: 'red' }} />
                    </strong>
                  }
                  {...formItemLayoutWithOutLabel}
                >
                  {questions
                    .filter((c) => c.type === 'project')
                    .map((f, i) => (
                      <div key={f.id}>
                        <Form.Item name={[field.name, i, 'id']} hidden initialValue={f.id}>
                          <Input.TextArea value={f.id} />
                        </Form.Item>
                        <Form.Item name={[field.name, i, 'value']} label={`${i + 1}: ${f.value}`}>
                          <Input.TextArea />
                        </Form.Item>
                      </div>
                    ))}
                </Form.Item>
              ))}
              <Button icon={<PlusOutlined />} onClick={() => add()} type="dashed">
                Add Project
              </Button>
            </div>
          )}
        </Form.List>
        <Button onClick={() => form.submit()} loading={creatingApplicant}>
          Submit
        </Button>
      </Form>
    </React.Fragment>
  );
}

export default InitialForm;
