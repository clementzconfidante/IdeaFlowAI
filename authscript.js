const firebaseConfig = { /* Paste your config */ };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// --- NEW FUNCTION TO HANDLE BOTH LOGIN AND SIGNUP ---
async function handleAuth() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginStatus = document.getElementById('loginStatus');
    loginStatus.textContent = 'Processing...';

    try {
        // 1. Try to sign the user in.
        await auth.signInWithEmailAndPassword(email, password);
        loginStatus.textContent = 'Successfully Logged In!';
        
    } catch (error) {
        // If sign-in fails, check the error code
        
        if (error.code === 'auth/user-not-found') {
            // 2. If the user doesn't exist, attempt to create the account.
            try {
                await auth.createUserWithEmailAndPassword(email, password);
                loginStatus.textContent = 'Account Created and Logged In!';
            } catch (signupError) {
                // Handle creation errors (e.g., weak password, invalid email)
                loginStatus.textContent = `Sign-up Error: ${signupError.message}`;
            }

        } else if (error.code === 'auth/wrong-password') {
             // Show a clear error for existing users
             loginStatus.textContent = 'Error: Incorrect password.';

        } else {
            // Handle all other errors (e.g., invalid email format, network issues)
            loginStatus.textContent = `Login Error: ${error.message}`;
        }
    }
}

auth.onAuthStateChanged(user => {
    if (user) {
        document.getElementById('converter').style.display = 'block';
        document.getElementById('loginStatus').textContent = `Logged in as ${user.email}`;
    }
    else {
        document.getElementById('converter').style.display = 'none';
        document.getElementById('loginStatus').textContent = 'Please log in to use the converter.';
    }
});
