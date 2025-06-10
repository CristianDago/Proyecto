# Imagen base de Node.js
FROM node:18
# Establecer el directorio de trabajo en el contenedor
WORKDIR /app
# Copiar los archivos de configuración de la aplicación
COPY package*.json ./
RUN npm install
# Copiar el resto de los archivos de la aplicación
COPY . .
# Exponer el puerto en el que la aplicación escuchará
EXPOSE 3000
# Comando para iniciar la aplicación
CMD ["node", "app.js"]
