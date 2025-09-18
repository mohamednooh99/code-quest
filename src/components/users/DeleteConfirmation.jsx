import React from "react";
import Button from "../ui/Button";

const DeleteConfirmation = ({ user, onConfirm, onCancel }) => {
  return (
    <div className="p-6">
      <div className="flex items-center mb-4">
        <div className="flex-shrink-0">
          <svg
            className="w-8 h-8 text-red-600"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.5 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z"
            />
          </svg>
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-gray-900">Delete User</h3>
        </div>
      </div>

      <div className="mb-6">
        <p className="text-sm text-gray-500">
          Are you sure you want to delete <strong>{user?.name}</strong>? This
          action cannot be undone.
        </p>
      </div>

      <div className="flex justify-end space-x-3">
        <Button variant="secondary" onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
