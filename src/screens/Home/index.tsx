import React from 'react';
import { Platform } from 'react-native';
import {
  Container,
  AddressContainer
} from './styles';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useDispatch, useSelector } from 'react-redux';

import { NavFavorites } from '@components/NavFavorites';
import { Map } from '@components/Map';

import { GOOGLE_MAPS_API_KEY_ANDROID } from '@env';

import { setOrigin, selectOrigin, setDestination } from '../../slices/navigationSlice';

export function Home({ navigation }) {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);

  return (
    <Container
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >

      <Map />

      <AddressContainer>
        <GooglePlacesAutocomplete
          placeholder='Para onde?'
          minLength={2}
          debounce={400}
          enablePoweredByContainer={false}
          nearbyPlacesAPI='GooglePlacesSearch'
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));

            navigation.navigate('Mapa')
          }}
          fetchDetails={true}
          query={{
            key: 'AIzaSyB2Pi6HeRAshcq8dsa3fFwwjifa6vhXRwg',
            language: 'pt-BR',
            components: 'country:br'
          }}
          styles={{
            container: {
              flex: 0,

              borderRadius: 15
            },
            textInput: {
              fontSize: 16,

              backgroundColor: '#D5DDE0',
              color: '#353839',
              borderRadius: 15
            },
            listView: {
              borderRadius: 15
            },
            row: {
              backgroundColor: '#D5DDE0',
              color: '#D5DDE0'
            }
          }}
        />
        <NavFavorites navigation />
      </AddressContainer>
    </Container>
  );
}