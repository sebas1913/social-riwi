// updateUser.js
import { URL_USERS } from "./URLS.js";

// Event on page load
document.addEventListener("DOMContentLoaded", () => {
    const updateUserButton = document.getElementById("updateUserButton");
    const updateUserForm = document.getElementById("updateUserForm");

    updateUserForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const newUsername = document.querySelector("#newUsername").value.trim();
        const newEmail = document.querySelector("#newEmail").value.trim();
        const user = JSON.parse(localStorage.getItem("user"));

        if (!newUsername && !newEmail) {
            Swal.fire({
                icon: "warning",
                title: "Warning",
                text: "At least one field (username or email) must be filled.",
            });
            return;
        }

        if (user && user.id) {
            const userId = user.id;
            await updateUser(userId, newUsername, newEmail);
        } else {
            console.error("User ID not found in localStorage.");
        }
    });
});

// Function to update user data
async function updateUser(userId, newUsername, newEmail) {
    try {
        // Get the current user data
        const userResponse = await fetch(`${URL_USERS}/${userId}`);
        if (!userResponse.ok) {
            throw new Error("Failed to fetch user data.");
        }
        const userData = await userResponse.json();

        // Update only fields that are not empty
        if (newUsername) {
            userData.name = newUsername;
        }
        if (newEmail) {
            userData.email = newEmail;
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
            text: "User data updated successfully."
        });

        // Redirect the user to their profile
        window.location.href = "/HTML/profileUser.html";

    } catch (error) {
        console.error("Error updating user data:", error);
        // Error handling with SweetAlert
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to update user data.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}
