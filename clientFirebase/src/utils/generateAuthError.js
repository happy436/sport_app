function generateAuthError(message) {
    switch (message) {
        case "auth/too-many-requests":
            return "Too many request. Try later!";
        case "auth/invalid-credential":
            return "Invalid email / password!";
    }
}

export default generateAuthError;
