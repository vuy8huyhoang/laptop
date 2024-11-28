import Button from "../../components/button";

export default function Home() {
    // Khai báo biến, hằng
    const name = "Nguyễn Văn A";
    const age = 20;
    const lessons = ["Toán", "Lý", "Hóa", "Sinh"];
    const students = [
        { name: "Nguyễn Văn A", age: 20 },
        { name: "Nguyễn Văn B", age: 21 },
        { name: "Nguyễn Văn C", age: 22 }
    ];

    return (
        <div className="container mx-auto">
            <h1>Đây là ví dụ về tái sử dụng component</h1>
            <Button content="Lùi về" />
            <Button content="Tiếp theo" />
            <h1>Thông tin cá nhân</h1>
            <p>Tên: {name}</p>
            <p>Tuổi: {age}</p>
            <h1>Các môn học</h1>
            <ul>
                {lessons.map((lesson, index) => (
                    <li key={index}>{lesson}</li>
                ))}
            </ul>
            <h1>Danh sách sinh viên</h1>
            <table>
                <thead>
                    <tr>
                        <th>Tên</th>
                        <th>Tuổi</th>
                    </tr>
                </thead>
                <tbody>
                    {students.map((student, index) => (
                        <tr key={index}>
                            <td>{student.name}</td>
                            <td>{student.age}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
