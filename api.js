/**
 * TASKFLOW PRO - API Service Layer
 */

const API_URL = 'https://taskflow-project-uy2w-i6xzsfh3z-juliaht15s-projects.vercel.app/api/v1/tasks';

export const taskAPI = {
    
    /**
     * Fetch all tasks (GET)
     */
    async getAll() {
        try {
            const response = await fetch(API_URL);
            if (!response.ok) throw new Error('Server response error');
            return await response.json();
        } catch (error) {
            console.error("API Error (getAll):", error);
            throw new Error('Could not connect to the server.');
        }
    },

    /**
     * Create a new task (POST)
     */
    async create(title, priority = 'Medium') {
        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ title, priority })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'Error creating task');
            }
            return await response.json();
        } catch (error) {
            console.error("API Error (create):", error);
            throw error;
        }
    },

    /**
     * Partial update of a task (PATCH)
     */
    async update(id, updates) {
        try {
            const response = await fetch(`${API_URL}/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates)
            });

            if (!response.ok) throw new Error('Could not update task');
            return await response.json();
        } catch (error) {
            console.error("API Error (update):", error);
            throw error;
        }
    },

    /**
     * Permanently delete a task (DELETE)
     */
    async delete(id) {
        try {
            const response = await fetch(`${API_URL}/${id}`, { 
                method: 'DELETE' 
            });

            if (!response.ok) throw new Error('Could not delete task');
            return true;
        } catch (error) {
            console.error("API Error (delete):", error);
            throw error;
        }
    }
};