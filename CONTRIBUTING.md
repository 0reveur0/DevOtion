# Hướng Dẫn Đóng Góp Vào DevOtion 🤝

Chào mừng bạn đến với cộng đồng mã nguồn mở **DevOtion**! Chúng tôi trân trọng mỗi đóng góp của bạn để phát triển ứng dụng này trở thành cổng thông tin review uy tín nhất dành cho các kỹ sư lập trình.

Bản hướng dẫn này sẽ giúp bạn hiểu rõ quy trình làm việc và quy chuẩn chung của dự án.

---

## 🚀 Quy trình Đóng Góp Cơ Bản

### 1. Tìm Issue hoặc Đề xuất Issue Mới
- Kiểm tra danh sách **Issues** hiện có trong ứng dụng để tìm các nhãn như `good first issue` hoặc `help wanted`.
- Nếu phát hiện lỗi mới hoặc muốn đề xuất cải tiến, vui lòng gửi phản hồi qua hệ thống đóng góp của cộng đồng.

### 2. Quy Chuẩn Code (Coding Standards)
- **TypeScript**: Giữ vững an toàn kiểu dữ liệu. Tránh sử dụng kiểu `any`. Mọi interface và Type chung phải được định nghĩa trong `/src/types.ts`.
- **CSS / Styling**: Sử dụng 100% Tailwind CSS classes. Không tạo thêm file CSS phụ trừ phi được yêu cầu. Giữ thiết kế chuẩn minimalist tương tự phong cách GitHub (viền mỏng, khoảng trống tinh hoa, nền dịu, độ tương phản cao).
- **Icons**: Nhập trực tiếp từ thư viện `lucide-react`. Không viết Custom SVG.
- **Components**: Chia nhỏ code thành các view components chức năng nhỏ trong `/src/components/*` thay vì dồn tất cả vào `App.tsx`.

---

## 🏷️ Các Nhãn (Labels) Chúng Tôi Sử Dụng

Khi bắt đầu đóng góp lần đầu tiên, hãy tìm kiếm các nhãn sau:
- 🟢 **`good first issue`**: Các bài toán thiết kế nhỏ, sửa lỗi chính tả, hoặc giao diện cơ bản lý tưởng cho người mới làm quen.
- 🔵 **`enhancement`**: Tính năng hoặc luồng nâng cấp mới.
- 🔴 **`bug`**: Khắc phục các lỗi tính toán, lọc danh mục hay sự cố hiển thị.
- 🟡 **`documentation`**: Sửa đổi README.md, dịch thuật hoặc bổ sung hướng dẫn cài đặt.

---

## 📝 Đề xuất Thêm Công Nghệ Mới (Manage Tools)

Theo bộ quy chuẩn vận hành của DevOtion:
- **Người dùng phổ thông không thể tự do tạo các công cụ mới** trên nền tảng nhằm tránh spam và rác dữ liệu.
- Việc đề xuất thêm công cụ mới (ví dụ: một dịch vụ cloud mới hay thư viện testing mới) được thực hiện thông qua tab **Open Source Workspace / GitHub Contribution Panel** nằm trực tiếp trong dashboard của ứng dụng này.
- Khi quản trị viên phản hồi tích cực và cập nhật vào file cấu trúc, công cụ mới sẽ chính thức hiển thị đến cộng đồng.

---

Cảm ơn bạn đã đồng hành cùng cộng đồng DevOtion chúc bạn có những giây phút coding tuyệt vời! 🎉
