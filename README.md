# Herramienta de Gestión Documental Web

## Resumen
Este proyecto tiene como objetivo crear una plataforma web para la gestión, evaluación y aprobación de documentos. El sistema permite a los usuarios subir documentos para ser revisados, evaluados y comentados por supervisores o evaluadores. Esta herramienta es útil en distintos ámbitos como la entrega de trabajos académicos, procesos administrativos y mucho más.

## Funcionalidades
- **Usuarios regulares**: Subida y gestión de documentos, seguimiento de plazos y recepción de retroalimentación.
- **Supervisores**: Creación de actividades, evaluación de documentos, aprobación o rechazo, y comentarios sobre los archivos enviados.
  
El sistema mejora la eficiencia, reduce tiempos de espera y promueve la sostenibilidad al disminuir el uso de papel.

## Motivación
La idea de esta plataforma surge de la necesidad de centralizar el manejo de documentos en procesos burocráticos o educativos. Facilita tanto la entrega como la revisión de documentos en un único lugar, optimizando la interacción entre usuarios y evaluadores.

## Objetivos
- Facilitar la gestión documental tanto para usuarios que suben documentos como para aquellos que los evalúan.
- Reducir el uso de papel y mejorar la organización y los tiempos de respuesta en procesos de revisión.

## Metodología
Este proyecto ha sido desarrollado usando la metodología ágil **Scrum**, con iteraciones y sprints adaptados a un trabajo unipersonal. Las fases clave de desarrollo fueron:

1. **Análisis del sistema**
2. **Diseño de la base de datos y modelado del sistema**
3. **Desarrollo del front-end y back-end**
4. **Integración de la gestión de archivos a través de una API**
5. **Pulido de la interfaz y funcionalidades finales**
6. **Documentación y manual de uso**

## Tecnologías Utilizadas

### Servidor Back-end
- **Node.js**: Plataforma de servidor basada en JavaScript, diseñada para construir aplicaciones escalables.
- **JavaScript**: Lenguaje de programación utilizado tanto en el servidor como en el cliente.
- **MySQL**: Sistema de gestión de bases de datos relacional.
- **Sequelize**: ORM para la comunicación con la base de datos.
- **Cloudinary**: Plataforma para la gestión de archivos multimedia en la nube.

### Cliente Front-end
- **Angular**: Framework para el desarrollo de aplicaciones web front-end basado en TypeScript.
- **TypeScript**: Lenguaje de programación que facilita el desarrollo con Angular gracias a sus características orientadas a clases y tipado estático.
- **Angular Material**: Librería de componentes UI utilizada para mejorar la experiencia del usuario.

## Instalación y Uso

### Requisitos previos
- **Node.js** y **npm** instalados en tu entorno de desarrollo.
- Base de datos MySQL configurada.

### Pasos de instalación
1. Clona este repositorio:
   ```bash
   git clone https://github.com/tu-usuario/nombre-del-repo.git
2. Instala las dependencias:
  ```bash
npm install
4. Configura la base de datos MySQL en el archivo de configuración y ejecuta las migraciones de Sequelize:
   ```bash
npx sequelize db:migrate
5. Inicia el servidor:
   ```bash
npm start


Uso
Accede a la aplicación desde tu navegador en http://localhost:3000 y utiliza las credenciales proporcionadas para probar las distintas funcionalidades del sistema.

