# Gunakan image Node.js resmi
FROM node:18

# Set direktori kerja di dalam container
WORKDIR /usr/src/app

# Salin file package.json dan package-lock.json ke dalam container
COPY package*.json ./

# Instal dependensi
RUN npm install

# Salin semua file ke dalam container
COPY . .

# Ekspose port default untuk aplikasi (ubah jika perlu)
EXPOSE 3000

# Perintah untuk menjalankan aplikasi
CMD ["npm", "start"]
