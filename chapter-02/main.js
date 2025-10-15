function sum(a, b) {
    // validate
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error(" Lỗi: a và b không phải là số");
    }
    // logic
    const result = a + b;
    // return
    return result;
}
console.log(`function name: ${sum(10, 20)}`);
// function expresstion
const sum2 = function (a, b) {
    return a + b;
}
console.log(`function expresstion: ${sum2(10, 20)}`)
//arrow function
const sum3 = (a, b) => a + b;
console.log(`arrow function: ${sum3(10, 20)}`);

// Bài 1 – Tính tổng tiền hàng
// 	•	Viết hàm calculateTotal dưới dạng arrow function.
// 	•	Hàm nhận vào một object có 2 thuộc tính: price (giá sản phẩm) và quantity (số lượng).
// 	•	Trả về tổng tiền = price * quantity.

const product1 = {
    price: 10000,
    quantity: 10
}
const product2 = {
    price: 20000,
    quantity: 100
}
const calculateTotal = (product) => {
    //validate 
    if (typeof product !== 'object') {
        throw new Error('product phải là 1 obj');
    }
    if (typeof product.price !== 'number' || typeof product.quantity !== 'number') {
        throw new Error('price and quantity khong phai la so');
    }
    //return
    return product.price * product.quantity;
}
console.log(calculateTotal(product1));
console.log(calculateTotal(product2));

// Bài 2 – Tính giá sau khuyến mãi (Arrow Function + Object)
// 	•	Viết hàm applyDiscount dưới dạng arrow function.
// 	•	Hàm nhận vào một object gồm: price (giá gốc), discountPercent (phần trăm giảm giá).
// 	•	Trả về giá sau khuyến mãi = price – (price * discountPercent / 100).
// 	•	Lưu ý: Xử lý khi discountPercent lớn hơn 100 hoặc nhỏ hơn 0.


const pro1 = {
    price: 10000,
    discountPercent: 10
}
const pro2 = {
    price: 10000,
    discountPercent: 50
}
const applyDiscount = (pro) => {
    if (typeof pro !== 'object') {
        throw new Error("Lỗi product phải là 1 obj");
    }
    if (typeof pro.price !== 'number' || typeof pro.discountPercent !== 'number') {
        throw new Error("Lỗi: price and discountPercent phải là số");
    }
    // return 
    return pro.price - (pro.price * pro.discountPercent / 100);
}
console.log('Giá sau Khuyến mãi là:', applyDiscount(pro1));
console.log('Giá sau Khuyến mãi là:', applyDiscount(pro2));

// Bài 3 – Tính phí vận chuyển
// 	•	Viết hàm calculateShipping dưới dạng arrow function.
// 	•	Hàm nhận vào một object gồm: totalPrice (tổng tiền đơn hàng sau giảm giá) và location (địa chỉ giao hàng).
// 	•	Quy tắc tính phí:
// 	•	Nếu totalPrice ≥ 500,000 → phí = 0.
// 	•	Nếu totalPrice < 500,000 thì:
// 	•	location = "noi-thanh" → phí = 30,000.
// 	•	location = "ngoai-thanh" → phí = 50,000.
// 	•	Lưu ý: Trường hợp nhập sai location thì phải báo lỗi hoặc trả về thông báo hợp lệ.
//  */

const totalPrice1 = {
    sum: 200000,
    location: 'ngoai-thanh'
}
const calculateShipping = (totalPrice) => {
    if (typeof totalPrice !== 'object') {
        throw new Error("totalPrice phải là 1 obj");
    }
    if (typeof totalPrice.sum !== 'number' || typeof totalPrice.location !== 'string') {
        throw new Error('sai dinh dang');
    }
    let phi = 0;
    if (totalPrice.sum >= 500000) {
        phi = totalPrice.sum + 0;
    } else if (totalPrice.sum < 500000) {
        if (totalPrice.location == 'noi-thanh') {
            phi = totalPrice.sum + 30000;
        } else if (totalPrice.location == 'ngoai-thanh') {
            phi = totalPrice.sum + 50000;
        } else {
            throw new Error('err');
        }
    }
    else {
        throw new Error('err');
    }
    return tong;


}
console.log(calculateShipping(totalPrice1));