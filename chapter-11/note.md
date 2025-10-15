## Khởi tạo project

```bash
npm init -y
```

## Cài đặt json-server và json-server-auth

```bash
npm install -D json-server json-server-auth
```

## Tạo file db.json

```json
{
    "products": [
        {
            "id": 1,
            "title": "Áo nỉ 2025",
            "quantity": 30,
            "imageUrl": "https://product.hstatic.net/200000690725/product/19334a78-6cbb-4bbb-abeb-31088b5578ff_ea4d8d95d7fe424297ad95179a26f18b_master.jpg",
            "category": "Áo"
        },
        {
            "id": 2,
            "title": "Quần nỉ 2025",
            "quantity": 45,
            "imageUrl": "https://product.hstatic.net/200000690725/product/1919f653-adbf-4171-9302-8e857c103d59_bce4a23d192f430e8be21361859e674f_master.jpg",
            "category": "Quần"
        }
    ],
    "users": [
        {
            "email": "admin@gmail.com",
            "password": "$2a$10$0PGbJ7CqHLY0V7MYJs.6euXWbIB.TsBW/1CjE1B54eOLMfhI7a7eq",
            "name": "admin",
            "id": 1
        }
    ]
}
```

## Chỉnh sửa file package.json

```json
{
    "scripts": {
        "dev:api": "json-server --watch db.json --port 3000"
    }
}
```

## Chạy server

```bash
npm run dev:api
```