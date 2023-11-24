import { createReducer } from '@reduxjs/toolkit';
import { Applicant } from '../../models/applicant';
import {
  chooseBusinessOptions,
  createApplicant,
  createBusinessOptions,
  createSummary,
  getApplicant,
  getApplicants,
  getQuestions,
  updateApplicantForm,
} from '../actions/applicantActions';
import { Question } from '../../models/question';

interface ApplicantReducer {
  applicants: Applicant[];
  loadingApplicants: boolean;
  loadingApplicant: boolean;
  loadingBusinessOptions: boolean;
  creatingApplicant: boolean;
  applicant: Applicant | null;
  questions: Question[];
  loadingQuestions: boolean;
  creatingSummary: boolean;
}

const initialState: ApplicantReducer = {
  applicant: null,
  applicants: [],
  loadingApplicants: false,
  loadingApplicant: false,
  loadingBusinessOptions: false,
  creatingApplicant: false,
  questions: [],
  loadingQuestions: false,
  creatingSummary: false,
};

const applicantReducer = createReducer(initialState, (builder) => {
  builder.addCase(getApplicants.pending, (state) => {
    return { ...state, loadingApplicants: true };
  });
  builder.addCase(getApplicants.rejected, (state) => {
    return { ...state, loadingApplicants: false };
  });
  builder.addCase(getApplicants.fulfilled, (state, action) => {
    return { ...state, loadingApplicants: false, applicants: action.payload.data };
  });

  builder.addCase(getApplicant.pending, (state) => {
    return { ...state, loadingApplicant: true };
  });
  builder.addCase(getApplicant.rejected, (state) => {
    return { ...state, loadingApplicant: false };
  });
  builder.addCase(getApplicant.fulfilled, (state, action) => {
    return { ...state, loadingApplicant: false, applicant: action.payload.data };
  });

  builder.addCase(createApplicant.pending, (state) => {
    return { ...state, creatingApplicant: true };
  });
  builder.addCase(createApplicant.rejected, (state) => {
    return { ...state, creatingApplicant: false };
  });
  builder.addCase(createApplicant.fulfilled, (state, action) => {
    return { ...state, creatingApplicant: false, applicant: action.payload.data };
  });

  builder.addCase(updateApplicantForm.pending, (state) => {
    return { ...state, creatingApplicant: true };
  });
  builder.addCase(updateApplicantForm.rejected, (state) => {
    return { ...state, creatingApplicant: false };
  });
  builder.addCase(updateApplicantForm.fulfilled, (state, action) => {
    return { ...state, creatingApplicant: false, applicant: action.payload.data };
  });

  builder.addCase(createBusinessOptions.pending, (state) => {
    return { ...state, loadingBusinessOptions: true };
  });
  builder.addCase(createBusinessOptions.rejected, (state) => {
    return { ...state, loadingBusinessOptions: false };
  });
  builder.addCase(createBusinessOptions.fulfilled, (state, action) => {
    return {
      ...state,
      loadingBusinessOptions: false,
      applicant: state.applicant && { ...state.applicant, businessOptions: action.payload.data },
    };
  });

  builder.addCase(getQuestions.pending, (state) => {
    return { ...state, loadingQuestions: true };
  });
  builder.addCase(getQuestions.rejected, (state) => {
    return { ...state, loadingQuestions: false };
  });
  builder.addCase(getQuestions.fulfilled, (state, action) => {
    return { ...state, loadingQuestions: false, questions: action.payload.data };
  });

  builder.addCase(chooseBusinessOptions.pending, (state) => {
    return { ...state, loadingQuestions: true };
  });
  builder.addCase(chooseBusinessOptions.rejected, (state) => {
    return { ...state, loadingQuestions: false };
  });
  builder.addCase(chooseBusinessOptions.fulfilled, (state, action) => {
    return { ...state, loadingQuestions: false, applicant: action.payload.data };
  });

  builder.addCase(createSummary.pending, (state) => {
    return { ...state, creatingSummary: true };
  });
  builder.addCase(createSummary.rejected, (state) => {
    return { ...state, creatingSummary: false };
  });
  builder.addCase(createSummary.fulfilled, (state, action) => {
    return { ...state, creatingSummary: false, applicant: action.payload.data };
  });
});

export default applicantReducer;
