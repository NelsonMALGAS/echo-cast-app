"use client"

import ErrorComponent from "@/components/Error"
import LoadingSpinner from "@/components/LoadingSpinner"
import PodcastDetails from "@/components/PodcastDetails"
import { ErrorType, PodcastType } from "@/types"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"

const SinglePodcastDetailsPage = () => {
 const { id } = useParams()
 const [podcast, setPodcast] = useState<PodcastType | null>(null)
 const [loadingPodcast, setLoadingPodcast] = useState<boolean>(true)
 const [errorPodcast, setErrorPodcast] = useState<ErrorType | null>(null)

 useEffect(() => {
  setLoadingPodcast(true)
  setErrorPodcast(null)
  const fetchSinglePodcast = async () => {

    try {
      const response = await fetch(`https://podcast-api.netlify.app/id/${id}`)
    const data = await response.json()
    setPodcast(data)
    } catch (error) {
      if(error instanceof Error){
        setErrorPodcast({ message : `Error fetching show: ${error.message}`, statusCode: 401})
      }
    }finally{
      setLoadingPodcast(false)
    }
  }
  fetchSinglePodcast()
 },[id])

 if(loadingPodcast){
  return <LoadingSpinner />
 }

 if(errorPodcast){
  return <ErrorComponent code={errorPodcast.statusCode ?? 400} message={errorPodcast.message} />
 }

  return (
    podcast && <PodcastDetails podcast={podcast} />
  )
}

export default SinglePodcastDetailsPage