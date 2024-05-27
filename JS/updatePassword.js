import {URL_USERS } from "./URLS.js";

// Get the update password button
const updatePasswordButton = document.querySelector("#updatePasswordButton");

if (updatePasswordButton) {
    updatePasswordButton.addEventListener("click", async () => {
        const newPassword = document.querySelector("#newPassword").value;
        const user = JSON.parse(localStorage.getItem("user"));

        if (user && user.id) {
            const userId = user.id;
            await updatePassword(userId, newPassword);
        } else {
            console.error("The user ID was not found in localStorage.");
        }
    });
}

// Function to update the user's password
async function updatePassword(userId, newPassword) {
    try {
        // Get the current user data
        const userResponse = await fetch(`${URL_USERS}/${userId}`);
        if (!userResponse.ok) {
            throw new Error("Failed to fetch user data.");
        }
        const userData = await userResponse.json();

        // Update only the password field
        userData.password = newPassword;

        // Send the PUT request with all the user data
        const response = await fetch(`${URL_USERS}/${userId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        if (!response.ok) {
            throw new Error("Failed to update password.");
        }

        // Notify the user about the success of the operation
        Swal.fire({
            icon: "success",
            title: "Success",
            text: "Password updated successfully."
        });

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

    
// Redirect the user to their profile
    window.location.href = "/HTML/profileUser.html";
}
