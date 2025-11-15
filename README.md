# Tri Ân Thầy Cô - Teacher Tribute App

Ứng dụng web để gửi lời tri ân đến thầy cô giáo.

## Cấu trúc dự án

- `client/` - Frontend React + TypeScript + Vite
- `server/` - Backend Express.js

## Cài đặt và chạy

### 1. Cài đặt dependencies cho Client

```bash
cd client
npm install
```

### 2. Cài đặt dependencies cho Server

```bash
cd server
npm install
```

### 3. Chạy Server (Terminal 1)

```bash
cd server
npm start
```

Server sẽ chạy tại `http://localhost:3001`

### 4. Chạy Client (Terminal 2)

```bash
cd client
npm run dev
```

Client sẽ chạy tại `http://localhost:5173`

## Tính năng

- ✅ Gửi lời tri ân với tên và nội dung
- ✅ Xem tất cả lời chúc đã gửi
- ✅ Lưu trữ dữ liệu trên server (không mất khi reload)
- ✅ Giao diện đẹp với animations và gradients
- ✅ Responsive design

## API Endpoints

- `GET /api/wishes` - Lấy tất cả lời chúc
- `POST /api/wishes` - Thêm lời chúc mới
- `DELETE /api/wishes/:id` - Xóa lời chúc (tùy chọn)

## Dữ liệu

Dữ liệu được lưu trong file `server/db.json`

**Lưu ý:** Bạn có thể xóa hoặc chỉnh sửa file `db.json` để quản lý dữ liệu. File này sẽ được tự động tạo khi server chạy lần đầu nếu chưa tồn tại.

