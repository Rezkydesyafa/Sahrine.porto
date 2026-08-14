# Sahrine Estari Ditara — React Portfolio

Versi React dari portofolio Sahrine Estari Ditara dengan UI yang dipertahankan
dari versi HTML/CSS sebelumnya. Animasi masuk dibuat menggunakan Framer Motion.

## Menjalankan proyek

Pastikan Node.js versi 22 atau lebih baru sudah terpasang.

```bash
npm install
npm run dev
```

Kemudian buka alamat lokal yang ditampilkan pada terminal.

## Struktur utama

- `app/page.jsx` — halaman React dan konfigurasi animasi Framer Motion.
- `public/portfolio/index.html` — sumber markup, CSS, ikon SVG, dan foto yang
  digunakan agar tampilan tetap identik dengan versi sebelumnya.
- `app/layout.tsx` — metadata halaman.
- `app/globals.css` — pengaturan dasar halaman React.

## Animasi

Framer Motion digunakan untuk memberikan animasi ringan pada hero, foto profil,
setiap bagian konten, dan navigation dock. Pengguna dengan pengaturan
`prefers-reduced-motion` tidak akan dipaksa melihat animasi.

## Build produksi

```bash
npm run build
```
