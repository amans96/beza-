
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
  Images,
  Filter,
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
  title: "",
  description: "",
  tag: "",
  category: "",
  year: "",
};

export default function GalleryA() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [yearFilter, setYearFilter] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const loadGallery = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/gallery");
      setItems(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load gallery items.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadGallery();
  }, [loadGallery]);

  function resetForm() {
    setForm(emptyForm);
    setImage(null);
    setImagePreview("");
    setEditingItem(null);
    setIsFormOpen(false);
  }

  function openCreateForm() {
    setError("");
    setSuccess("");
    setForm(emptyForm);
    setImage(null);
    setImagePreview("");
    setEditingItem(null);
    setIsFormOpen(true);
  }

  function openEditForm(item) {
    setError("");
    setSuccess("");
    setEditingItem(item);
    setForm({
      title: item.title || "",
      description: item.description || "",
      tag: item.tag || "",
      category: item.category || "",
      year: item.year == null ? "" : String(item.year),
    });
    setImage(null);
    setImagePreview(item.image ? getImageUrl(item.image) : "");
    setIsFormOpen(true);
  }

  function handleFieldChange(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  }

  function handleImageChange(event) {
    const file = event.target.files?.[0];
    if (!file) return;

    setImage(file);
    setImagePreview(URL.createObjectURL(file));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    setError("");
    setSuccess("");

    if (!editingItem && !image) {
      setError("Please select an image for the gallery item.");
      return;
    }

    if (form.year.trim() !== "") {
      const year = Number(form.year);

      if (!Number.isInteger(year) || year < 1) {
        setError("Year must be a positive whole number.");
        return;
      }
    }

    const formData = new FormData();
    formData.append("title", form.title);
    formData.append("description", form.description);
    formData.append("tag", form.tag);
    formData.append("category", form.category);
    formData.append("year", form.year);

    if (image) {
      formData.append("image", image);
    }

    setSaving(true);

    try {
      const response = editingItem
        ? await api.patch(`/gallery/${editingItem.id}`, formData)
        : await api.post("/gallery", formData);

      setSuccess(
        response.message ||
          (editingItem
            ? "Gallery item updated successfully."
            : "Gallery item created successfully.")
      );

      resetForm();
      await loadGallery();
    } catch (err) {
      setError(err.message || "Failed to save gallery item.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(item) {
    const confirmed = window.confirm(
      `Delete this gallery item${item.title ? ` "${item.title}"` : ""}? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeletingId(item.id);

    try {
      const response = await api.delete(`/gallery/${item.id}`);
      setSuccess(response.message || "Gallery item deleted successfully.");
      await loadGallery();
    } catch (err) {
      setError(err.message || "Failed to delete gallery item.");
    } finally {
      setDeletingId(null);
    }
  }

  const categories = [
    ...new Set(items.map((item) => item.category).filter(Boolean)),
  ].sort();

  const years = [
    ...new Set(
      items
        .map((item) => item.year)
        .filter((year) => year != null)
        .map(String)
    ),
  ].sort((a, b) => Number(b) - Number(a));

  const filteredItems = items.filter((item) => {
    const query = search.toLowerCase().trim();

    const matchesSearch =
      !query ||
      item.title?.toLowerCase().includes(query) ||
      item.description?.toLowerCase().includes(query) ||
      item.tag?.toLowerCase().includes(query) ||
      item.category?.toLowerCase().includes(query) ||
      String(item.year ?? "").includes(query);

    const matchesCategory =
      !categoryFilter || item.category === categoryFilter;

    const matchesYear =
      !yearFilter || String(item.year ?? "") === yearFilter;

    return matchesSearch && matchesCategory && matchesYear;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-500">
            Administration / Gallery
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Gallery Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Upload, organize, and manage school photos.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add gallery item
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
            <Images size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total gallery items</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {items.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-purple-50 text-purple-600">
            <Filter size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Matching items</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {filteredItems.length}
            </p>
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-100 p-4 sm:p-5 lg:flex-row">
          <div className="relative min-w-0 flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="search"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search title, tag, category..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>

          <select
            value={categoryFilter}
            onChange={(event) => setCategoryFilter(event.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          <select
            value={yearFilter}
            onChange={(event) => setYearFilter(event.target.value)}
            className="rounded-xl border border-gray-200 px-3 py-3 text-sm outline-none focus:border-blue-500"
          >
            <option value="">All years</option>
            {years.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-sm text-gray-500">
            <LoaderCircle size={20} className="animate-spin" />
            Loading gallery...
          </div>
        ) : filteredItems.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
              <Images size={26} />
            </div>
            <h2 className="mt-4 font-semibold text-gray-900">
              {search || categoryFilter || yearFilter
                ? "No matching gallery items"
                : "Your gallery is empty"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {search || categoryFilter || yearFilter
                ? "Try changing your search or filters."
                : "Upload your first school photo to get started."}
            </p>
            {!search && !categoryFilter && !yearFilter && (
              <button
                type="button"
                onClick={openCreateForm}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Add gallery item
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredItems.map((item) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-2xl border border-gray-200 transition hover:border-gray-300 hover:shadow-md"
              >
                <div className="relative flex h-52 items-center justify-center bg-gray-100">
                  {item.image ? (
                    <img
                      src={getImageUrl(item.image)}
                      alt={item.title || "Gallery image"}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <ImagePlus size={36} className="text-gray-400" />
                  )}

                  {item.category && (
                    <span className="absolute left-3 top-3 rounded-lg bg-white/95 px-3 py-1.5 text-xs font-semibold text-gray-700 shadow-sm">
                      {item.category}
                    </span>
                  )}
                </div>

                <div className="space-y-3 p-4">
                  <div>
                    <h2 className="font-bold text-gray-900">
                      {item.title || "Untitled image"}
                    </h2>
                    <p className="mt-1 line-clamp-2 min-h-10 text-sm text-gray-500">
                      {item.description || "No description provided."}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center gap-2">
                    {item.tag && (
                      <span className="rounded-lg bg-blue-50 px-2.5 py-1.5 text-xs font-medium text-blue-700">
                        #{item.tag}
                      </span>
                    )}
                    {item.year != null && (
                      <span className="rounded-lg bg-gray-100 px-2.5 py-1.5 text-xs font-medium text-gray-600">
                        {item.year}
                      </span>
                    )}
                  </div>

                  <div className="flex gap-2 border-t border-gray-100 pt-3">
                    <button
                      type="button"
                      onClick={() => openEditForm(item)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      disabled={deletingId === item.id}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === item.id ? (
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

        {!loading && filteredItems.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
            Showing {filteredItems.length} of {items.length} gallery items
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
            aria-labelledby="gallery-form-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2
                  id="gallery-form-title"
                  className="text-lg font-bold text-gray-900"
                >
                  {editingItem ? "Edit gallery item" : "Add gallery item"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Upload an image and add its details.
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
                    htmlFor="gallery-image"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Image {!editingItem && "*"}
                  </label>

                  <label
                    htmlFor="gallery-image"
                    className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-gray-300 p-4 transition hover:border-blue-400 hover:bg-blue-50/30"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Gallery preview"
                        className="h-24 w-28 rounded-xl object-cover"
                      />
                    ) : (
                      <div className="flex h-24 w-28 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                        <ImagePlus size={28} />
                      </div>
                    )}

                    <div>
                      <p className="flex items-center gap-2 text-sm font-semibold text-gray-800">
                        <Upload size={16} />
                        {image ? "Change selected image" : "Choose an image"}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {editingItem
                          ? "Choose a replacement only if needed."
                          : "An image is required."}
                      </p>
                      {image && (
                        <p className="mt-1 max-w-xs truncate text-xs text-blue-600">
                          {image.name}
                        </p>
                      )}
                    </div>
                  </label>

                  <input
                    id="gallery-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gallery-title"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Title
                  </label>
                  <input
                    id="gallery-title"
                    name="title"
                    value={form.title}
                    onChange={handleFieldChange}
                    maxLength={200}
                    placeholder="e.g. Annual Sports Day"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label
                      htmlFor="gallery-category"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Category
                    </label>
                    <input
                      id="gallery-category"
                      name="category"
                      value={form.category}
                      onChange={handleFieldChange}
                      maxLength={100}
                      placeholder="e.g. Sports"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="gallery-tag"
                      className="mb-2 block text-sm font-medium text-gray-700"
                    >
                      Tag
                    </label>
                    <input
                      id="gallery-tag"
                      name="tag"
                      value={form.tag}
                      onChange={handleFieldChange}
                      maxLength={100}
                      placeholder="e.g. competition"
                      className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="gallery-year"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Year
                  </label>
                  <input
                    id="gallery-year"
                    name="year"
                    type="number"
                    min="1"
                    step="1"
                    value={form.year}
                    onChange={handleFieldChange}
                    placeholder="e.g. 2026"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="gallery-description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="gallery-description"
                    name="description"
                    value={form.description}
                    onChange={handleFieldChange}
                    rows={4}
                    maxLength={3000}
                    placeholder="Describe this photo..."
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
                    : editingItem
                      ? "Save changes"
                      : "Upload gallery item"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
