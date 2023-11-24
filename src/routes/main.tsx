import { Route, Routes } from 'react-router-dom';
import Home from './home';
import PageLayout from './pageLayout';
import NewForm from './newForm';
import Summary from './applicant/summary';
import InitialForm from '../components/initialForm/initialForm';
import BusinessOptions from './applicant/businessOptions';
import Content from './applicant/content';

function Main() {
  return (
    <PageLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new" element={<NewForm />} />
        <Route path="/applicant/:id" element={<Summary />} />
        <Route path="/applicant/form/:id" element={<InitialForm />} />
        <Route path="/applicant/options/:id" element={<BusinessOptions />} />
        <Route path="/applicant/content/:id" element={<Content />} />
      </Routes>
    </PageLayout>
  );
}

export default Main;
