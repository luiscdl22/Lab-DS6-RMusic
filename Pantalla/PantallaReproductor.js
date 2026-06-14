// PantallaReproductor.js
// Reproductor de audio minimalista usando expo-av

import React, { useState, useEffect, useRef } from 'react';
import {
  View, Text, TouchableOpacity,
  StyleSheet, Alert, Image,
} from 'react-native';
import { Audio } from 'expo-av';

export default function PantallaReproductor() {

  const [reproduciendo, establecerReproduciendo] = useState(false);
  const [cargando, establecerCargando] = useState(false);
  const [posicion, establecerPosicion] = useState(0);
  const [duracion, establecerDuracion] = useState(1);
  const referenciaAudio = useRef(null);

  useEffect(() => {
    configurarAudio();
    return () => {
      if (referenciaAudio.current) {
        referenciaAudio.current.unloadAsync();
      }
    };
  }, []);

  const configurarAudio = async () => {
    await Audio.setAudioModeAsync({
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
      staysActiveInBackground: false,
      allowsRecordingIOS: false,
      playsInSilentModeIOS: false,
    });
  };

  const alActualizarEstado = (estado) => {
    if (estado.isLoaded) {
      establecerPosicion(estado.positionMillis);
      establecerDuracion(estado.durationMillis || 1);
      if (estado.didJustFinish) {
        establecerReproduciendo(false);
        establecerPosicion(0);
      }
    }
  };

  const reproducirMusica = async () => {
    try {
      if (referenciaAudio.current) {
        await referenciaAudio.current.playAsync();
        establecerReproduciendo(true);
        return;
      }
      establecerCargando(true);
      const { sound: nuevoSonido } = await Audio.Sound.createAsync(
        require('../assets/audio/Music.mp3'),
        { shouldPlay: true },
        alActualizarEstado
      );
      referenciaAudio.current = nuevoSonido;
      establecerReproduciendo(true);
      establecerCargando(false);
    } catch (error) {
      establecerCargando(false);
      Alert.alert('Error', 'No se pudo cargar Music.mp3');
    }
  };

  const pausarMusica = async () => {
    if (referenciaAudio.current) {
      await referenciaAudio.current.pauseAsync();
      establecerReproduciendo(false);
    }
  };

  const detenerMusica = async () => {
    if (referenciaAudio.current) {
      await referenciaAudio.current.stopAsync();
      await referenciaAudio.current.unloadAsync();
      referenciaAudio.current = null;
      establecerReproduciendo(false);
      establecerPosicion(0);
    }
  };

  const progreso = duracion > 0 ? posicion / duracion : 0;

  const formatearTiempo = (ms) => {
    const seg = Math.floor(ms / 1000);
    const min = Math.floor(seg / 60);
    const s = seg % 60;
    return `${min}:${s < 10 ? '0' : ''}${s}`;
  };

  return (
    <View style={estilos.contenedor}>

      {/* icono centrado arriba */}
      <Image
        source={require('../assets/audio/icono.png')}
        style={estilos.icono}
      />

      {/* nombre del archivo */}
      <Text style={estilos.nombreArchivo}>Music.mp3</Text>

      {/* estado actual de reproduccion */}
      <Text style={estilos.estado}>
        {cargando ? 'Cargando...' : reproduciendo ? 'Reproduciendo' : 'Pausado'}
      </Text>

      {/* barra de progreso */}
      <View style={estilos.contenedorBarra}>
        <View style={[estilos.barraProgreso, { width: `${progreso * 100}%` }]} />
      </View>

      {/* tiempos de reproduccion */}
      <View style={estilos.filaTiempos}>
        <Text style={estilos.tiempo}>{formatearTiempo(posicion)}</Text>
        <Text style={estilos.tiempo}>{formatearTiempo(duracion)}</Text>
      </View>

      {/* botones de control */}
      <View style={estilos.filaControles}>
        <TouchableOpacity
          style={[estilos.boton, estilos.botonPlay]}
          onPress={reproducirMusica}
          disabled={cargando || reproduciendo}
        >
          <Text style={estilos.textoBoton}>Play</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.boton, estilos.botonPausa]}
          onPress={pausarMusica}
          disabled={!reproduciendo}
        >
          <Text style={estilos.textoBoton}>Pause</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[estilos.boton, estilos.botonStop]}
          onPress={detenerMusica}
          disabled={!reproduciendo}
        >
          <Text style={estilos.textoBoton}>Stop</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

const estilos = StyleSheet.create({
  contenedor: {
    flex: 1,
    backgroundColor: '#EFF6FF',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
  },
  icono: {
    width: 80,
    height: 80,
    marginBottom: 24,
    tintColor: '#2563EB',
  },
  nombreArchivo: {
    fontSize: 16,
    color: '#1E40AF',
    fontWeight: '600',
    marginBottom: 8,
  },
  estado: {
    fontSize: 14,
    color: '#64748B',
    marginBottom: 32,
  },
  contenedorBarra: {
    width: '100%',
    height: 6,
    backgroundColor: '#BFDBFE',
    borderRadius: 3,
    overflow: 'hidden',
    marginBottom: 8,
  },
  barraProgreso: {
    height: 6,
    backgroundColor: '#2563EB',
    borderRadius: 3,
  },
  filaTiempos: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  tiempo: {
    fontSize: 12,
    color: '#94A3B8',
  },
  filaControles: {
    flexDirection: 'row',
    gap: 16,
  },
  boton: {
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 24,
    elevation: 2,
  },
  botonPlay:  { backgroundColor: '#2563EB' },
  botonPausa: { backgroundColor: '#3B82F6' },
  botonStop:  { backgroundColor: '#1D4ED8' },
  textoBoton: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: 'bold',
  },
});