document.getElementById("loginButton").addEventListener("submit", function (event) {
    event.preventDefault();

    const username = document.getElementById("loginUsername").value;
    const password = document.getElementById("loginPassword").value;
    const messageElement = document.getElementById("message");
    
    if (!username || !password) {
        messageElement.textContent = "Both username and password are required.";
        messageElement.classList.add('error');
        messageElement.classList.remove('success');
        return;
    }

    console.log('Attempting login with:', { username, password });

    fetch('https://fakestoreapi.com/auth/login', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            username: username,
            password: password
        })
    })
    .then(res => {
        if (!res.ok) {
            throw new Error(`Login failed with status ${res.status}`);
        }
        return res.json();
    })
    .then(data => {
        messageElement.style.display = 'block'; 
        if (data.token) {
            console.log("Login successful: ", data);
            localStorage.setItem("token", data.token);
            
            document.getElementById("loginIcon").style.display = "none"; 
            document.getElementById("logoutButton").style.display = "block";
            
            messageElement.textContent = "Login successful!";
            messageElement.classList.add('success');
            messageElement.classList.remove('error');
            
            setTimeout(() => {
                window.location.href = "./index.html";
            }, 1000); 
        } else {
            console.error("Error: Token is null");
            messageElement.textContent = "Login failed. Please check your credentials.";
            messageElement.classList.add('error');
            messageElement.classList.remove('success');
        }
    })
    .catch(error => {
        messageElement.style.display = 'block'; 
        console.error("Error during login:", error);
        messageElement.textContent = "An error occurred while logging in. Error details: " + error.message;
        messageElement.classList.add('error');
        messageElement.classList.remove('success');
    });
});

fetch('https://fakestoreapi.com/users')
    .then(response => response.json())
    .then(users => {
        console.log('Registered users:', users);
    })
    .catch(error => {
        console.error('Error fetching users:', error);
    });
