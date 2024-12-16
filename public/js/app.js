const API_URL = 'http://localhost:3000/api/goals';

// Helper function to fetch token from local storage
const getToken = () => localStorage.getItem('token');

// Fetch and display goals
const fetchGoals = async () => {
    try {
        const response = await fetch(API_URL, {
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });
        const goals = await response.json();

        if (response.ok) {
            displayGoals(goals);
        } else {
            alert(goals.error || 'Failed to fetch goals');
        }
    } catch (error) {
        console.error('Error fetching goals:', error);
    }
};

// Display goals in the DOM
const displayGoals = (goals) => {
    const goalList = document.getElementById('goal-list');
    goalList.innerHTML = ''; // Clear previous content

    goals.forEach((goal) => {
        const goalCard = document.createElement('div');
        goalCard.classList.add('goal-card');
        goalCard.innerHTML = `
            <h3>${goal.title}</h3>
            <p>${goal.description || 'No description provided'}</p>
            <p><strong>Target:</strong> $${goal.targetAmount}</p>
            <p><strong>Current:</strong> $${goal.currentAmount}</p>
            <p><strong>Deadline:</strong> ${new Date(goal.deadline).toLocaleDateString()}</p>
            <div class="actions">
                <button class="edit" onclick="editGoal(${goal.id})">Edit</button>
                <button class="delete" onclick="deleteGoal(${goal.id})">Delete</button>
            </div>
        `;
        goalList.appendChild(goalCard);
    });
};

// Add a new goal
const addGoal = async (goal) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(goal),
        });

        if (response.ok) {
            alert('Goal added successfully');
            fetchGoals(); // Refresh the goal list
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to add goal');
        }
    } catch (error) {
        console.error('Error adding goal:', error);
    }
};

// Edit a goal
const editGoal = async (id) => {
    const title = prompt('Enter new title:');
    const description = prompt('Enter new description:');
    const targetAmount = prompt('Enter new target amount:');
    const currentAmount = prompt('Enter new current amount:');
    const deadline = prompt('Enter new deadline (YYYY-MM-DD):');

    const updatedGoal = { title, description, targetAmount, currentAmount, deadline };

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getToken()}`,
            },
            body: JSON.stringify(updatedGoal),
        });

        if (response.ok) {
            alert('Goal updated successfully');
            fetchGoals(); // Refresh the goal list
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to update goal');
        }
    } catch (error) {
        console.error('Error updating goal:', error);
    }
};

// Delete a goal
const deleteGoal = async (id) => {
    if (!confirm('Are you sure you want to delete this goal?')) return;

    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getToken()}`,
            },
        });

        if (response.ok) {
            alert('Goal deleted successfully');
            fetchGoals(); // Refresh the goal list
        } else {
            const error = await response.json();
            alert(error.error || 'Failed to delete goal');
        }
    } catch (error) {
        console.error('Error deleting goal:', error);
    }
};

// Handle Add Goal button
document.getElementById('add-goal').addEventListener('click', () => {
    const title = prompt('Enter goal title:');
    const description = prompt('Enter goal description:');
    const targetAmount = prompt('Enter target amount:');
    const deadline = prompt('Enter deadline (YYYY-MM-DD):');

    const newGoal = { title, description, targetAmount, deadline };
    addGoal(newGoal);
});

// Initialize the app by fetching goals
fetchGoals();


