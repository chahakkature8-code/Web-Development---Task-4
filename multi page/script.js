// ===== TO-DO LIST =====

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    const list = document.getElementById("taskList");
    if (!list) return;

    list.innerHTML = "";

    tasks.forEach((task, index) => {
        list.innerHTML += `
        <li>
            ${task}
            <button onclick="deleteTask(${index})">
                Delete
            </button>
        </li>`;
    });
}

function addTask() {
    const input = document.getElementById("taskInput");
    if (!input || input.value.trim() === "") {
        alert("Enter a task");
        return;
    }

    tasks.push(input.value.trim());
    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    displayTasks();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

// ===== PRODUCTS =====

const products = [
    { name:"Laptop", category:"Electronics", price:50000, rating:4.5 },
    { name:"Mobile", category:"Electronics", price:25000, rating:4.3 },
    { name:"Headphones", category:"Electronics", price:3000, rating:4.4 },
    { name:"Shoes", category:"Fashion", price:2000, rating:4.8 },
    { name:"T-Shirt", category:"Fashion", price:800, rating:4.2 }
];

function displayProducts(items) {
    const container = document.getElementById("productContainer");
    if (!container) return;

    container.innerHTML = "";

    items.forEach(product => {
        container.innerHTML += `
        <div class="product-card">
            <h3>${product.name}</h3>
            <p>${product.category}</p>
            <p>₹${product.price}</p>
            <p>⭐ ${product.rating}</p>
        </div>`;
    });
}

function updateProducts() {
    let filtered = [...products];

    const search =
        document.getElementById("searchInput")?.value.toLowerCase() || "";

    const category =
        document.getElementById("categoryFilter")?.value || "all";

    const sort =
        document.getElementById("sortOption")?.value || "";

    filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search)
    );

    if (category !== "all") {
        filtered = filtered.filter(
            product => product.category === category
        );
    }

    if (sort === "low")
        filtered.sort((a, b) => a.price - b.price);

    if (sort === "high")
        filtered.sort((a, b) => b.price - a.price);

    displayProducts(filtered);
}

// ===== PAGE LOAD =====

document.addEventListener("DOMContentLoaded", () => {

    if (document.getElementById("taskList"))
        displayTasks();

    if (document.getElementById("productContainer")) {
        displayProducts(products);

        document.getElementById("searchInput")
            ?.addEventListener("keyup", updateProducts);

        document.getElementById("categoryFilter")
            ?.addEventListener("change", updateProducts);

        document.getElementById("sortOption")
            ?.addEventListener("change", updateProducts);
    }
});