// ===== التحقق قبل أي عملية =====
function requireLogin() {
    if (localStorage.getItem("stayLoggedOut") === "true") {
        alert("You are in guest mode. Please log in to perform this action!");
        return false;
    }
    if (localStorage.getItem("loggedIn") !== "true") {
        alert("You must log in to perform this action!");
        return false;
    }
    return true;
}

// ===== تسجيل الدخول =====
function login() {
    const username = document.querySelector('input[type="text"]').value;
    const password = document.querySelector('input[type="password"]').value;

    fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            localStorage.setItem("loggedIn", "true");
            localStorage.setItem("userId", data.userId);
            localStorage.removeItem("stayLoggedOut");
            window.location.href = "home.html";
        } else {
            alert("Invalid credentials");
        }
    });
}

// ===== تسجيل الخروج =====
function logout() {
    localStorage.removeItem("loggedIn");
    localStorage.removeItem("userId");
    window.location.href = "home.html";
}

// ===== البقاء مسجل الخروج =====
function stayLoggedOut() {
    localStorage.setItem("stayLoggedOut", "true");
    window.location.href = "home.html";
}
function clearCart() {
    if(confirm("Are you sure you want to clear your cart?")) {
        localStorage.removeItem("cart"); // يمسح السلة بالكامل
        alert("Cart has been cleared!");
        // لو عايز تحدث الصفحة تلقائيًا بعد المسح:
        // location.reload();
    }
}
