import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;
const DATA_FILE = path.join(__dirname, 'db.json');

// Middleware
app.use(cors());
app.use(express.json());

// Đảm bảo file db.json tồn tại
if (!fs.existsSync(DATA_FILE)) {
  fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2));
  console.log('Đã tạo file db.json mới');
}

// Đọc dữ liệu từ file
const readWishes = () => {
  try {
    const data = fs.readFileSync(DATA_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Lỗi khi đọc file:', error);
    return [];
  }
};

// Ghi dữ liệu vào file
const writeWishes = (wishes) => {
  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(wishes, null, 2));
    return true;
  } catch (error) {
    console.error('Lỗi khi ghi file:', error);
    return false;
  }
};

// API: Lấy tất cả lời chúc
app.get('/api/wishes', (req, res) => {
  const wishes = readWishes();
  res.json(wishes);
});

// API: Thêm lời chúc mới
app.post('/api/wishes', (req, res) => {
  const { author, content } = req.body;

  if (!author || !content) {
    return res.status(400).json({ error: 'Vui lòng điền đầy đủ thông tin' });
  }

  const wishes = readWishes();
  const newWish = {
    id: wishes.length > 0 ? Math.max(...wishes.map(w => w.id)) + 1 : 1,
    title: 'Lời Tri Ân',
    author: author.trim(),
    content: content.trim(),
    date: new Date().toLocaleDateString('vi-VN')
  };

  wishes.unshift(newWish); // Thêm vào đầu mảng
  writeWishes(wishes);

  res.status(201).json(newWish);
});

// API: Xóa lời chúc (tùy chọn)
app.delete('/api/wishes/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const wishes = readWishes();
  const filteredWishes = wishes.filter(w => w.id !== id);
  
  if (wishes.length === filteredWishes.length) {
    return res.status(404).json({ error: 'Không tìm thấy lời chúc' });
  }

  writeWishes(filteredWishes);
  res.json({ message: 'Đã xóa lời chúc thành công' });
});

app.listen(PORT, () => {
  console.log(`Server đang chạy tại http://localhost:${PORT}`);
});

