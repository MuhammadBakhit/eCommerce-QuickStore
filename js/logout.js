document.getElementById("logoutButton").addEventListener("click", function () {
    
    localStorage.removeItem("token");


    const toast = document.getElementById("toast");
    toast.style.display = "block";
    toast.style.opacity = 1;

    setTimeout(() => {
        toast.style.opacity = 0;
        setTimeout(() => {
            toast.style.display = "none";
        }, 500);
        window.location.href = "./login.html";
    }, 2000);

});
