FROM node:23-slim

# Configurar el directorio de trabajo
WORKDIR /app

# Copiar todo el proyecto
COPY . .

# Instalar las dependencias
RUN npm install

# Construir la aplicación
RUN npm run build

# Exponer el puerto de Remix
EXPOSE 3000

# Iniciar la aplicación
CMD ["npm", "run", "start"] 