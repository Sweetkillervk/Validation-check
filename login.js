// Handle login form submission
function handleLogin(event) {
  event.preventDefault();

  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  // Check if the email and password are stored in localStorage
  const storedUser = JSON.parse(localStorage.getItem(email));

  if (storedUser && storedUser.password === password) {
    // Check if the email is already logged in on another device
    if (localStorage.getItem('currentLogin') === email) {
      alert("You are already logged in on another device.");
      return;
    }

    // Log the user in and save the current login status
    localStorage.setItem('currentLogin', email);
    document.getElementById('loginForm').style.display = 'none'; // Hide the login form
    document.getElementById('welcomeButton').style.display = 'block'; // Show the "Welcome" button
  } else {
    alert("Invalid email or password.");
  }
}

// Optional: Logout and clear login status
function logout() {
  const email = localStorage.getItem('currentLogin');
  if (email) {
    localStorage.removeItem('currentLogin');
    alert("Logged out successfully.");
    window.location.reload(); // Reload the page to reset everything
  }
}

// Optional: Check if the user is already logged in when the page loads
window.onload = function() {
  const currentLogin = localStorage.getItem('currentLogin');
  if (currentLogin) {
    alert("You are already logged in.");
    document.getElementById('welcomeButton').style.display = 'block'; // Show the "Welcome" button if logged in
    document.getElementById('loginForm').style.display = 'none'; // Hide the login form if already logged in
  }

  // Predefined email-password pairs (for testing or admin management)
  addPredefinedUsers();
}

// Function to add predefined users
function addPredefinedUsers() {
  const predefinedUsers = [
    { email: "user1@example.com", password: "1234" },
    { email: "user2@example.com", password: "12345" }
  ];

  // Add each user to localStorage
  predefinedUsers.forEach(user => {
    if (!localStorage.getItem(user.email)) {
      localStorage.setItem(user.email, JSON.stringify(user));
    }
  });
}

// Optionally, manually add a new user (to be used by admin)
function addUserManually(email, password) {
  const newUser = { email: email, password: password };
  if (!localStorage.getItem(email)) {
    localStorage.setItem(email, JSON.stringify(newUser));
    alert("New user added: " + email);
  } else {
    alert("User already exists: " + email);
  }
}