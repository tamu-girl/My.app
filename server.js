const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('public'));

// 🔐 رمز ادمین اینجاست — کاربر نمی‌بینتش
const ADMIN_PASSWORD = '1234';

let products = [
  { id: 1, name: 'لپ‌تاپ', price: 25000000 },
  { id: 2, name: 'موبایل', price: 15000000 }
];

app.post('/api/login', (req, res) => {
  const { password } = req.body;
  if (password === ADMIN_PASSWORD) {
    res.json({ ok: true, message: 'خوش آمدی ادمین' });
  } else {
    res.json({ ok: false, message: 'رمز غلط است' });
  }
});

app.get('/api/products', (req, res) => {
  res.json(products);
});

app.post('/api/products', (req, res) => {
  const { password, name, price } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'دسترسی ندارید' });
  }
  const newProduct = { id: Date.now(), name, price: Number(price) };
  products.push(newProduct);
  res.json(newProduct);
});

app.delete('/api/products/:id', (req, res) => {
  const { password } = req.body;
  if (password !== ADMIN_PASSWORD) {
    return res.status(403).json({ error: 'دسترسی ندارید' });
  }
  products = products.filter(p => p.id !== Number(req.params.id));
  res.json({ ok: true });
});

// 🌐 مهم برای Render.com — پورت رو از محیط می‌خونه
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log('سرور روی پورت ' + PORT));
                       
