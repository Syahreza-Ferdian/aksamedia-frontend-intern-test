import React from "react";

const ModalTemplate = ({
    isOpen,
    onClose,
    title,
    children,
    onSubmit,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
}) => {
    if (!isOpen) return null;

    const handleEnterKey = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            onSubmit();
        }
    };

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 px-4">
            <div className="bg-white dark:bg-gray-800 rounded shadow-lg p-6 w-full max-w-md dark:text-white" onKeyDown={handleEnterKey} tabIndex={0}>
                <h2 className="text-xl font-bold mb-4">{title}</h2>
                <div className="mb-4">{children}</div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={onClose}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                        {cancelLabel}
                    </button>
                    <button
                        onClick={onSubmit}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                        {submitLabel}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ModalTemplate;
