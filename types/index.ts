export type PageLinkType = {
    id: number;
    name: string;
    href: string;
    icon: string;
}

export type ErrorType ={
    message: string;
    statusCode: number | null | undefined;
}

export type StatusType =  "idle" | "pending" | "success" | "error"

export type PreviewShowType = {
    id:string
    title:string
    description:string
    seasons:number
    image:string
    genres:number[]
    updated:string | Date
}

export type PodcastType = {
    id: string;
    title: string;
    description: string;
    seasons: SeasonType[];
    image: string;
    genres: string[];
    updated: string;
  };
  
  export type SeasonType = {
    season: number;
    title: string;
    image: string;
    episodes: EpisodeType[];
  };
  
  export type EpisodeType = {
    title: string;
    description: string;
    episode: number;
    file: string;
  };
  

  export type GraphType = "bar" | "line" | "pie" | "area" | "scatter"
  export type RecentActivityType = {
    id: number;
    action: string;
    date: string;
 }

