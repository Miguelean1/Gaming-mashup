# 🎮 Game-hub mashup

## 1. APIs externas utilizadas y rutas
Para este Mashup se han integrado las siguientes 3 APIs externas:

1. **RAWG Videogames database API**
   - **Ruta usada:** `GET https://api.rawg.io/api/games?search={query}&key={API_KEY}`
   - **Uso:** Obtiene la información maestra del videojuego (título oficial, imagen de portada, fecha de lanzamiento y puntuación en Metacritic).

2. **CheapShark API**
   - **Ruta usada:** `GET https://www.cheapshark.com/api/1.0/games?title={query}`
   - **Uso:** Busca el juego en diferentes tiendas digitales (Steam, GoG, GreenManGaming, etc.) y devuelve el precio más barato actual.

3. **Reddit JSON API**
   - **Ruta usada:** `GET https://www.reddit.com/search.json?q={query}+subreddit:gaming`
   - **Uso:** Busca en  Reddit los hilos de discusión más relevantes relacionados con el videojuego buscado.

## 2. Relación y sentido de la combinación
 
La verdad es que al leer "cualesquiera" lo primero que pensé fue en los videojuegos. Como normalmente yo lo que consulto en internet sobre videojuegos son donde lo venden y a qué precio, pues estaba claro.

Además he añadido los hilos de Reddit porque la información es poder.

## 3. Configuración de API Keys
De las 3 APIs utilizadas, CheapShark y Reddit son públicas y gratuitas para este nivel de uso (no requieren Key). **RAWG** sí requiere una API Key(pero la puedes obtener en un minuto).

**¿Cómo obtener la API Key?**
1. Entra a [RAWG.io](https://rawg.io/apidocs).
2. Regístrate con una cuenta gratuita (yo he usado Steam para loguearme).
3. En las opciones de perfil, ve a "Get an API Key" y copia la clave que te dan.

**¿Dónde se configura en el proyecto?**
Aqui la cosa se pone algo técnica. Para que no gastes las peticiones que me ha concedido RAWG a mí personalmente tienes que crear un archivo llamado `.env`. En este archivo se debe incluir la siguiente variable:

env--->RAWG_API_KEY=123456789abcdefg...

El backend desarrollado en Node.js lee esta clave mediante `process.env.RAWG_API_KEY`.

Y si vas a trabajar con Git, recuerda no compartir tus claves personales con todo el mundo!

## 4. Capturas de pantalla de la interfaz interactiva


- **Captura 1:** Búsqueda en la API
![busqueda de Elden Ring](/images/image.png)
- **Captura 2:** Indicador de que la vista está cacheada
![busqueda cacheada](/images/image2.png)

- **Captura 3:**  Detalle de la terminal donde vemos los logs que demuestran lo anterior: 
![terminal](/images/image3.png)