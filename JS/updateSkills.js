import { URL_USERS } from "./URLS.js";

// Event on page load
document.addEventListener("DOMContentLoaded", () => {
    const updateSkillsButton = document.getElementById("updateSkillsButton");
    const updateSkillsForm = document.getElementById("updateSkillsForm");

    updateSkillsForm.addEventListener("submit", async (event) => {
        event.preventDefault();

        const newSkills = document.querySelector("#newSkills").value.trim();
        const user = JSON.parse(localStorage.getItem("user"));

        if (!newSkills) {
            Swal.fire({
                icon: "warning",
                title: "Warning",
                text: "Skills field cannot be empty.",
            });
            return;
        }

        if (user && user.id) {
            const userId = user.id;
            await updateSkills(userId, newSkills);
        } else {
            console.error("User ID not found in localStorage.");
        }
    });
});

// Function to update user skills
async function updateSkills(userId, newSkills) {
    try {
        // Get the current user data
        const userResponse = await fetch(`${URL_USERS}/${userId}`);
        if (!userResponse.ok) {
            throw new Error("Failed to fetch user data.");
        }
        const userData = await userResponse.json();

        // Update only the password field
        if (newSkills) {
            userData.skills = newSkills;
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
            text: "Skills updated successfully."
        });

        // Redirect the user to their profile
        window.location.href = "/HTML/profileUser.html";

    } catch (error) {
        console.error("Error updating Skills:", error);
        // Error handling with SweetAlert
        Swal.fire({
            icon: "error",
            title: "Oops...",
            text: "Failed to update skills.",
            footer: '<a href="#">Why do I have this issue?</a>'
        });
    }
}
