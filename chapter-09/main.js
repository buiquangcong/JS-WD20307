// function display(name) {
//     console.log(`Xin chào ${name}`);
// }
// function showName(name, callback) {
//     callback(name);
// }
// showName("Đạt", display);

// /**
//  * 	1.	Viết hàm calculate(a, b, callback):
//     Nhận vào 2 số a, b.
//     Nhận vào một callback để quyết định phép tính (cộng, trừ, nhân, chia).
//     Trả về kết quả phép tính.
//     2.	Thử gọi với 2 số: 10 và 5.
//     •	Callback cộng → ra 15
//     •	Callback trừ → ra 5
//     •	Callback nhân → ra 50
//     •	Callback chia → ra 2
//  */

// function calculate(a, b, callback) {
//     callback(a, b);
// }
// function tong(a, b) {
//     console.log(a + b);
// }
// function tru(a, b) {
//     console.log(a - b);
// }
// function nhan(a, b) {
//     console.log(a * b);
// }
// function chia(a, b) {
//     console.log(a / b);
// }
// calculate(10, 5, tong);
// calculate(10, 5, tru);
// calculate(10, 5, nhan);
// calculate(10, 5, chia);


function getData(callback) {
    console.log("Lấy dữ liệu sinh viên...");
    setTimeout(() => {
        let data = "Danh sách sinh viên";
        callback(data);
    }, 2000);
}
function showData(result) {
    console.log("Dữ liệu đã lấy được: " + result);
}
getData(showData);