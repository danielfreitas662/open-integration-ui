import { createAsyncThunk } from '@reduxjs/toolkit';
import client from '../../clients/axios';
import { Applicant, ApplicantCreate, Summary } from '../../models/applicant';
import { Question } from '../../models/question';

export const getApplicants = createAsyncThunk(
  'applicants/get',
  async () => await client.get<Applicant[]>('/applicants')
);

export const getApplicant = createAsyncThunk(
  'applicant/get',
  async (id: string) => await client.get<Applicant>('/applicant/' + id)
);

export const createApplicant = createAsyncThunk(
  'applicant/create',
  async (data: ApplicantCreate) => await client.post<Applicant>('/applicant', data)
);

export const updateApplicantForm = createAsyncThunk(
  'applicant/updateForm',
  async (data: ApplicantCreate) => await client.post<Applicant>('/applicant/form', data)
);

export const createBusinessOptions = createAsyncThunk(
  'applicant/businessoptions',
  async (id: string) => await client.get<string[]>('/businessoptions/' + id)
);

export const createSummary = createAsyncThunk(
  'applicant/createSummary',
  async (id: string) => await client.get<Applicant>('/summary/' + id)
);

export const chooseBusinessOptions = createAsyncThunk(
  'applicant/businessoptionsChoose',
  async ({ id, option }: { id: string; option: string }) =>
    await client.post<Applicant>('/businessoptions/choose/' + id, { option: option })
);

export const getQuestions = createAsyncThunk(
  'applicant/getQuestions',
  async () => await client.get<Question[]>('/questions')
);
