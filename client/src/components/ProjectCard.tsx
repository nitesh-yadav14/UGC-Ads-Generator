import type React from "react"
import type { Project } from "../types"
import { useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import {
EllipsisIcon,
ImageIcon,
Loader2Icon,
PlaySquareIcon,
Share2Icon,
Trash2Icon
} from "lucide-react"
import { GhostButton, PrimaryButton } from "./Buttons"
import { useAuth } from "@clerk/clerk-react"
import toast from "react-hot-toast"
import api from "../configs/axios"   // ✅ FIXED IMPORT

const ProjectCard = (
{
gen,
setGenerations,
forCommunity = false
}: {
gen: Project,
setGenerations: React.Dispatch<React.SetStateAction<Project[]>>,
forCommunity?: boolean
}
) => {

const { getToken } = useAuth()
const navigate = useNavigate()
const [menuOpen, setMenuOpen] = useState(false)

useEffect(() => {
const close = () => setMenuOpen(false)
window.addEventListener("click", close)
return () => window.removeEventListener("click", close)
}, [])

const handleDelete = async (id: string) => {
const confirm = window.confirm("Are you sure you want to delete this project?")
if (!confirm) return

```
try {
  const token = await getToken()

  const { data } = await api.delete(`/api/project/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  setGenerations((generations) =>
    generations.filter((gen) => gen.id !== id)
  )

  toast.success(data.message)

} catch (error: any) {
  toast.error(error?.response?.data?.message || error.message)
  console.log(error)
}
```

}

const togglePublish = async (projectId: string) => {
try {
const token = await getToken()

```
  const { data } = await api.get(`/api/user/publish/${projectId}`, {
    headers: { Authorization: `Bearer ${token}` }
  })

  setGenerations((generations) =>
    generations.map((gen) =>
      gen.id === projectId
        ? { ...gen, isPublished: data.isPublished }
        : gen
    )
  )

  toast.success(data.isPublished ? "Project published" : "Project unpublished")

} catch (error: any) {
  toast.error(error?.response?.data?.message || error.message)
  console.log(error)
}
```

}

return ( <div className="mb-4 break-inside-avoid">

```
  <div className="relative bg-white/5 border border-white/10 rounded-xl overflow-hidden hover:border-white/20 transition group">

    <div className={`${gen?.aspectRatio === "9:16" ? "aspect-9/16" : "aspect-video"} relative overflow-hidden`}>

      {gen.generatedImage && (
        <img
          src={gen.generatedImage}
          alt={gen.productName}
          className={`absolute inset-0 w-full h-full object-cover transition duration-500 ${
            gen.generatedVideo
              ? "group-hover:opacity-0"
              : "group-hover:scale-105"
          }`}
        />
      )}

      {gen.generatedVideo && (
        <video
          src={gen.generatedVideo}
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition duration-500"
          onMouseEnter={(e) => e.currentTarget.play()}
          onMouseLeave={(e) => e.currentTarget.pause()}
        />
      )}

      {!gen.generatedImage && !gen.generatedVideo && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <Loader2Icon className="size-7 animate-spin" />
        </div>
      )}

      <div className="absolute left-3 top-3 flex gap-2 items-center">
        {gen.isGenerating && (
          <span className="text-xs px-2 py-1 bg-yellow-600/30 rounded-full">
            Generating
          </span>
        )}

        {gen.isPublished && (
          <span className="text-xs px-2 py-1 bg-green-600/30 rounded-full">
            Published
          </span>
        )}
      </div>

      {!forCommunity && (
        <div className="absolute right-3 top-3">

          <button
            onClick={(e) => {
              e.stopPropagation()
              setMenuOpen((prev) => !prev)
            }}
            className="bg-black/40 hover:bg-black/60 rounded-full p-1"
          >
            <EllipsisIcon className="size-6 text-white" />
          </button>

          {menuOpen && (
            <ul className="absolute right-0 mt-2 w-40 bg-black/80 backdrop-blur text-white border border-gray-500/50 rounded-lg shadow-lg py-1 z-50">

              {gen.generatedImage && (
                <a
                  href={gen.generatedImage}
                  download
                  className="flex gap-2 items-center px-4 py-2 hover:bg-white/10"
                >
                  <ImageIcon size={14} /> Download Image
                </a>
              )}

              {gen.generatedVideo && (
                <a
                  href={gen.generatedVideo}
                  download
                  className="flex gap-2 items-center px-4 py-2 hover:bg-white/10"
                >
                  <PlaySquareIcon size={14} /> Download Video
                </a>
              )}

              <button
                onClick={() => handleDelete(gen.id)}
                className="w-full flex gap-2 items-center px-4 py-2 hover:bg-red-950/30 text-red-400"
              >
                <Trash2Icon size={14} /> Delete
              </button>

            </ul>
          )}
        </div>
      )}

    </div>

    <div className="p-4">

      <h3 className="font-medium text-lg mb-1">{gen.productName}</h3>

      <p className="text-sm text-gray-400">
        Created: {new Date(gen.createdAt).toLocaleString()}
      </p>

      {!forCommunity && (
        <div className="mt-4 grid grid-cols-2 gap-3">

          <GhostButton
            onClick={() => {
              navigate(`/result/${gen.id}`)
              scrollTo(0, 0)
            }}
          >
            View Details
          </GhostButton>

          <PrimaryButton
            onClick={() => togglePublish(gen.id)}
          >
            {gen.isPublished ? "Unpublish" : "Publish"}
          </PrimaryButton>

        </div>
      )}

    </div>
  </div>
</div>
```

)
}

export default ProjectCard
