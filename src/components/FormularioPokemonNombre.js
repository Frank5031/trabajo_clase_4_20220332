import { View, Text, FlatList, Image, StyleSheet, Dimensions, TextInput, ActivityIndicator } from 'react-native';


const FormularioPokemonNombre = ({ labelInput, placeHolderInput, valor, setValor }) => {
    return (
        <View>
            <View>
                <Text style={styles.descripcion}>{labelInput}</Text>
                <TextInput
                    style={styles.Input}
                    placeholder={placeHolderInput}
                    onChangeText={(text) => setValor(text)} // Modifica esta línea
                    value={valor}
                />

            </View>
        </View>
    );
}

export default FormularioPokemonNombre;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 50,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        textAlign: 'center'
    },
    Input: {
        width: '70%',
        backgroundColor: '#BFB9FF',
        height: 50,
        fontWeight: '900',
        borderRadius: 5,
        margin: 5,
        fontSize: 18
    },
    descripcion: {
        fontSize: 16,
        fontWeight: '400',
        textAlign: 'justify',
        marginTop: 10,
    },

});
