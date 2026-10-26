
import { useCallback, useEffect, useState } from "react";
import {
  Award,
  Plus,
  Search,
  Pencil,
  Trash2,
  X,
  Upload,
  LoaderCircle,
  ImagePlus,
  Trophy,
} from "lucide-react";
import api from "../../api/api.js";

const API_URL =
  import.meta.env.VITE_API_URL || "http://localhost:5000/api";

const API_ORIGIN = API_URL.replace(/\/api\/?$/, "");

function getPhotoUrl(photo) {
  if (!photo) return "";
  if (photo.startsWith("http://") || photo.startsWith("https://")) {
    return photo;
  }
  return `${API_ORIGIN}${photo.startsWith("/") ? "" : "/"}${photo}`;
}

const emptyForm = {
  name: "",
  achievementClass: "",
  rank: "1",
  description: "",
};

export default function Achievers() {
  const [achievers, setAchievers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingAchiever, setEditingAchiever] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [photo, setPhoto] = useState(null);
  const [photoPreview, setPhotoPreview] = useState("");

  const loadAchievers = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/achievers");
      setAchievers(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load achievers.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadAchievers();
  }, [loadAchievers]);

  function resetForm() {
    setForm(emptyForm);
    setPhoto(null);
    setPhotoPreview("");
    setEditingAchiever(null);
    setIsFormOpen(false);
  }

  function openCreateForm() {
    setError("");
    setSuccess("");
    setForm(emptyForm);
    setPhoto(null);
    setPhotoPreview("");
    setEditingAchiever(null);
    setIsFormOpen(true);
  }

  function openEditForm(achiever) {
    setError("");
    setSuccess("");
    setEditingAchiever(achiever);
    setForm({
      name: achiever.name || "",
      achievementClass: achiever.achievementClass || "",
      rank: String(achiever.rank ?? 0),
      description: achiever.description || "",
    });
    setPhoto(null);
    setPhotoPreview(
      achiever.photo ? getPhotoUrl(achiever.photo) : ""
    );
    setIsFormOpen(true);
  }

  function handlePhotoChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setPhoto(file);
    setPhotoPreview(URL.createObjectURL(file));
  }

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!form.name.trim() || !form.achievementClass.trim()) {
      setError("Name and achievement class are required.");
      return;
    }

    if (
      form.rank.trim() === "" ||
      !Number.isInteger(Number(form.rank)) ||
      Number(form.rank) < 0
    ) {
      setError("Rank must be a non-negative whole number.");
      return;
    }

    if (!editingAchiever && !photo) {
      setError("Please select a photo for this achiever.");
      return;
    }

    const formData = new FormData();
    formData.append("name", form.name.trim());
    formData.append("achievementClass", form.achievementClass.trim());
    formData.append("rank", String(Number(form.rank)));
    formData.append("description", form.description.trim());

    if (photo) {
      formData.append("photo", photo);
    }

    setSaving(true);

    try {
      const response = editingAchiever
        ? await api.patch(
            `/achievers/${editingAchiever.id}`,
            formData
          )
        : await api.post("/achievers", formData);

      setSuccess(
        response.message ||
          (editingAchiever
            ? "Achiever updated successfully."
            : "Achiever created successfully.")
      );

      resetForm();
      await loadAchievers();
    } catch (err) {
      setError(err.message || "Failed to save achiever.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(achiever) {
    const confirmed = window.confirm(
      `Delete ${achiever.name}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");

    try {
      const response = await api.delete(
        `/achievers/${achiever.id}`
      );

      setSuccess(response.message || "Achiever deleted successfully.");
      await loadAchievers();
    } catch (err) {
      setError(err.message || "Failed to delete achiever.");
    }
  }

  const filteredAchievers = achievers.filter((achiever) => {
    const query = search.toLowerCase().trim();

    return (
      achiever.name?.toLowerCase().includes(query) ||
      achiever.achievementClass?.toLowerCase().includes(query) ||
      String(achiever.rank).includes(query) ||
      achiever.description?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Award size={16} />
            <span>Administration</span>
            <span>/</span>
            <span className="text-gray-700">Achievers</span>
          </div>

          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Achievers
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Manage student achievements, rankings, and photos.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add achiever
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
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total achievers</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {achievers.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Award size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Displayed results</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {filteredAchievers.length}
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
              placeholder="Search by name, class, rank..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-sm text-gray-500">
            <LoaderCircle size={20} className="animate-spin" />
            Loading achievers...
          </div>
        ) : filteredAchievers.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
              <Award size={26} />
            </div>
            <h2 className="mt-4 font-semibold text-gray-900">
              {search ? "No matching achievers" : "No achievers yet"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {search
                ? "Try another search term."
                : "Add your first achiever to get started."}
            </p>
            {!search && (
              <button
                type="button"
                onClick={openCreateForm}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Add achiever
              </button>
            )}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] text-left">
              <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                  <th className="px-5 py-4 font-semibold">Achiever</th>
                  <th className="px-5 py-4 font-semibold">Class</th>
                  <th className="px-5 py-4 font-semibold">Rank</th>
                  <th className="px-5 py-4 font-semibold">Description</th>
                  <th className="px-5 py-4 text-right font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredAchievers.map((achiever) => (
                  <tr
                    key={achiever.id}
                    className="transition hover:bg-gray-50"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        {achiever.photo ? (
                          <img
                            src={getPhotoUrl(achiever.photo)}
                            alt={achiever.name}
                            className="h-12 w-12 rounded-xl object-cover"
                          />
                        ) : (
                          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                            <ImagePlus size={20} />
                          </div>
                        )}

                        <div>
                          <p className="font-semibold text-gray-900">
                            {achiever.name}
                          </p>
                          <p className="mt-1 text-xs text-gray-400">
                            {achiever.id}
                          </p>
                        </div>
                      </div>
                    </td>

                    <td className="px-5 py-4">
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700">
                        {achiever.achievementClass}
                      </span>
                    </td>

                    <td className="px-5 py-4">
                      <span className="inline-flex h-8 min-w-8 items-center justify-center rounded-lg bg-amber-50 px-2 font-bold text-amber-700">
                        {achiever.rank}
                      </span>
                    </td>

                    <td className="max-w-xs px-5 py-4 text-sm text-gray-500">
                      <p className="line-clamp-2">
                        {achiever.description || "—"}
                      </p>
                    </td>

                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => openEditForm(achiever)}
                          title="Edit achiever"
                          aria-label={`Edit ${achiever.name}`}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700"
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          type="button"
                          onClick={() => handleDelete(achiever)}
                          title="Delete achiever"
                          aria-label={`Delete ${achiever.name}`}
                          className="rounded-lg border border-gray-200 p-2 text-gray-600 transition hover:border-red-200 hover:bg-red-50 hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filteredAchievers.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
            Showing {filteredAchievers.length} of {achievers.length} achievers
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
            aria-labelledby="achiever-form-title"
            className="my-auto w-full max-w-2xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2
                  id="achiever-form-title"
                  className="text-lg font-bold text-gray-900"
                >
                  {editingAchiever ? "Edit achiever" : "Add achiever"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the achiever's information below.
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
                    htmlFor="achiever-photo"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Achiever photo {!editingAchiever && "*"}
                  </label>

                  <label
                    htmlFor="achiever-photo"
                    className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-gray-300 p-4 transition hover:border-blue-400 hover:bg-blue-50/30"
                  >
                    {photoPreview ? (
                      <img
                        src={photoPreview}
                        alt="Selected achiever"
                        className="h-20 w-20 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                        <ImagePlus size={28} />
                      </div>
                    )}

                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <Upload size={16} />
                        {photo ? "Change selected photo" : "Choose a photo"}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {editingAchiever
                          ? "Select a new photo only if you want to replace the current one."
                          : "A photo is required to create an achiever."}
                      </p>
                      {photo && (
                        <p className="mt-1 max-w-xs truncate text-xs text-blue-600">
                          {photo.name}
                        </p>
                      )}
                    </div>
                  </label>

                  <input
                    id="achiever-photo"
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoChange}
                    className="sr-only"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="achiever-name"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Student name *
                    </label>
                    <input
                      id="achiever-name"
                      name="name"
                      value={form.name}
                      onChange={handleFieldChange}
                      required
                      maxLength={150}
                      placeholder="Enter full name"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="achiever-class"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Achievement class *
                    </label>
                    <input
                      id="achiever-class"
                      name="achievementClass"
                      value={form.achievementClass}
                      onChange={handleFieldChange}
                      required
                      maxLength={100}
                      placeholder="e.g. Grade 12"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="achiever-rank"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Rank *
                    </label>
                    <input
                      id="achiever-rank"
                      name="rank"
                      type="number"
                      min="0"
                      step="1"
                      value={form.rank}
                      onChange={handleFieldChange}
                      required
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="achiever-description"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Description
                    </label>
                    <textarea
                      id="achiever-description"
                      name="description"
                      value={form.description}
                      onChange={handleFieldChange}
                      rows={4}
                      maxLength={2000}
                      placeholder="Describe the student's achievement..."
                      className="w-full resize-y rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
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
                    : editingAchiever
                      ? "Save changes"
                      : "Create achiever"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
