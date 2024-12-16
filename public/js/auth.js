document.getElementById('login-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful');
        window.location.href = '/index.html';
    } else {
        alert(data.error);
    }
});

document.getElementById('register-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (response.ok) {
        alert('Registration successful');
        window.location.href = '/login.html';
    } else {
        alert(data.error);
    }
});
