import React, { useState } from "react";
import { useAuth } from "../Auth/AuthProvider";
import { useTheme } from "../Helper/ThemeProvider";
import ModalTemplate from "../Components/Modal";

const Navbar = () => {
    const { user, setUser, logout } = useAuth(); // Add setUser to update user data
    const { theme, toggleTheme } = useTheme();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [formError, setFormError] = useState("");

    const [formData, setFormData] = useState({
        namaUser : ""
    });

    const handleLogout = () => {
        logout();
    };

    const handleSaveUserNameUpdate = () => {
        if (!formData.nama) {
            setFormError("Name is required");
            return;
        }

        setUser({ ...user, name: formData.nama });
        setIsEditModalOpen(false);
        setIsDropdownOpen(false);
    };

    const handleFormChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <>
            <nav className="bg-white dark:bg-gray-800 shadow-md pb-5 px-4 sm:px-20 flex justify-between items-center pt-10">
                <div className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-white truncate">
                    Employee Management App
                </div>

                <div className="flex items-center space-x-4 dark:text-white">
                    <button
                        onClick={toggleTheme}
                        className="p-2 rounded-full focus:outline-none bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-200 hover:bg-gray-200 dark:hover:bg-gray-600"
                        aria-label="Toggle Theme"
                    >
                        {theme === "dark" ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2m0 14v2m9-9h-2M5 12H3m15.364 6.364l-1.414-1.414M7.05 7.05L5.636 5.636m12.728 0l-1.414 1.414M7.05 16.95l-1.414 1.414" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0112 21.75 9.718 9.718 0 012.248 15.002m19.504 0A9.717 9.717 0 0112 2.25c4.585 0 8.435 3.11 9.504 7.502m0 0c-1.369-.83-2.932-1.252-4.504-1.252a9.717 9.717 0 00-9.504 7.502c1.369.83 2.932 1.252 4.504 1.252a9.717 9.717 0 009.504-7.502z" />
                            </svg>
                        )}
                    </button>

                    {/* User Dropdown */}
                    <div className="relative inline-block text-left">
                        <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="flex items-center space-x-2 focus:outline-none">
                            <span className="hidden sm:block text-gray-800 dark:text-white truncate">{user.name}</span>
                            <svg className={`w-5 h-5 transition-transform ${isDropdownOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M5.293 7.707a1 1 0 011.414 0L10 11.586l3.293-3.879a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                        </button>
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10">
                                <button
                                    onClick={() => setIsEditModalOpen(true)}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Edit Profile
                                </button>
                                <button
                                    onClick={handleLogout}
                                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                                >
                                    Logout
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </nav>

            <ModalTemplate
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                title="Edit Profile"
                onSubmit={handleSaveUserNameUpdate}
            >
                <form>
                    {formError && <div className="text-red-500 text-sm mb-4">{formError}</div>}
                    <input
                        type="text"
                        name="nama"
                        value={formData.nama}
                        onChange={handleFormChange}
                        placeholder="Name"
                        className="w-full mb-4 px-4 py-2 border rounded dark:bg-gray-800"
                    />
                </form>
            </ModalTemplate>
        </>
    );
};

export default Navbar;
