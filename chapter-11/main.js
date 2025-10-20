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
    axios.get(`${API}/products/${idProduct}`).then((response) => {
        const data = response.data;
        document.getElementById("name").value = data.name;
        document.getElementById("price").value = data.price;
        document.getElementById("quantity").value = data.quantity;
        document.getElementById("category").value = data.category;
        document.getElementById("image").value = data.imageUrl;
    });
}
if (productAddForm) {
    productAddForm.addEventListener("submit", (e) => {
        e.preventDefault();
        addProduct();
    });
}
if (productEditForm) {
    productEditForm.addEventListener("submit", (e) => {
        e.preventDefault();
        updateProduct();
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

const addProduct = () => {
    axios.post(`${API}/products/`, {
        id: document.getElementById("id").value,
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        quantity: document.getElementById("quantity").value,
        category: document.getElementById("category").value,
        imageUrl: document.getElementById("image").value,
    }).then(() => {
        console.log("Thêm sản phẩm thành công!");
        alert("Thêm sản phẩm thành công!");
        window.location.replace("./index.html");
    }).catch(() => console.log("Thêm sản phẩm thất bại!"));
}

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

const deleteProduct = (id) => {
    const confirm = window.confirm("Bạn có chắc chắn muốn xóa sản phẩm này!");
    if (!confirm) return;
    axios.delete(`${API}/products/${id}`)
        .then(() => console.log(" Xóa sản phẩm thành công!"))
        .catch(() => console.log(" Xóa sản phẩm thất bại!"))
}
const renderProduct = () => {
    axios.get(`${API}/products`).then((reponse) => {
        if (!productList) return;
        productList.innerHTML = reponse.data.map(
            (item, index) =>
                `
            <tr>
                <td> ${index + 1}</td>
                <td> <img width="50" src="${item.imageUrl}" alt="${item.name}" /></td>
                <td> ${item.name}</td>
                <td> ${item.price}</td>
                <td> ${item.quantity}</td>
                <td> ${item.category}</td>
                <td>
                        <a href="./edit.html?id=${item.id}" class="btn btn-primary">Sửa</a>
                        <button class="btn btn-danger" onclick="deleteProduct('${item.id
                }')">Xóa</button>
                    </td>
            </tr>`
        ).join("");
    });
}
renderProduct();