import React, { useState } from 'react';
import { Button, View, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Canvas, useImage, Image as SkiaImage, Paint, ColorMatrix, Path, Circle } from '@shopify/react-native-skia';

export default function App() {
  const [imageUri, setImageUri] = useState<string | null>(null);
  const [filterApplied, setFilterApplied] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setFilterApplied(false);
    } else {
      Alert.alert('Seleção Cancelada', 'Nenhuma imagem foi selecionada.');
    }
  };

  const applyFilter = () => {
    setFilterApplied(true);
  };

  const skiaImage = useImage(imageUri);

  return (
    <View style={styles.container}>
      <Canvas style={styles.olympicRings}>
        {/* Cores dos anéis: Azul, Preto, Vermelho, Amarelo e Verde */}
        <Circle cx={50} cy={50} r={30} color="blue" style="stroke" strokeWidth={5} />
        <Circle cx={120} cy={50} r={30} color="black" style="stroke" strokeWidth={5} />
        <Circle cx={190} cy={50} r={30} color="red" style="stroke" strokeWidth={5} />
        <Circle cx={85} cy={90} r={30} color="yellow" style="stroke" strokeWidth={5} />
        <Circle cx={155} cy={90} r={30} color="green" style="stroke" strokeWidth={5} />
      </Canvas>
      <Text style={styles.title}>Editor de Imagens</Text>

      {imageUri && skiaImage ? (
        <Canvas style={styles.canvas}>
          <SkiaImage
            image={skiaImage}
            x={0}
            y={0}
            width={300}
            height={300}
            fit="contain"
          >
            {filterApplied && (
              <Paint>
                <ColorMatrix
                  matrix={[
                    0.3, 0.59, 0.11, 0, 0,  // Efeito de escala de cinza
                    0.3, 0.59, 0.11, 0, 0,
                    0.3, 0.59, 0.11, 0, 0,
                    0, 0, 0, 1, 0,
                  ]}
                />
              </Paint>
            )}
          </SkiaImage>
        </Canvas>
      ) : (
        <Text style={styles.placeholder}>Nenhuma imagem selecionada</Text>
      )}

      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Selecionar Imagem</Text>
        </TouchableOpacity>

        {imageUri && (
          <TouchableOpacity style={[styles.button, styles.buttonApply]} onPress={applyFilter}>
            <Text style={styles.buttonText}>Aplicar Filtro</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  olympicRings: {
    position: 'absolute',
    top: 50,
    width: 250,
    height: 150,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  canvas: {
    width: 300,
    height: 300,
    borderRadius: 10,
    backgroundColor: '#fff',
    elevation: 5,
    marginBottom: 20,
  },
  placeholder: {
    fontSize: 16,
    color: '#888',
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  button: {
    backgroundColor: '#673AB7', // Cor roxa
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: 12,
    marginHorizontal: 5,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonApply: {
    backgroundColor: '#FF9800',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
});
