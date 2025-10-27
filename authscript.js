const firebaseConfig = { /* Paste your config */ };
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

async function login() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const loginStatus = document.getElementById('loginStatus');
    try {
        await auth.signInWithEmailAndPassword(email, password).catch(() => auth.createUserWithEmailAndPassword(email, password));
        loginStatus.textContent = 'Logged in!';
    } catch (error) {
        loginStatus.textContent = `Error: ${error.message}`;
    }
}

auth.onAuthStateChanged(user => {
    if (user) document.getElementById('converter').style.display = 'block';
    else document.getElementById('converter').style.display = 'none';
});