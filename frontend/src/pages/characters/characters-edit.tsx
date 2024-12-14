import { mdiChartTimelineVariant, mdiUpload } from '@mdi/js';
import Head from 'next/head';
import React, { ReactElement, useEffect, useState } from 'react';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';

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
import { SelectField } from '../../components/SelectField';
import { SelectFieldMany } from '../../components/SelectFieldMany';
import { SwitchField } from '../../components/SwitchField';
import { RichTextField } from '../../components/RichTextField';

import { update, fetch } from '../../stores/characters/charactersSlice';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';

const EditCharactersPage = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const initVals = {
    name: '',

    image: [],

    creator: '',

    traits: [],

    scenarios: [],

    versions: [],
  };
  const [initialValues, setInitialValues] = useState(initVals);

  const { characters } = useAppSelector((state) => state.characters);

  const { id } = router.query;

  useEffect(() => {
    dispatch(fetch({ id: id }));
  }, [id]);

  useEffect(() => {
    if (typeof characters === 'object') {
      setInitialValues(characters);
    }
  }, [characters]);

  useEffect(() => {
    if (typeof characters === 'object') {
      const newInitialVal = { ...initVals };

      Object.keys(initVals).forEach(
        (el) => (newInitialVal[el] = characters[el] || ''),
      );

      setInitialValues(newInitialVal);
    }
  }, [characters]);

  const handleSubmit = async (data) => {
    await dispatch(update({ id: id, data }));
    await router.push('/characters/characters-list');
  };

  return (
    <>
      <Head>
        <title>{getPageTitle('Edit characters')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={'Edit characters'}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <Formik
            enableReinitialize
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
                  options={initialValues.creator}
                  itemRef={'users'}
                  showField={'firstName'}
                ></Field>
              </FormField>

              <FormField label='Traits' labelFor='traits'>
                <Field
                  name='traits'
                  id='traits'
                  component={SelectFieldMany}
                  options={initialValues.traits}
                  itemRef={'traits'}
                  showField={'description'}
                ></Field>
              </FormField>

              <FormField label='Scenarios' labelFor='scenarios'>
                <Field
                  name='scenarios'
                  id='scenarios'
                  component={SelectFieldMany}
                  options={initialValues.scenarios}
                  itemRef={'scenarios'}
                  showField={'title'}
                ></Field>
              </FormField>

              <FormField label='Versions' labelFor='versions'>
                <Field
                  name='versions'
                  id='versions'
                  component={SelectFieldMany}
                  options={initialValues.versions}
                  itemRef={'versions'}
                  showField={'version_number'}
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

EditCharactersPage.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'UPDATE_CHARACTERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default EditCharactersPage;
