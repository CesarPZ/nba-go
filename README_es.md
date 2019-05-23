<p align=center>
<img src="https://user-images.githubusercontent.com/12113222/32413609-ea673d3e-c24f-11e7-935b-0a2a86be0ee2.png">
</p>
<p align=center>
<a target="_blank" href="https://npmjs.org/package/nba-go" title="NPM version"><img src="https://img.shields.io/npm/v/nba-go.svg"></a>
<a target="_blank" href="https://travis-ci.org/xxhomey19/nba-go" title="Build Status"><img src="https://travis-ci.org/xxhomey19/nba-go.svg?branch=master"></a>
<a target="_blank" href="http://nodejs.org/download/" title="Node version"><img src="https://img.shields.io/badge/node.js-%3E=_6.0-green.svg"></a>
<a target="_blank" href="https://opensource.org/licenses/MIT" title="License: MIT"><img src="https://img.shields.io/badge/License-MIT-blue.svg"></a>
<a target="_blank" href="http://makeapullrequest.com" title="PRs Welcome"><img src="https://img.shields.io/badge/PRs-welcome-brightgreen.svg"></a>
</p>

##
[Traducción al ingles](README.md)
##

> El mejor CLI de la NBA.

Mire la NBA en vivo play-by-play, vista previa del juego, puntuación del cuadro e información del jugador en su consola. 
La mejor herramienta de CLI para aquellos que son tanto **fanáticos de la NBA** como **ingenieros**.

Todos los datos provienen de las APIs de [stats.nba.com](http://stats.nba.com/).

## Instalación

Para poder usar nba-go, asegúrese de tener la versión 6.0.0 o superior de [Node](https://nodejs.org/).

```
$ npm install -g nba-go
```

O en un contenedor Docker:

```
$ docker build -t nba-go:latest .
$ docker run -it nba-go:latest
```

De forma predeterminada, el contenedor de la ventana acoplable se ejecutará `nba-go game -t`, pero puede anular este comando en tiempo de ejecución. 
Por ejemplo:

```
$ docker run -it nba-go:latest nba-go player Curry -i
```

O descargue la última versión [pkg](https://github.com/zeit/pkg) binarios en [lanzamientos](https://github.com/xxhomey19/nba-go/releases) . Se puede ejecutar en Linux, macOs y Windows. 
Por ejemplo:

```
./nba-go-macos game -h
```

## Uso

`nba-go` Proporciona dos comandos principales.

1. [`game` or `g`](#game)
2. [`player` or `p`](#player)

### Juego

Hay dos cosas que hacer

1. [**Consultar horario**](#check-schedule).
2. Elige un juego que quieras ver.

Dependiendo del estado del juego que elijas, se mostrará un resultado diferente. Hay tres tipos de estados que pueden mostrarse.

| Estado              | Ejemplo                                                                                                                                                                 | Descripción                                                                                                                                                             |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| [Prejuego](#prejuego) | <img alt="screen shot 2017-11-06 at 8 57 02 am" src="https://user-images.githubusercontent.com/12113222/32421167-8a3521d4-c2d0-11e7-9ae3-be1c0def1b71.png">              | Se muestra **cuando comienza el juego**.<br> Al seleccionar esto, se mostrará la comparación entre dos equipos, incluidos los puntos promedio, los porcentajes de los goles de campo, las asistencias promedio, etc. |
| [Vivo](#vivo)       | <img alt="screen shot 2017-11-06 at 8 56 50 am" src="https://user-images.githubusercontent.com/12113222/32421177-adc7ae5a-c2d0-11e7-9824-a4de7c40a5e4.png">              | Se muestra el **reloj del juego en vivo**. <br> **Característica más potente!** Al seleccionar esto, se mostrará la página en vivo que incluye el marcador, juego por juego y puntuación de cuadro.                    |
| [Final](#final)     | <img width="600" alt="screen shot 2017-11-06 at 8 56 14 am" src="https://user-images.githubusercontent.com/12113222/32421166-8a08dde0-c2d0-11e7-8a38-69f646786653.png">              | Al seleccionar esto se mostrará el cuadro de indicadores, el cuadro detallado de puntuación, etc.                                                                                                        |

#### Consultar horario

Para mostrar la programación en algunos días, `nba-go` proporciona el comando `nba-go game` con algunas opciones.

#### Opciones

##### `-d <fecha>` or `--date <fecha>`

Ingrese una fecha específica para verificar el horario de ese día.

```
$ nba-go game -d 2017/11/02
```

![game -d gif](https://user-images.githubusercontent.com/12113222/32413795-0e7d75c2-c254-11e7-8a77-eeabed3c11f2.gif)

##### `-y` or `--yesterday`

Consulta el **horario de ayer**.

```
$ nba-go game -y
```

![game -y gif](https://user-images.githubusercontent.com/12113222/32414094-8bd4ba98-c25a-11e7-84f0-4fc473dc7144.gif)

##### `-t` or `--today`

Consulta el **horario de hoy**.

```
$ nba-go game -t
```

![game -t gif](https://user-images.githubusercontent.com/12113222/32414115-f1a1ad72-c25a-11e7-8c79-a8b9b1ee0599.gif)

##### `-T` or `--tomorrow`

Consulta el **horario de mañana**.

```
$ nba-go game -T
```

![game -T gif](https://user-images.githubusercontent.com/12113222/32414142-7897dfe0-c25b-11e7-9acf-d50ade5379fd.gif)

##### `-n` or `--networks`

Mostrar la información de la red de televisión del equipo local y del equipo visitante.

```
$ nba-go game -n
```

#### Prejuego

⭐️⭐️  
Comprueba los datos comparativos detallados entre dos equipos en el juego.

![prejuego](https://user-images.githubusercontent.com/12113222/32414253-ad64df82-c25d-11e7-9076-4da800f3c701.gif)

#### Vivo

⭐️⭐️⭐️  
**¡La mejor característica!** Juego en tiempo actualizado, marcador y puntaje de caja. Activa el modo de pantalla completa para una mejor experiencia. 
Por cierto, juego por juego es desplazable !.

![vivo](https://user-images.githubusercontent.com/12113222/32420915-3ca6b34a-c2cd-11e7-904d-bf41cc4b93f7.gif)

#### Final

⭐️⭐️  
Compruebe el marcador detallado de dos equipos y el cuadro de puntuación.

![final](https://user-images.githubusercontent.com/12113222/32436783-1e7ad7b8-c320-11e7-97af-29d95732581c.gif)

#### Filtrar

Filtra los resultados para saltar rápidamente a la información que te interesa.

#### Opciones

##### `-f` or `--filter`

Actualmente solo admite el filtrado de los resultados por equipo, pero hay más opciones en camino.

```
nba-go game --filter team=Detroit
```

### Jugador

Obtenga la información básica del jugador, los datos de la temporada regular y los datos de los playoffs.

**Nota.** Debe colocar el **nombre del jugador** entre `nba-go playery` opciones.

#### Opciones

##### `-i` or `--info`

Obtener información básica del jugador.

```
$ nba-go player Curry -i
```

![player -i gif](https://user-images.githubusercontent.com/12113222/32416941-7cfc49e6-c28c-11e7-8a79-15601a44554e.gif)

##### `-r` or `--regular`

Obtener información básica del jugador.

```
$ nba-go player Curry -r
```

![player -r gif](https://user-images.githubusercontent.com/12113222/32416897-bb82af9e-c28b-11e7-827f-0f0d67d80364.gif)

##### `-p` or `--playoffs`

Obtener información básica del jugador.

```
$ nba-go player Curry -p
```

![player -p gif](https://user-images.githubusercontent.com/12113222/32500032-234e8fba-c40f-11e7-87c0-6e42a66a52dc.gif)

##### `-c` or `--compare`

Consigue y compara las estadísticas de varios jugadores. La mejor estadística se resaltará en verde para facilitar la comparación. Al enumerar los nombres múltiples, deben estar entre comillas y separados por comas. Se puede combinar con los indicadores -i, -r y -p.

```
$ nba-go player "Lebron James, Stephen Curry, James Harden" -c -i -r -p
```

![player -c gif](https://user-images.githubusercontent.com/12113222/37696809-1fd54306-2d14-11e8-9261-4d9b6a08588a.gif)

#### Mezclado todos

Obtener todos los datos al mismo tiempo.

```
$ nba-go player Curry -i -r -p
```

![player mixed gif](https://user-images.githubusercontent.com/12113222/32416928-5054d48a-c28c-11e7-84d3-bc17681e1a5e.gif)

## Idioma

Para seleccionar otro idioma desde la consola:

##### `-l` or `--language <language>`

```
$ nba-go game -t -l 'es'
```

```
$ nba-go player Curry -i -r -l 'es'
```

Idiomas disponibles: es, en.

## Desarrollo

Es fácil de ejecutar `nba-go` en su computadora local. 
La siguiente es una instrucción paso a paso.

```
$ git clone https://github.com/xxhomey19/nba-go.git
$ cd nba-go
$ yarn
$ NODE_ENV=development node bin/cli.js <command>
```

## Repo relacionado:

- [nba-bar](https://github.com/xxhomey19/nba-bar)
- [watch-nba](https://github.com/chentsulin/watch-nba)
- [nba-color](https://github.com/xxhomey19/nba-color)

## Licencia

MIT © [xxhomey19](https://github.com/xxhomey19)