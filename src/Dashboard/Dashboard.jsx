import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getFromLocalStorage, saveToLocalStorage } from "../Helper/localStorageHelper";
import ModalTemplate from "../Components/Modal";

const ITEMS_PER_PAGE = 5;

const Dashboard = () => {
    const navigate = useNavigate();
    const [employees, setEmployees] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [currentEmployee, setCurrentEmployee] = useState(null);

    const [formError, setFormError] = useState("");

    const [formData, setFormData] = useState({
        nama: "",
        nomorTelepon: "",
        divisi: "",
        position: "",
    });

    useEffect(() => {
        
        const storedEmployees = getFromLocalStorage("employees");
        setEmployees(storedEmployees);

        const params = new URLSearchParams(window.location.search);
        const query = params.get("search") || "";
        const page = parseInt(params.get("page"), 10) || 1;

        setSearchTerm(query);
        setCurrentPage(page);
    }, []);

    useEffect(() => {
        const params = new URLSearchParams();
        if (searchTerm) params.set("search", searchTerm);
        if (currentPage) params.set("page", currentPage);
        navigate(`?${params.toString()}`, { replace: true });
    }, [searchTerm, currentPage, navigate]);

    const filteredEmployees = employees.filter((employee) =>
        employee.nama.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE) || 1;
    const paginatedEmployees = filteredEmployees.slice(
        (currentPage - 1) * ITEMS_PER_PAGE,
        currentPage * ITEMS_PER_PAGE
    );

    const handleAddEmployee = () => {
        setFormData({
            nama: "",
            nomorTelepon: "",
            divisi: "",
            position: "",
        });
        setIsAddModalOpen(true);
    };

    const handleEditEmployee = (employee) => {
        setCurrentEmployee(employee);
        setFormData(employee);
        setIsEditModalOpen(true);
    };

    const handleSaveEmployee = () => {
        if (!formData.nama.trim() || !formData.nomorTelepon.trim() || !formData.divisi.trim() || !formData.position.trim()) {
            setFormError("All fields are required.");
            return;
        }

        const updatedEmployees = [...employees, { ...formData, id: Date.now() }];
        setEmployees(updatedEmployees);
        saveToLocalStorage("employees", updatedEmployees);
        setFormError("");
        setIsAddModalOpen(false);
    };

    const handleUpdateEmployee = () => {
        if (!formData.nama.trim() || !formData.nomorTelepon.trim() || !formData.divisi.trim() || !formData.position.trim()) {
            setFormError("All fields are required.");
            return;
        }

        const updatedEmployees = employees.map((emp) =>
            emp.id === currentEmployee.id ? { ...formData, id: emp.id } : emp
        );
        setEmployees(updatedEmployees);
        saveToLocalStorage("employees", updatedEmployees);
        setFormError("");
        setIsEditModalOpen(false);
    };

    const handleDeleteEmployee = (id) => {
        const updatedEmployees = employees.filter((emp) => emp.id !== id);
        setEmployees(updatedEmployees);
        saveToLocalStorage("employees", updatedEmployees);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    return (
        <div className="dark:bg-gray-800 bg-white dark:text-white text-black p-20 min-h-screen">
            <div className="flex justify-between items-center mb-4">
                <h1 className="text-2xl font-bold">Employee Dashboard</h1>
                <button onClick={handleAddEmployee} className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600">
                    Add Employee
                </button>
            </div>

            <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="mb-4 w-full px-4 py-2 border rounded shadow-sm focus:ring focus:ring-blue-300 dark:bg-gray-800"
            />

            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-100 dark:bg-gray-800">
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Phone</th>
                        <th className="border border-gray-300 px-4 py-2">Division</th>
                        <th className="border border-gray-300 px-4 py-2">Position</th>
                        <th className="border border-gray-300 px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedEmployees.map((employee) => (
                        <tr key={employee.id}>
                            <td className="border border-gray-300 px-4 py-2">{employee.nama}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.nomorTelepon}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.divisi}</td>
                            <td className="border border-gray-300 px-4 py-2">{employee.position}</td>
                            <td className="border border-gray-300 px-4 py-2">
                                <button onClick={() => handleEditEmployee(employee)} className="bg-yellow-500 text-white px-3 py-1 rounded shadow hover:bg-yellow-600 mr-2">
                                    Edit
                                </button>
                                <button onClick={() => handleDeleteEmployee(employee.id)} className="bg-red-500 text-white px-3 py-1 rounded shadow hover:bg-red-600">
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                    {paginatedEmployees.length === 0 && (
                        <tr>
                            <td colSpan="5" className="text-center py-4 text-gray-500 font-medium">
                                No employees found.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <div className="mt-4 flex justify-between items-center">
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50">
                    Previous
                </button>
                <span>
                    Page {currentPage} of {totalPages}
                </span>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages} className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 disabled:opacity-50">
                    Next
                </button>
            </div>

            {/* Add Employee Modal */}
            <ModalTemplate
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                title="Add New Employee"
                onSubmit={handleSaveEmployee}
            >
                <form>
                    {formError && <p className="text-red-500 mb-4">{formError}</p>}
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleFormChange}
                        placeholder="Name"
                        className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800"
                    />
                    <input
                        type="text"
                        name="nomorTelepon"
                        value={formData.nomorTelepon}
                        onChange={handleFormChange}
                        placeholder="Phone"
                        className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800"
                    />
                    <input
                        type="text"
                        name="divisi"
                        value={formData.divisi}
                        onChange={handleFormChange}
                        placeholder="Division"
                        className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800"
                    />
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleFormChange}
                        placeholder="Position"
                        className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800"
                    />
                </form>
            </ModalTemplate>

            {/* Edit Employee Modal */}
            <ModalTemplate
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Employee"
                onSubmit={handleUpdateEmployee}
            >
                <form>
                    {formError && <p className="text-red-500 mb-4">{formError}</p>}
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleFormChange}
                        placeholder="Name"
                        className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800"
                    />
                    <input
                        type="text"
                        name="nomorTelepon"
                        value={formData.nomorTelepon}
                        onChange={handleFormChange}
                        placeholder="Phone"
                        className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800"
                    />
                    <input
                        type="text"
                        name="divisi"
                        value={formData.divisi}
                        onChange={handleFormChange}
                        placeholder="Division"
                        className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800"
                    />
                    <input
                        type="text"
                        name="position"
                        value={formData.position}
                        onChange={handleFormChange}
                        placeholder="Position"
                        className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800"
                    />
                </form>
            </ModalTemplate>
        </div>
    );
};

export default Dashboard;
