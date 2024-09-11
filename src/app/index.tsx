import React, { useState } from 'react';
import { Button, View, StyleSheet, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Canvas, useImage, Image as SkiaImage, Paint, ColorMatrix } from '@shopify/react-native-skia';

export default function App() {
  const [imageUri, setImageUri] = useState(null);
  const [filterApplied, setFilterApplied] = useState(false);

  // Função para abrir a galeria e selecionar uma imagem
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
      setFilterApplied(false); // Redefine o estado quando uma nova imagem é carregada
    } else {
      Alert.alert('Seleção Cancelada', 'Nenhuma imagem foi selecionada.');
    }
  };

  // Função para aplicar o filtro de desaturação
  const applyFilter = () => {
    setFilterApplied(true);
  };

  // Carrega a imagem selecionada para o Skia
  const skiaImage = useImage(imageUri);

  return (
    <View style={styles.container}>
      {imageUri && skiaImage && (
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
                {/* Matriz de cor para aplicar o filtro de desaturação (tons de cinza) */}
                <ColorMatrix
                  matrix={[
                    0.33, 0.33, 0.33, 0, 0,
                    0.33, 0.33, 0.33, 0, 0,
                    0.33, 0.33, 0.33, 0, 0,
                    0, 0, 0, 1, 0,
                  ]}
                />
              </Paint>
            )}
          </SkiaImage>
        </Canvas>
      )}
      <Button title="Selecionar Imagem" onPress={pickImage} />
      {imageUri && <Button title="Aplicar Filtro" onPress={applyFilter} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  canvas: {
    width: 300,
    height: 300,
    marginBottom: 20,
  },
});
