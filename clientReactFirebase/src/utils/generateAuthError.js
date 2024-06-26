function generateAuthError(message) {
    switch (message) {
        case "auth/too-many-requests":
            return "Too many request. Try later!";
        case "auth/invalid-credential":
            return "Invalid email / password!";
        case "auth/email-already-in-use":
            return "This email has already been registered"
    }
}

export default generateAuthError;
