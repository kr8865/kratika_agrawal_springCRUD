import api from './api';

export const studentService = {
    getAllStudents: async (page = 1, size = 10, search = '', sortBy = '') => {
        const response = await api.get('/students', {
            params: { page, size, search, sortBy }
        });
        return response.data;
    },
    
    getStudentById: async (id) => {
        const response = await api.get(`/students/${id}`);
        return response.data;
    },
    
    addStudent: async (student) => {
        const response = await api.post('/students', student);
        return response.data;
    },
    
    updateStudent: async (id, student) => {
        const response = await api.put(`/students/${id}`, student);
        return response.data;
    },
    
    deleteStudent: async (id) => {
        const response = await api.delete(`/students/${id}`);
        return response.data;
    }
};
