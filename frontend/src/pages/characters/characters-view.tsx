import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/characters/charactersSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const CharactersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { characters } = useAppSelector((state) => state.characters);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View characters')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View characters')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>CharacterName</p>
            <p>{characters?.name}</p>
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>CharacterImage</p>
            {characters?.image?.length ? (
              <ImageField
                name={'image'}
                image={characters?.image}
                className='w-20 h-20'
              />
            ) : (
              <p>No CharacterImage</p>
            )}
          </div>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Creator</p>

            <p>{characters?.creator?.firstName ?? 'No data'}</p>
          </div>

          <>
            <p className={'block font-bold mb-2'}>Traits</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Description</th>
                    </tr>
                  </thead>
                  <tbody>
                    {characters.traits &&
                      Array.isArray(characters.traits) &&
                      characters.traits.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(`/traits/traits-view/?id=${item.id}`)
                          }
                        >
                          <td data-label='description'>{item.description}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!characters?.traits?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Scenarios</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>ScenarioTitle</th>
                    </tr>
                  </thead>
                  <tbody>
                    {characters.scenarios &&
                      Array.isArray(characters.scenarios) &&
                      characters.scenarios.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/scenarios/scenarios-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='title'>{item.title}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!characters?.scenarios?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Versions</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>VersionNumber</th>

                      <th>CreatedOn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {characters.versions &&
                      Array.isArray(characters.versions) &&
                      characters.versions.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/versions/versions-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='version_number'>
                            {item.version_number}
                          </td>

                          <td data-label='created_on'>
                            {dataFormatter.dateTimeFormatter(item.created_on)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!characters?.versions?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <>
            <p className={'block font-bold mb-2'}>Versions Character</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>VersionNumber</th>

                      <th>CreatedOn</th>
                    </tr>
                  </thead>
                  <tbody>
                    {characters.versions_character &&
                      Array.isArray(characters.versions_character) &&
                      characters.versions_character.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/versions/versions-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='version_number'>
                            {item.version_number}
                          </td>

                          <td data-label='created_on'>
                            {dataFormatter.dateTimeFormatter(item.created_on)}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!characters?.versions_character?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/characters/characters-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

CharactersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_CHARACTERS'}>
      {page}
    </LayoutAuthenticated>
  );
};

export default CharactersView;
