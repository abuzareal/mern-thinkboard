import React from "react";
import PropTypes from "prop-types";

const DeleteModal = ({
  open,
  title = "Delete Note?",
  description = "Are you sure you want to delete this note? This action cannot be undone.",
  onCancel,
  onConfirm,
  loading = false,
  confirmText = "Delete",
  cancelText = "Cancel",
  confirmClass = "btn-error",
}) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-base-100 rounded-lg shadow-lg p-6 w-full max-w-sm">
        <h4 className="text-lg font-semibold mb-2 text-error">{title}</h4>
        <p className="mb-4 text-base-content/80">{description}</p>
        <div className="flex justify-end gap-2">
          <button
            className="btn btn-sm btn-ghost"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelText}
          </button>
          <button
            className={`btn btn-sm ${confirmClass}`}
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? `${confirmText}...` : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  onCancel: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  loading: PropTypes.bool,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  confirmClass: PropTypes.string,
};

export default DeleteModal;
