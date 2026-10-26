
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
  CalendarDays,
  MapPin,
  Clock,
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
  date: "",
  location: "",
};

function formatDate(value) {
  if (!value) return "Date not set";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return value;

  return parsed.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function toDateInput(value) {
  if (!value) return "";

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return "";

  return `${parsed.getFullYear()}-${String(
    parsed.getMonth() + 1
  ).padStart(2, "0")}-${String(parsed.getDate()).padStart(2, "0")}`;
}

export default function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [deletingId, setDeletingId] = useState(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [image, setImage] = useState(null);
  const [imagePreview, setImagePreview] = useState("");

  const loadEvents = useCallback(async () => {
    setLoading(true);
    setError("");

    try {
      const response = await api.get("/events");
      setEvents(response.data || []);
    } catch (err) {
      setError(err.message || "Failed to load events.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadEvents();
  }, [loadEvents]);

  function resetForm() {
    setForm(emptyForm);
    setImage(null);
    setImagePreview("");
    setEditingEvent(null);
    setIsFormOpen(false);
  }

  function openCreateForm() {
    setError("");
    setSuccess("");
    setForm(emptyForm);
    setImage(null);
    setImagePreview("");
    setEditingEvent(null);
    setIsFormOpen(true);
  }

  function openEditForm(event) {
    setError("");
    setSuccess("");
    setEditingEvent(event);
    setForm({
      title: event.title || "",
      description: event.description || "",
      date: toDateInput(event.date),
      location: event.location || "",
    });
    setImage(null);
    setImagePreview(event.image ? getImageUrl(event.image) : "");
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

    if (!form.title.trim()) {
      setError("Event title is required.");
      return;
    }

    if (!form.date) {
      setError("Event date is required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", form.title.trim());
    formData.append("description", form.description.trim());
    formData.append("date", form.date);
    formData.append("location", form.location.trim());

    if (image) {
      formData.append("image", image);
    }

    setSaving(true);

    try {
      const response = editingEvent
        ? await api.patch(`/events/${editingEvent.id}`, formData)
        : await api.post("/events", formData);

      setSuccess(
        response.message ||
          (editingEvent
            ? "Event updated successfully."
            : "Event created successfully.")
      );

      resetForm();
      await loadEvents();
    } catch (err) {
      setError(err.message || "Failed to save event.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(event) {
    const confirmed = window.confirm(
      `Delete the event "${event.title}"? This action cannot be undone.`
    );

    if (!confirmed) return;

    setError("");
    setSuccess("");
    setDeletingId(event.id);

    try {
      const response = await api.delete(`/events/${event.id}`);
      setSuccess(response.message || "Event deleted successfully.");
      await loadEvents();
    } catch (err) {
      setError(err.message || "Failed to delete event.");
    } finally {
      setDeletingId(null);
    }
  }

  const filteredEvents = events.filter((event) => {
    const query = search.toLowerCase().trim();

    return (
      event.title?.toLowerCase().includes(query) ||
      event.description?.toLowerCase().includes(query) ||
      event.location?.toLowerCase().includes(query)
    );
  });

  const upcomingCount = events.filter((event) => {
    if (!event.date) return false;
    const date = new Date(event.date);
    return !Number.isNaN(date.getTime()) && date >= new Date();
  }).length;

  return (
    <div className="space-y-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm text-gray-500">
            Administration / Events
          </p>
          <h1 className="mt-2 text-2xl font-bold text-gray-900">
            Events Management
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Publish and manage school events, dates, and locations.
          </p>
        </div>

        <button
          type="button"
          onClick={openCreateForm}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add event
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
            <CalendarDays size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Total events</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {events.length}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-green-50 text-green-600">
            <Clock size={24} />
          </div>
          <div>
            <p className="text-sm text-gray-500">Upcoming events</p>
            <p className="mt-1 text-2xl font-bold text-gray-900">
              {upcomingCount}
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
              placeholder="Search title, description, location..."
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center gap-3 py-16 text-sm text-gray-500">
            <LoaderCircle size={20} className="animate-spin" />
            Loading events...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div className="px-6 py-16 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-gray-100 text-gray-500">
              <CalendarDays size={26} />
            </div>
            <h2 className="mt-4 font-semibold text-gray-900">
              {search ? "No matching events" : "No events yet"}
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {search
                ? "Try another search term."
                : "Add your first school event to get started."}
            </p>
            {!search && (
              <button
                type="button"
                onClick={openCreateForm}
                className="mt-4 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
              >
                <Plus size={17} />
                Add event
              </button>
            )}
          </div>
        ) : (
          <div className="grid gap-5 p-5 sm:grid-cols-2 xl:grid-cols-3">
            {filteredEvents.map((event) => (
              <article
                key={event.id}
                className="overflow-hidden rounded-2xl border border-gray-200 transition hover:border-gray-300 hover:shadow-md"
              >
                <div className="relative flex h-48 items-center justify-center bg-gray-100">
                  {event.image ? (
                    <img
                      src={getImageUrl(event.image)}
                      alt={event.title}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex flex-col items-center gap-2 text-gray-400">
                      <ImagePlus size={36} />
                      <span className="text-xs">No event image</span>
                    </div>
                  )}
                </div>

                <div className="space-y-3 p-4">
                  <h2 className="text-lg font-bold text-gray-900">
                    {event.title}
                  </h2>

                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <CalendarDays size={16} className="shrink-0" />
                    <span>{formatDate(event.date)}</span>
                  </div>

                  {event.location && (
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <MapPin size={16} className="shrink-0" />
                      <span className="line-clamp-1">{event.location}</span>
                    </div>
                  )}

                  <p className="min-h-12 text-sm leading-6 text-gray-500">
                    {event.description || "No description provided."}
                  </p>

                  <div className="flex gap-2 border-t border-gray-100 pt-3">
                    <button
                      type="button"
                      onClick={() => openEditForm(event)}
                      className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-gray-700 transition hover:bg-blue-50 hover:text-blue-700"
                    >
                      <Pencil size={16} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDelete(event)}
                      disabled={deletingId === event.id}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-3 py-2.5 text-sm font-semibold text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                    >
                      {deletingId === event.id ? (
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

        {!loading && filteredEvents.length > 0 && (
          <div className="border-t border-gray-100 px-5 py-3 text-xs text-gray-500">
            Showing {filteredEvents.length} of {events.length} events
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
            aria-labelledby="event-form-title"
            className="my-auto w-full max-w-xl rounded-2xl bg-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-gray-100 px-6 py-5">
              <div>
                <h2
                  id="event-form-title"
                  className="text-lg font-bold text-gray-900"
                >
                  {editingEvent ? "Edit event" : "Add event"}
                </h2>
                <p className="mt-1 text-sm text-gray-500">
                  Enter the event details below.
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
                    htmlFor="event-image"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Event image
                  </label>

                  <label
                    htmlFor="event-image"
                    className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-gray-300 p-4 transition hover:border-blue-400 hover:bg-blue-50/30"
                  >
                    {imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Event preview"
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
                        {editingEvent
                          ? "Select a new image to replace the current one."
                          : "Choose an image for the event."}
                      </p>
                      {image && (
                        <p className="mt-1 max-w-xs truncate text-xs text-blue-600">
                          {image.name}
                        </p>
                      )}
                    </div>
                  </label>

                  <input
                    id="event-image"
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="sr-only"
                  />
                </div>

                <div>
                  <label
                    htmlFor="event-title"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Event title *
                  </label>
                  <input
                    id="event-title"
                    name="title"
                    value={form.title}
                    onChange={handleFieldChange}
                    required
                    maxLength={200}
                    placeholder="e.g. Annual Science Fair"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="event-date"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Event date *
                  </label>
                  <input
                    id="event-date"
                    name="date"
                    type="date"
                    value={form.date}
                    onChange={handleFieldChange}
                    required
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="event-location"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Location
                  </label>
                  <input
                    id="event-location"
                    name="location"
                    value={form.location}
                    onChange={handleFieldChange}
                    maxLength={200}
                    placeholder="e.g. School auditorium"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="event-description"
                    className="mb-2 block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="event-description"
                    name="description"
                    value={form.description}
                    onChange={handleFieldChange}
                    rows={4}
                    maxLength={3000}
                    placeholder="Describe the event..."
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
                    : editingEvent
                      ? "Save changes"
                      : "Create event"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
