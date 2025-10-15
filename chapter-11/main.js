const API = `http://localhost:3000`;
const axios = window.axios;
const productList = document.getElementById("productList");
const productAddForm = document.getElementById("productAddForm");
const productEditForm = document.getElementById("productEditForm");
const signupForm = document.getElementById("signupForm");
const signinForm = document.getElementById("signinForm");
const userInfo = document.getElementById("user-info");

const idProduct = new URLSearchParams(window.location.search).get("id");

if (userInfo) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
        window.location.replace("./signin.html");
    }
    userInfo.innerHTML = `
            <span class="me-2" id="user">${user.email}</span>
            <button class="btn btn-primary" onclick="logout()">Đăng xuất</button>
    `;
}
if (idProduct) {
    // lấy id từ url và call API lấy dữ liệu sản phẩm theo id
    axios.get(`${API}/${idProduct}`).then((data) => {
        // đổ dữ liệu vào form
        document.getElementById("name").value = data.name;
        document.getElementById("price").value = data.price;
        document.getElementById("quantity").value = data.quantity;
        document.getElementById("category").value = data.category;
        document.getElementById("image").value = data.imageUrl;
    });
}
if (productEditForm) {
    productEditForm.addEventListener("submit", (e) => {
        e.preventDefault();
        updateProduct();
    });
}
if (productAddForm) {
    productAddForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addProduct();
    });
}
if (signupForm) {
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        signup();
    });
}
if (signinForm) {
    signinForm.addEventListener("submit", (e) => {
        e.preventDefault();
        signin();
    });
}


const signup = () => {
    axios
        .post(`${API}/signup`, {
            username: document.getElementById("username").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        })
        .then(() => {
            console.log("Đăng ký thành công");
            window.location.replace("./signin.html");
        })
        .catch(() => console.log("Thất bại!"));
};
const signin = () => {
    axios
        .post(`${API}/signin`, {
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
        })
        .then((response) => {
            console.log(response.data.user);
            localStorage.setItem("user", JSON.stringify(response.data.user));
            window.location.replace("./index.html");
        })
        .catch(() => console.log("Thất bại!"));
};

const logout = () => {
    localStorage.removeItem("user");
    window.location.replace("./signin.html");
};
const updateProduct = () => {
    axios
        .put(`${API}/products/${idProduct}`, {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            quantity: document.getElementById("quantity").value,
            category: document.getElementById("category").value,
            imageUrl: document.getElementById("image").value,
        })
        .then(() => {
            console.log("Cập nhật sản phẩm thành công");
            window.location.href = "./index.html";
        })
        .catch(() => console.log("Thất bại!"));
};
const addProduct = () => {
    // call API thêm sản phẩm
    axios
        .post(`${API}/products/`, {
            name: document.getElementById("name").value,
            price: document.getElementById("price").value,
            quantity: document.getElementById("quantity").value,
            category: document.getElementById("category").value,
            imageUrl: document.getElementById("image").value,
        })
        .then(() => {
            console.log("Thêm sản phẩm thành công");
            window.location.href = "./index.html";
        })
        .catch(() => console.log("Thất bại!"));
};
const deleteProduct = (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này không?");
    if (!confirm) return;
    axios
        .delete(`${API}/products/${id}`)
        .then(() => console.log("Xóa sản phẩm thành công"))
        .catch(() => console.log("Thất bại!"));
};
const renderProduct = () => {
    // lấy danh sách sản phẩm

    axios.get(`${API}/products`).then((response) => {
        if (!productList) return;
        productList.innerHTML = response.data
            .map(
                (item, index) => `
                <tr>
                    <td>${index + 1}</td>
                    <td><img width="50" src="${item.imageUrl}" alt="${item.name}" /></td>
                    <td>${item.name}</td>
                    <td>${item.price}</td>
                    <td>${item.quantity}</td>
                    <td>${item.category}</td>
                    <td>
                        <a href="./edit.html?id=${item.id}" class="btn btn-primary">Sửa</a>
                        <button class="btn btn-danger" onclick="deleteProduct('${item.id
                    }')">Xóa</button>
                    </td>
                </tr>
            `
            )
            .join("");
    });
};
renderProduct();
// npm i -D json-server@0.17.4 json-server-auth