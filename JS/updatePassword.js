import { URL_USERS } from "./URLS.js";

// Event on page load
document.addEventListener("DOMContentLoaded", () => {
    const updatePasswordButton = document.getElementById("updatePasswordButton");
    const updatePasswordForm = document.getElementById("updatePasswordForm");

    updatePasswordForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const newPassword = document.querySelector("#newPassword").value.trim();
        const user = JSON.parse(localStorage.getItem("user"));

        if (!newPassword) {
            Swal.fire({
                icon: "warning",
                title: "Warning",
                text: "Password field cannot be empty.",
            });
            return;
        }

        if (user && user.id) {
            const userId = user.id;
            await updatePassword(userId, newPassword);
        } else {
            console.error("User ID not found in localStorage.");
        }
    });
});

// Function to update user password
async function updatePassword(userId, newPassword) {
    try {
        // Get the current user data
        const userResponse = await fetch(`${URL_USERS}/${userId}`);
        if (!userResponse.ok) {
            throw new Error("Failed to fetch user data.");
        }
        const userData = await userResponse.json();

        // Update only the password field
        if (newPassword) {
            userData.password = newPassword;
        }

        // Send the PUT request with the updated user data
        const response = await fetch(`${URL_USERS}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Failed to update user data.");
        }

        // Update localStorage with the new user data
        localStorage.setItem("user", JSON.stringify(userData));

        // Notify the user about the success of the operation
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password updated successfully."
        });

        // Redirect the user to their profile
        window.location.href = "/HTML/profileUser.html";

    } catch (error) {
        console.error("Error updating password:", error);
        // Error handling with SweetAlert
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to update password.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}
