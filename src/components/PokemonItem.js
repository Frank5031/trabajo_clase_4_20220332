import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';

const WIDTH = Dimensions.get('window').width;
const numColumns = 2;

const PokemonItem = React.memo(({ item }) => {
  const [descripcion, setDescripcion] = useState('');
  const [cargando, setCargando] = useState(true);
  const [pokemonId, setPokemonId] = useState('');

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      try {
        console.log('Fetching ID from URL:', item.url);
        const response = await fetch(item.url);
        if (!response.ok) {
          throw new Error(`Error de la solicitud: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched ID data:', data);
        const id = data.id;
        setPokemonId(id);

        console.log(`Fetching description for ID: ${id}`);
        const speciesResponse = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${id}/`);
        if (!speciesResponse.ok) {
          throw new Error(`Error de la solicitud: ${speciesResponse.status}`);
        }
        const speciesData = await speciesResponse.json();
        console.log('Fetched species data:', speciesData);

        const entradaEnEspañol = speciesData.flavor_text_entries.find(entrada => entrada.language.name === 'es');
        if (entradaEnEspañol) {
          setDescripcion(entradaEnEspañol.flavor_text);
        } else {
          setDescripcion('Descripción no encontrada');
        }
      } catch (error) {
        console.error('Error al obtener los detalles del Pokémon:', error);
        setDescripcion('Error al obtener la descripción');
      } finally {
        setCargando(false);
      }
    };

    fetchPokemonDetails();
  }, [item.url]);

  return (
    <View style={styles.card}>
      {cargando ? (
        <ActivityIndicator style={styles.loading} size="large" />
      ) : (
        <>
          {pokemonId ? (
            <Image
              style={styles.image}
              source={{ uri: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png` }}
            />
          ) : (
            <Text style={styles.error}>Error al obtener la imagen</Text>
          )}
          <Text style={styles.title}>{item.name}</Text>
          <Text style={styles.description}>{descripcion}</Text>
        </>
      )}
    </View>
  );
});

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
    margin: 5,
    width: WIDTH / numColumns - 10,
    alignItems: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 4,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 5,
    textTransform: 'capitalize',
  },
  image: {
    width: 90,
    height: 90, // Ajuste la altura para mantener la proporción
    marginBottom: 10,
  },
  description: {
    fontSize: 14, // Ajustar el tamaño de fuente para mejor legibilidad
    textAlign: 'center',
  },
  loading: {
    marginTop: 20,
  },
  error: {
    fontSize: 14,
    color: 'red',
    textAlign: 'center',
  },
});

export default PokemonItem;
