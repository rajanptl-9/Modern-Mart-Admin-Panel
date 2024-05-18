const logout = (message) => {
    if(message === "Cannot read properties of undefined (reading 'rejectWithValues')"){
        localStorage.clear();
        setTimeout(() => {
            window.location.replace("/");
        }, 1000);
        return true;
    }
}

export default logout;