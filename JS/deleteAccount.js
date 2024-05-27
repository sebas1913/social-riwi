import { URL_USERS } from "./URLS.js";

// Get the delete account button
const deleteAccountButton = document.querySelector("#deleteAccountButton");

// Add event to delete account button
if (deleteAccountButton) {
    deleteAccountButton.addEventListener("click", () => {
        const user = JSON.parse(localStorage.getItem("user")); // Get the user from localStorage
        if (user && user.id) {
            deleteAccount(user.id); // Call the function to delete the account
        } else {
            console.error("No se encontró el ID del usuario en el localStorage.");
        }
    });
}

// Function to delete a user
async function deleteAccount(id) {
    try {
        const response = await fetch(`${URL_USERS}/${id}`, {
            method: "DELETE"
        });

        if (!response.ok) {
            throw new Error("Failed to delete user.");
        }

        // Delete user data from localStorage
        localStorage.removeItem("user");
        // Redirect user to login page
        window.location.href = "login.html";
        
        // Show success message to the user
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "User account deleted successfully."
        });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        //Handling errors with SweetAlert or another notification library
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to delete user.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}
