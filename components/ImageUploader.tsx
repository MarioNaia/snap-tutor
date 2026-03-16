"use client";

type Props = {
  onImageChange: (file: File | null) => void;
  preview: string;
};

export default function ImageUploader({ onImageChange, preview }: Props) {
  return (
    <div className="flex h-full flex-col rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Upload study image</h2>
        <p className="mt-1 text-sm text-slate-500">
          Add homework, notes, a worksheet, diagram, or screenshot.
        </p>
      </div>

      <label className="flex min-h-[180px] cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-300 bg-slate-50 p-6 text-center transition hover:border-indigo-400 hover:bg-white">
        <span className="mb-3 text-sm text-slate-600">
          Choose an image for SnapTutor to analyze
        </span>

        <span className="rounded-2xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white">
          Select image
        </span>

        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => onImageChange(e.target.files?.[0] || null)}
        />
      </label>

      <div className="mt-5 flex-1 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-3">
        {preview ? (
          <img
            src={preview}
            alt="Uploaded study material preview"
            className="h-full max-h-[70vh] w-full rounded-xl object-contain"
          />
        ) : (
          <div className="flex h-full min-h-[240px] items-center justify-center text-sm text-slate-500">
            No image uploaded yet.
          </div>
        )}
      </div>
    </div>
  );
}