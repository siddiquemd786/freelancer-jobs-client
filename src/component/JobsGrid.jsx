// src/component/JobsGrid.jsx
import React from 'react'
import { Link } from 'react-router'


export default function JobsGrid({ jobs = [] }) {
  if (!Array.isArray(jobs)) jobs = []

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <header className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-semibold">All Jobs</h2>
        <p className="text-sm text-slate-500">
          Browse available jobs — click a card for full details.
        </p>
      </header>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {jobs.length === 0 ? (
          <div className="col-span-full rounded-lg border border-dashed border-slate-200 p-8 text-center text-slate-500">
            No jobs found.
          </div>
        ) : (
          jobs.map((job) => (
            <article
              key={job._id || job.id}
              className="group bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden flex flex-col"
            >
              <div className="h-40 sm:h-44 w-full bg-slate-100 overflow-hidden">
                <img
                  src={
                    job.coverImage ||
                    `https://picsum.photos/seed/${job._id || job.title}/800/600`
                  }
                  alt={job.title}
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                />
              </div>

              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-medium text-slate-900 leading-tight">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-slate-500">
                      {job.category}
                    </p>
                  </div>
                  <div className="text-xs text-slate-400 text-right">
                    <div>
                      By{' '}
                      <span className="text-slate-700 font-medium">
                        {job.postedBy || 'Unknown'}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="mt-3 text-sm text-slate-600 flex-1">
                  {truncate(job.summary || 'No description provided.', 140)}
                </p>

                <div className="mt-4 flex items-center justify-between">
                  <Link
                    to={`/allJobs/${job._id || job.id}`}
                    className="inline-flex items-center gap-2 px-3 py-2 bg-slate-900 text-white text-sm rounded-md hover:bg-slate-800"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  )
}

function truncate(text, max) {
  if (!text) return ''
  return text.length > max ? text.slice(0, max - 1).trimEnd() + '…' : text
}
