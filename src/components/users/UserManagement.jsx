import React, { useState, useEffect } from "react";
import { useDashboard } from "../../context/DashboardContext.jsx";
import { useNotifications } from "../../hooks/useNotifications";
import UserTable from "./UserTable";
import UserForm from "./UserForm";
import DeleteConfirmation from "./DeleteConfirmation";
import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Spinner from "../ui/Spinner";
import Toast from "../ui/Toast";
import { SaveIcon, CancelIcon } from "../ui/icons/index.js";
import { getArrayOfPages } from "../../utils/pagination.js";

const UserManagement = () => {
  const {
    draftUsers,
    loading,
    error,
    addUser,
    updateUser,
    deleteUser,
    saveChanges,
    cancelChanges,
    hasUnsavedChanges,
  } = useDashboard();
  const { notifications, addNotification } = useNotifications();

  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);
  const [deletingUser, setDeletingUser] = useState(null);

  const usersPerPage = 5;

  // Filter users based on search term
  const filteredUsers = draftUsers.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination logic
  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
  const pages = getArrayOfPages(totalPages);
  const startIndex = (currentPage - 1) * usersPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + usersPerPage
  );

  // Reset pagination when search changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // handllers
  const handleNewUser = () => {
    setEditingUser(null);
    setShowModal(true);
  };

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = (user) => {
    setDeletingUser(user);
    setShowDeleteModal(true);
  };

  const handleFormSubmit = async (formData) => {
    if (editingUser) {
      updateUser(editingUser.id, formData);
      addNotification("User updated successfully");
      setShowModal(false);
      setEditingUser(null);
    } else {
      addUser(formData);
      addNotification("User created successfully");
      setShowModal(false);
    }
  };

  const handleDeleteConfirm = async () => {
    deleteUser(deletingUser.id);
    addNotification("User deleted successfully");
    setShowDeleteModal(false);
    setDeletingUser(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditingUser(null);
  };

  const handleCloseDeleteModal = () => {
    setShowDeleteModal(false);
    setDeletingUser(null);
  };

  const handleSaveChanges = async () => {
    const result = await saveChanges();
    if (result.success) {
      addNotification("Changes saved successfully");
    } else {
      addNotification("Failed to save changes", "error");
    }
  };

  const handleCancelChanges = () => {
    cancelChanges();
    addNotification("Changes cancelled");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1 sm:mb-2">
              User Management
            </h2>
            <p className="text-gray-600">Manage your users efficiently</p>
          </div>
          {hasUnsavedChanges() && (
            <div className="flex flex-wrap justify-start sm:justify-end gap-2">
              <Button variant="outline" onClick={handleCancelChanges}>
                <CancelIcon className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveChanges}>
                <SaveIcon className="w-4 h-4 mr-1" />
                Save Changes
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Search and New User Button */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search users by name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <Button onClick={handleNewUser}>New User</Button>
      </div>

      {/* Loading State */}
      {loading && <Spinner text="Loading users..." />}

      {/* Error State */}
      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg mb-6">
          <div className="flex">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                clipRule="evenodd"
              />
            </svg>
            <span>Error: {error}</span>
          </div>
        </div>
      )}

      {/* Users Table */}
      {!loading && !error && (
        <UserTable
          users={paginatedUsers}
          onEdit={handleEdit}
          onDelete={handleDelete}
          currentPage={currentPage}
          totalPages={totalPages}
          usersPerPage={usersPerPage}
          onPageChange={setCurrentPage}
          startIndex={startIndex}
        />
      )}

      {/* Create/Edit User Modal */}
      <Modal
        isOpen={showModal}
        onClose={handleCloseModal}
        title={editingUser ? "Edit User" : "Create New User"}
      >
        <UserForm
          user={editingUser}
          onSubmit={handleFormSubmit}
          onCancel={handleCloseModal}
        />
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal isOpen={showDeleteModal} onClose={handleCloseDeleteModal} title="">
        <DeleteConfirmation
          user={deletingUser}
          onConfirm={handleDeleteConfirm}
          onCancel={handleCloseDeleteModal}
        />
      </Modal>

      {/* Toast Notifications */}
      <Toast notifications={notifications} />
    </div>
  );
};

export default UserManagement;
