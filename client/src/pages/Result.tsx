import { useEffect, useState } from "react"
import type { Project } from "../types"
import { ImageIcon, Loader2Icon, RefreshCcwIcon, SparkleIcon, VideoIcon } from "lucide-react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { GhostButton, PrimaryButton } from "../components/Buttons"
import toast from "react-hot-toast"
import api from "../configs/axios"
import { useAuth, useUser } from "@clerk/clerk-react"

const Result = () => {

const {projectId} = useParams()
const {getToken} = useAuth()
const {user, isLoaded} = useUser()
const navigate = useNavigate()  

const [project, setProjectData] = useState<Project>({} as Project)
const [loading, setLoading] = useState(true)
const [isGenerating, setIsGenerating] = useState(false)

const fetchProjectData = async ()=>{
 try {
  const token = await getToken()
  const {data} = await api.get(`/api/user/projects/${projectId}`,{
    headers: {Authorization: `Bearer ${token}`}
  })
  setProjectData(data.project)
  setIsGenerating(data.project.isGenerating)
  setLoading(false)
 } catch (error: any) {
  toast.error(error?.response?.data?.message || error.message);
  console.log(error);
 }
}

const handleGeneratedVideo = async ()=>{
  setIsGenerating(true)
  try {
    const token = await getToken();
    const {data} = await api.post('/api/project/video',{projectId},{
      headers: {Authorization: `Bearer ${token}`}
    })
    setProjectData(prev =>({...prev, generatedVideo:data.videoUrl, 
    isGenerating: false}))
    
    toast.success(data.message);
    setIsGenerating(false);

  } catch (error: any) {
     toast.error(error?.response?.data?.message || error.message);
  console.log(error);
  }
}

useEffect(()=>{
  if(user && !project.id){
    fetchProjectData()
  } else if(isLoaded && !user){
    navigate('/')
  }
},[user])

//fetch project every 10 seconds 
useEffect(()=>{
  if(user && isGenerating){
    const interval = setInterval(()=> {
      fetchProjectData()
    },10000);
    return ()=> clearInterval(interval)
  }
}, [user, isGenerating])
  return loading ? (
    <div className="h-screen w-full flex items-center justify-center bg-[#0b0f1f]">
      <Loader2Icon className="animate-spin text-indigo-500 size-9"/>
    </div>
  ):(
    <div className="min-h-screen text-white px-6 md:px-12 pt-24 
    bg-[radial-gradient(circle_at_80%_50%,rgba(124,58,237,0.25),transparent_40%)]
    bg-[#0b0f1f]">

      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <header className="flex justify-between items-center mb-12">
          <h1 className="text-3xl font-semibold">Generation Result</h1>

          <Link 
            to="/generate" 
            className="btn-secondary text-sm flex items-center gap-2 px-5 py-2.5 rounded-xl"
          >
            <RefreshCcwIcon className="w-4 h-4"/>
            <p className="max-sm:hidden">New Generation</p>
          </Link>
        </header>

        {/* Grid Layout */}
        <div className="grid lg:grid-cols-3 gap-12 items-start">

          {/* Main Result */}
          <div className="lg:col-span-2 flex">
            <div className="glass-panel p-4 rounded-2xl max-w-lg w-full">

              <div className={`${project?.aspectRatio === '9:16' ? 'aspect-9/16' : 'aspect-video'} 
              rounded-xl bg-gray-900 overflow-hidden`}>

                {project?.generatedVideo ?(
                  <video 
                    src={project.generatedVideo} 
                    controls 
                    autoPlay 
                    loop 
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <img 
                    src={project.generatedImage} 
                    alt="Generated Result" 
                    className="w-full h-full object-cover"
                  />
                )}

              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6 max-w-md">

            {/* Actions */}
            <div className="glass-panel p-6 rounded-2xl">
              <h3 className="text-lg font-semibold mb-5">Action</h3>

              <div className="flex flex-col gap-4">

                <a href={project.generatedImage} download>
                  <GhostButton 
                    disabled={!project.generatedImage} 
                    className="w-full justify-center rounded-xl py-3"
                  >
                    <ImageIcon className="size-4.5"/>
                    Download Image
                  </GhostButton>
                </a>

                <a href={project.generatedVideo} download>
                  <GhostButton 
                    disabled={!project.generatedVideo} 
                    className="w-full justify-center rounded-xl py-3"
                  >
                    <VideoIcon className="size-4.5"/>
                    Download Video
                  </GhostButton>
                </a>

              </div>
            </div>

            {/* Video Magic */}
            <div className="glass-panel p-6 rounded-2xl relative overflow-hidden">

              <div className="absolute top-0 right-0 p-6 opacity-10">
                <VideoIcon className="size-24"/>
              </div>

              <h3 className="text-lg font-semibold mb-2">Video Magic</h3>

              <p className="text-gray-400 text-sm mb-6">
                Turn this static image into dynamic video for social media.
              </p>

              {!project.generatedVideo ?(
                <PrimaryButton onClick={handleGeneratedVideo} disabled={isGenerating} className="w-full">
                  {isGenerating ? (
                    <>Generating Video</>
                  ) : (
                 <><SparkleIcon className="size-4"/> Generate video </> 
                  )}
                </PrimaryButton>
              ):(
                <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-400 text-center text-sm font-medium">
                  Video Generated Successfully!
                </div>
              )}

            </div>

          </div>

        </div>

      </div>
    </div>
  )
}

export default Result
