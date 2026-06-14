# Laboratorio_DS6_Audio_ReactNative

Laboratorio de reproduccion de audio en Android con Expo SDK 54 y expo-av.
Implementa controles de Play, Pause y Stop sobre un archivo MP3 local.

## Especificaciones

| Campo | Detalle |
|---|---|
| Plataforma | Android (API 21+ / Android 5.0+) |
| SDK | Expo SDK 54 |
| Lenguaje | JavaScript |
| Libreria audio | expo-av |
| Gestor de paquetes | pnpm |
| Archivo audio | assets/audio/Music.mp3 |
| Controles | Play, Pause, Stop |
| Nomenclatura | Variables y funciones en espanol |

## Estructura del proyecto

Musica/

├── assets/

│   └── audio/

│       ├── Music.mp3

│       └── icono.png

├── Pantalla/

│   └── PantallaReproductor.js

├── App.js

└── package.json

## Ejecucion

```bash
pnpm install
npx expo start --lan
```

## Controles implementados

| Boton | Funcion |
|---|---|
| Play | Carga el archivo y reproduce. Si estaba pausado reanuda desde donde se detuvo |
| Pause | Pausa la reproduccion conservando la posicion actual |
| Stop | Detiene el audio, lo descarga de memoria y reinicia la posicion |

## Referencias

- expo-av SDK 54: https://docs.expo.dev/versions/v54.0.0/sdk/av/
- Audio API Expo: https://docs.expo.dev/versions/v54.0.0/sdk/audio/
- Expo SDK 54 Docs: https://docs.expo.dev/versions/v54.0.0/
