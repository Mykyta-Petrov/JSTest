import React, { useMemo } from 'react'
import * as Yup from 'yup';
import { Field, Form, Formik, ErrorMessage } from 'formik';
import { Country, State } from 'country-state-city';

function LocationForm({ submitHandler }) {
  const countries = useMemo(() => Country.getAllCountries(), []);

  const schema = Yup.object().shape({
    country: Yup.string().required(),
    state: Yup.string().required()
  });

  const initialValues = {
    country: '',
    state: ''
  };

  return (
    <div>
      <Formik
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => submitHandler({
          country: JSON.parse(values.country),
          state: JSON.parse(values.state) })}>
        {(formik) => {
          const { errors, touched, isValid, dirty, values } = formik;
          return (
            <div>
              <Form>
                <div>
                  <Field id='country' as='select' name='country'>
                    {!values.country && (<option value=''>Select country</option>)}
                    {countries.map((country) => (
                      <option key={country.name} value={JSON.stringify(country)}>
                        {country.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name='country' component='span'></ErrorMessage>
                </div>
                <div>
                  <Field id='state' as='select' name='state'>
                    {!values.state && (<option value=''>Select state</option>)}
                    {values.country && State.getStatesOfCountry(JSON.parse(values.country).isoCode).map((state) => (
                      <option key={state.name} value={JSON.stringify(state)}>
                        {state.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name='state' component='span'></ErrorMessage>
                </div>
                {/*<div>
                  <Field id='city' as='select' name='city'>
                    {!values.city && (<option value=''>Select city</option>)}
                    {values.country && values.state && City.getCitiesOfState(JSON.parse(values.country).isoCode, JSON.parse(values.state).isoCode).map((city) => (
                      <option key={city.name} value={JSON.stringify(city)}>
                        {city.name}
                      </option>
                    ))}
                  </Field>
                  <ErrorMessage name='city' component='span'></ErrorMessage>
                    </div>*/}
                <button type='submit' disabled={!(dirty && isValid)}>Submit</button>
              </Form>
            </div>
          );
        }}
      </Formik>
    </div>
  )
}

export default LocationForm