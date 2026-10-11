# 💍 Thiệp cưới online

## Chạy project
1. Mở thư mục bằng VS Code.
2. Mở `index.html` bằng trình duyệt.
3. Có thể dùng Live Server trong VS Code để xem tốt hơn.

## Cấu trúc
- `index.html` — nội dung thiệp
- `style.css` — giao diện + responsive + animation
- `script.js` — countdown, nhạc, RSVP demo, hiệu ứng cánh hoa
- `assets/` — ảnh và nhạc

## Thay thông tin
Trong `index.html`, thay:
- Tên cô dâu
- Tên chú rể
- Ngày giờ
- Địa điểm
- Link bản đồ
- Nội dung câu chuyện

Trong `script.js`, sửa:
`WEDDING_DATE = new Date("2026-11-28T17:30:00+07:00")`

## Ảnh
Đặt các file:
- `assets/hero.jpg`
- `assets/couple.jpg`
- `assets/photo-1.jpg`
- `assets/photo-2.jpg`
- `assets/photo-3.jpg`
- `assets/photo-4.jpg`

## Nhạc
Đặt file:
`assets/music.mp3`

Lưu ý: trình duyệt thường chặn autoplay, vì vậy website có nút ♫ để khách chủ động bật nhạc.

## RSVP thật
Hiện form chỉ hiển thị thông báo ở phía trình duyệt.
Nếu muốn lưu danh sách khách mời, có thể nối form với Google Sheets, Firebase, Supabase hoặc ASP.NET Web API.
