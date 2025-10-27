async function convert() {
    const user = auth.currentUser;
    if (!user) {
        status.textContent = 'Please log in!';
        return;
    }

    const userDoc = await db.collection('users').doc(user.uid).get();
    const data = userDoc.data() || { conversions: 0, lastReset: new Date().toDateString() };
    if (data.lastReset !== new Date().toDateString()) {
        data.conversions = 0;
        data.lastReset = new Date().toDateString();
    }
    if (data.conversions >= 5) {
        status.textContent = 'Daily limit reached! Try again tomorrow.';
        return;
    }

    await db.collection('users').doc(user.uid).set({ conversions: data.conversions + 1, lastReset: data.lastReset }, { merge: true });
    // Existing convert() code
}