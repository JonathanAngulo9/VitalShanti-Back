# VitalShanti-Back

Este es el backend de VitalShanti. Provee la API REST para el manejo de usuarios, autenticación y rutinas de yoga. Utiliza Express, Prisma (ORM) y PostgreSQL.

---

## 📦 Tecnologías
- Node.js
- Express
- Prisma
- PostgreSQL (Railway)
- Swagger (para documentación)

---

## 🚀 Instrucciones para ejecutar el backend

### 1. Clonar el repositorio
```bash
git clone https://github.com/TU-USUARIO/VitalShanti-Back.git
cd VitalShanti-Back
```

### 2. Instalar dependencias
```bash
npm install
```

### 3. Crear archivo .env
Aun no es requerido

### 4. Inicializar Prisma (aun no)
```bash
npx prisma generate
npx prisma migrate dev --name init
```
Nota: usamos "/data/users.js" para validar datos

### 5. Ejecutar el servidor
```bash
npm run dev
```

Servidor disponible en: 'http://localhost:3000'

### Documentación API (Swagger) --en desarrollo--
Visible en: 'http://localhost:3000/api/docs
'
