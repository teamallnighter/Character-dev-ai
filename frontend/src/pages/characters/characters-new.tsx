import {
  mdiAccount,
  mdiChartTimelineVariant,
  mdiMail,
  mdiUpload,
} from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import CardBox from '../../components/CardBox';
import LayoutAuthenticated from '../../layouts/Authenticated';
import SectionMain from '../../components/SectionMain';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import { getPageTitle } from '../../config';

import { Field, Form, Formik } from 'formik';
import FormField from '../../components/FormField';
import BaseDivider from '../../components/BaseDivider';
import BaseButtons from '../../components/BaseButtons';
import BaseButton from '../../components/BaseButton';
import FormCheckRadio from '../../components/FormCheckRadio';
import FormCheckRadioGroup from '../../components/FormCheckRadioGroup';
import FormFilePicker from '../../components/FormFilePicker';
import FormImagePicker from '../../components/FormImagePicker';
import { SwitchField } from '../../components/SwitchField';

import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { RichTextField } from '../../components/RichTextField';

import { create } from '../../stores/characters/charactersSlice';
import { useAppDispatch } from '../../stores/hooks';
import { useRouter } from 'next/router';
import moment from 'moment';

const initialValues = {
  name: '',

  image: [],

  creator: '',

  traits: [],

  scenarios: [],

  versions: [],
};

const CharactersNew = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleSubmit = async (data) => {
    await dispatch(create(data));
    await router.push('/characters/characters-list');
  };
  return (
    <>
      <Head>
        <title>{getPageTitle('New Item')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title='New Item'
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            initialValues={initialValues}
            onSubmit={(values) => handleSubmit(values)}
          >
            <Form>
              <FormField label='CharacterName'>
                <Field name='name' placeholder='CharacterName' />
              </FormField>

              <FormField>
                <Field
                  label='CharacterImage'
                  color='info'
                  icon={mdiUpload}
                  path={'characters/image'}
                  name='image'
                  id='image'
                  schema={{
                    size: undefined,
                    formats: undefined,
                  }}
                  component={FormImagePicker}
                ></Field>
              </FormField>

              <FormField label='Creator' labelFor='creator'>
                <Field
                  name='creator'
                  id='creator'
                  component={SelectField}
                  options={[]}
                  itemRef={'users'}
                ></Field>
              </FormField>

              <FormField label='Traits' labelFor='traits'>
                <Field
                  name='traits'
                  id='traits'
                  itemRef={'traits'}
                  options={[]}
                  component={SelectFieldMany}
                ></Field>
              </FormField>

              <FormField label='Scenarios' labelFor='scenarios'>
                <Field
                  name='scenarios'
                  id='scenarios'
                  itemRef={'scenarios'}
                  options={[]}
                  component={SelectFieldMany}
                ></Field>
              </FormField>

              <FormField label='Versions' labelFor='versions'>
                <Field
                  name='versions'
                  id='versions'
                  itemRef={'versions'}
                  options={[]}
                  component={SelectFieldMany}
                ></Field>
              </FormField>

              <BaseDivider />
              <BaseButtons>
                <BaseButton type='submit' color='info' label='Submit' />
                <BaseButton type='reset' color='info' outline label='Reset' />
                <BaseButton
                  type='reset'
                  color='danger'
                  outline
                  label='Cancel'
                  onClick={() => router.push('/characters/characters-list')}
                />
              </BaseButtons>
            </Form>
          </Formik>
        </CardBox>
      </SectionMain>
    </>
  );
};

CharactersNew.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'CREATE_CHARACTERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default CharactersNew;
