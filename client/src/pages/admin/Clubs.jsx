
import { useCallback, useEffect, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Upload,
  ImagePlus,
  LoaderCircle,
  Users,
} from "lucide-react";
import api from "../../api/api.js";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function getImageUrl(image) {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${API_ORIGIN}${image.startsWith("/") ? "" : "/"}${image}`;
}

const emptyForm = {
  name: "",
  description: "",
};

export default function Clubs() {
  const [clubs, setClubs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingClub, setEditingClub] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const loadClubs = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/clubs");
      setClubs(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load clubs.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadClubs();
  }, [loadClubs]);

  function resetForm() {
    setForm(emptyForm);
    setImage(null);
    setImagePreview("");
    setEditingClub(null);
    setIsFormOpen(false);
  }

  function openCreateForm() {
    setError("");
    setSuccess("");
    setForm(emptyForm);
    setImage(null);
    setImagePreview("");
    setEditingClub(null);
    setIsFormOpen(true);
  }

  function openEditForm(club) {
    setError("");
    setSuccess("");
    setEditingClub(club);
    setForm({
      name: club.name || "",
      description: club.description || "",
    });
    setImage(null);
    setImagePreview(club.image ? getImageUrl(club.image) : "");
    setIsFormOpen(true);
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim()) {
      setError("Club name is required.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("description", form.description.trim());

    if (image) {
      formData.append("image", image);
    }

    setSaving(true);

    try {
      const response = editingClub
        ? await api.patch(`/clubs/${editingClub.id}`, formData)
        : await api.post("/clubs", formData);

      setSuccess(
        response.message ||
          (editingClub
            ? "Club updated successfully."
            : "Club created successfully.")
      );

      resetForm();
      await loadClubs();
    } catch (err) {
      setError(err.message || "Failed to save club.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(club) {
    const confirmed = window.confirm(
      `Delete the club "${club.name}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeletingId(club.id);

    try {
      const response = await api.delete(`/clubs/${club.id}`);

      setSuccess(response.message || "Club deleted successfully.");
      await loadClubs();
    } catch (err) {
      setError(err.message || "Failed to delete club.");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredClubs = clubs.filter((club) => {
    const query = search.toLowerCase().trim();

    return (
      club.name?.toLowerCase().includes(query) ||
      club.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-500">
            Administration / Clubs
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Clubs Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Create and manage school clubs and their information.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add club
        </button>
      </div>

      {error && (
        <div
          role="alert"
          className="flex items-start justify-between gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          <span>{error}</span>
          <button
            type="button"
            onClick={() => setError("")}
            aria-label="Dismiss error"
          >
            <X size={18} />
          </button>
        </div>
      )}

      {success && (
        <div
          role="status"
          className="flex items-center justify-between gap-3 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700"
        >
          <span>{success}</span>
          <button
            type="button"
            onClick={() => setSuccess("")}
            aria-label="Dismiss success message"
          >
            <X size={18} />
          </button>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total clubs</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {clubs.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Search size={23} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Matching results</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {filteredClubs.length}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="border-b border-gray-100 p-4 sm:p-5">
          <div className="relative max-w-md">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search clubs..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-sm text-gray-500">
            <LoaderCircle size={20} className="animate-spin" />
            Loading clubs...
          </div>
        ) : filteredClubs.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
              <Users size={26} />
            </div>
            <h2 className="mt-4 font-semibold text-gray-900">
              {search ? "No matching clubs" : "No clubs yet"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {search
                ? "Try another search term."
                : "Add your first school club to get started."}
            </p>
            {!search && (
              <button
                type="button"
                onClick={openCreateForm}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Add club
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredClubs.map((club) => (
              <article
                key={club.id}
                className="overflow-hidden rounded-2xl border border-gray-200 transition hover:border-gray-300 hover:shadow-md"
              >
                <div className="relative flex h-48 items-center justify-center bg-gray-100">
                  {club.image ? (
                    <img
                      src={getImageUrl(club.image)}
                      alt={club.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <ImagePlus size={36} />
                      <span className="text-xs">No club image</span>
                    </div>
                  )}

                  <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
                    School club
                  </span>
                </div>

                <div className="space-y-3 p-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    {club.name}
                  </h2>

                  <p className="min-h-12 text-sm leading-6 text-gray-500">
                    {club.description || "No description provided."}
                  </p>

                  <div className="flex gap-2 border-t border-gray-100 pt-3">
                    <button
                      type="button"
                      onClick={() => openEditForm(club)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(club)}
                      disabled={deletingId === club.id}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === club.id ? (
                        <LoaderCircle size={16} className="animate-spin" />
                      ) : (
                        <Trash2 size={16} />
                      )}
                      Delete
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}

        {!loading && filteredClubs.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
            Showing {filteredClubs.length} of {clubs.length} clubs
          </div>
        )}
      </div>

      {isFormOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget && !saving) {
              resetForm();
            }
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="club-form-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2
                  id="club-form-title"
                  className="text-lg font-bold text-gray-900"
                >
                  {editingClub ? "Edit club" : "Add club"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the club's details below.
                </p>
              </div>

              <button
                type="button"
                onClick={resetForm}
                disabled={saving}
                aria-label="Close form"
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 disabled:opacity-50"
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="space-y-5 px-6 py-5">
                <div>
                  <label
                    htmlFor="club-image"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Club image
                  </label>

                  <label
                    htmlFor="club-image"
                    className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-gray-300 p-4 transition hover:border-blue-400 hover:bg-blue-50/30"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Club preview"
                        className="h-20 w-24 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-24 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                        <ImagePlus size={28} />
                      </div>
                    )}

                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <Upload size={16} />
                        {image ? "Change selected image" : "Choose an image"}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {editingClub
                          ? "Choose a new image to replace the existing one."
                          : "Choose an image for your new club."}
                      </p>
                      {image && (
                        <p className="mt-1 max-w-xs truncate text-xs text-blue-600">
                          {image.name}
                        </p>
                      )}
                    </div>
                  </label>

                  <input
                    id="club-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </div>

                <div>
                  <label
                    htmlFor="club-name"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Club name *
                  </label>
                  <input
                    id="club-name"
                    name="name"
                    value={form.name}
                    onChange={handleFieldChange}
                    required
                    maxLength={150}
                    placeholder="e.g. Science Club"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="club-description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="club-description"
                    name="description"
                    value={form.description}
                    onChange={handleFieldChange}
                    rows={4}
                    maxLength={3000}
                    placeholder="Describe the club, its activities, and purpose..."
                    className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>
              </div>

              <div className="flex flex-col-reverse gap-3 rounded-b-2xl border-t border-gray-100 bg-gray-50 px-6 py-4 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={resetForm}
                  disabled={saving}
                  className="rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {saving && (
                    <LoaderCircle size={17} className="animate-spin" />
                  )}
                  {saving
                    ? "Saving..."
                    : editingClub
                      ? "Save changes"
                      : "Create club"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
