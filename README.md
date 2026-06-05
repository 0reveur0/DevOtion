# DevOtion 🚀

DevOtion là một nền tảng cộng đồng mã nguồn mở (open-source) dành cho lập trình viên để chia sẻ, khám phá và viết các đánh giá (review) thực tế về công cụ phát triển phần mềm (Developer Tools).

Đây là giải pháp tập trung giúp các lập trình viên tránh bẫy marketing, tìm thấy công nghệ phù hợp nhất cho dự án của mình qua góc nhìn thực chiến của cộng đồng.

---

## 🌟 Tính Năng Nổi Bật (MVP Features)

- **GitHub Authentication Mock/Simulation**: Trải nghiệm đăng nhập bằng tài khoản Github để đồng bộ hoá profile.
- **Danh Mục Công Nghệ (Categories)**: Phân chia khoa học theo các lĩnh vực chính (Frontend, Backend, Database, DevOps, Cloud, Mobile, AI, Testing, Design).
- **Trang Công Cụ Chi Tiết (Tool Pages)**: Hiển thị tên, mô tả chi tiết, điểm đánh giá trung bình tích lũy từ cộng đồng và danh sách review chi tiết.
- **Hệ Thống Đánh Giá Thực Tế (Review System)**: Mỗi review bao gồm số sao (1-5), tiêu đề, nội dung trải nghiệm thực tế cùng thông tin tác giả.
- **Hệ Thống Thả Tim/Bình Chọn (Upvote System)**: Ủng hộ các review chất lượng cao. Mỗi tài khoản chỉ được upvote một lần duy nhất cho mỗi bài đánh giá.
- **Hồ Sơ Nhà Phát Triển (User Profiles)**: Hiển thị đóng góp của bạn, số lượng đánh giá đã viết, và tổng số upvotes nhận được từ cộng đồng.
- **Công Cụ Tìm Kiếm Tức Thì (Instant Search)**: Tìm kiếm nhanh chóng theo tên công cụ hoặc tên danh mục.

---

## 🛠️ Tech Stack Suggested

Ứng dụng được xây dựng trên một trong các tổ hợp công nghệ hiện đại nhất:
- **Frontend Framework**: React 18+ (Vite)
- **Programming Language**: TypeScript (Đảm bảo an toàn kiểu dữ liệu chặt chẽ)
- **Styling UI**: Tailwind CSS (Thiết kế phong cách tối giản kiểu GitHub)
- **Component Libraries / Animation**: Radix UI & Motion (`motion/react`)
- **Icons Resource**: Lucide React

---

## 📂 Tổ Chức Code (Project Structure)

Cấu trúc mã nguồn được phân biệt mạch lạc, hỗ trợ mở rộng và đóng góp dễ dàng:

```bash
/src
  ├── components/          # Toàn bộ UI components (Sidebar đóng góp, ToolCard, Review Form,...)
  ├── data/                # Dữ liệu mẫu ban đầu về tools, reviews và profiles
  ├── types.ts             # Định nghĩa Type-safety cốt lõi của hệ thống
  ├── App.tsx              # Component tổng quan định tuyến và Layout trung tâm
  └── main.tsx             # Entrypoint khởi tạo ứng dụng React
```

---

## 🤝 Đóng Góp Phát Triển

Dự án này hoàn toàn mã nguồn mở! Chúng tôi luôn hoan nghênh sự đóng góp của cộng đồng. Vui lòng đọc kỹ tài liệu [CONTRIBUTING.md](./CONTRIBUTING.md) để bắt đầu.

### 🏷️ Nhãn Phổ Biến (Issue Labels for Contributors)
- `good first issue`: Cho phép lập trình viên mới làm quen nhanh với codebase.
- `help wanted`: Cần cộng đồng chung tay đóng góp xử lý những bài toán hóc búa.
- `bug`: Sửa đổi các lỗi phát sinh trong UI hoặc xử lý logic.
- `enhancement`: Thêm mới các tính năng hoặc cải thiện trải nghiệm người dùng.
