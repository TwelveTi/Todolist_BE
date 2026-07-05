# Todo List Backend

Backend Node.js Express API cho ứng dụng Todo List. API dùng Sequelize để kết nối MySQL và cung cấp CRUD task cho frontend React Vite.

## Công nghệ

- Node.js
- Express
- Sequelize
- MySQL
- CORS
- Helmet
- Express Rate Limit

## Cấu trúc chính

```txt
BE
├── index.js
└── src
    ├── configs/database.js
    ├── controllers/taskController.js
    ├── middlewares
    ├── models/taskModel.js
    ├── routes
    ├── services/taskService.js
    └── utils
```

## Cài đặt

```bash
npm install
```

## Cấu hình môi trường

Tạo file `.env` trong thư mục `BE`. Có thể copy từ `.env.example`:

```env
PORT=3000
HOST_NAME=localhost

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=todolist
DB_PORT=3306

FRONTEND_URL=http://localhost:5173
```

Trong đó:

- `PORT`: port chạy backend.
- `HOST_NAME`: hostname backend.
- `DB_*`: thông tin kết nối MySQL.
- `FRONTEND_URL`: URL frontend được phép gọi API.

## Tạo database

Sequelize trong dự án chỉ tự tạo/cập nhật table, không tự tạo database. Vì vậy cần tạo database MySQL trước khi chạy backend.

Cách 1: chạy file SQL có sẵn:

```bash
mysql -u root -p < database.sql
```

Cách 2: chạy trực tiếp trong MySQL:

```sql
CREATE DATABASE IF NOT EXISTS todolist
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Tên database phải trùng với `DB_NAME` trong file `.env`.

## Chạy dự án

```bash
npm start
```

Server chạy tại:

```txt
http://localhost:3000
```

API prefix:

```txt
/api/v1
```

## Kiểm tra nhanh

```bash
npm test
```

Lệnh này chạy kiểm tra cú pháp các file backend chính.

## API Task

### GET `/api/v1/tasks`

Lấy danh sách task.

### GET `/api/v1/tasks/:id`

Lấy chi tiết một task theo `id`.

### POST `/api/v1/tasks`

Tạo task mới.

Body:

```json
{
  "title": "Tên công việc",
  "description": "Mô tả công việc",
  "status": false,
  "taskDate": "2026-07-05"
}
```

### PUT `/api/v1/tasks/:id`

Cập nhật task theo `id`. Có thể gửi một hoặc nhiều field:

```json
{
  "title": "Tên mới",
  "description": "Mô tả mới",
  "status": true,
  "taskDate": "2026-07-06"
}
```

### DELETE `/api/v1/tasks/:id`

Xóa task theo `id`.

## Model Task

```txt
id          integer, auto increment, primary key
title       string, required, max 120 characters
description text, required, max 500 characters
status      boolean, default false
taskDate    date only, format YYYY-MM-DD
createdAt   datetime
updatedAt   datetime
```

## Response format

Thành công:

```json
{
  "code": 200,
  "message": "Success message",
  "data": {}
}
```

Lỗi:

```json
{
  "code": 400,
  "message": "Error message"
}
```

## Xử lý lỗi

- API không tồn tại trả JSON `404`.
- Task không tồn tại trả `404`.
- Body thiếu field bắt buộc trả `400`.
- `title`, `description`, `taskDate`, `status` được validate ở service.
- Lỗi server nội bộ trả message chung `Internal server error`.

## Ghi chú database

Backend đang dùng:

```js
sequelize.sync({ alter: true })
```

Cấu hình này tiện cho môi trường học tập/dev vì Sequelize tự đồng bộ thay đổi model vào MySQL. Với production, nên thay bằng migration rõ ràng.
