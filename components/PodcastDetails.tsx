"use client";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { Button } from "@/components/ui/button";
import { PodcastType } from "@/types";
import { useState } from "react";

type PodcastDetailsProps = {
  podcast: PodcastType;
};

const PodcastDetails = ({ podcast }: PodcastDetailsProps) => {
  const [currentAudio, setCurrentAudio] = useState<string | null>(null);

  return (
    <div className="max-w-5xl mx-auto p-6">
      {/* Podcast Header */}
      <Card className="shadow-lg bg-card border border-border">
        <CardHeader className="flex items-center gap-4">
          <Image
            src={podcast.image}
            alt={podcast.title}
            width={120}
            height={120}
            className="rounded-lg"
          />
          <div>
            <CardTitle className="text-2xl font-bold text-foreground">
              {podcast.title}
            </CardTitle>
            <p className="text-sm text-muted-foreground">
              Last Updated: {new Date(podcast.updated).toLocaleDateString()}
            </p>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{podcast.description}</p>
        </CardContent>
      </Card>

      {/* Seasons & Episodes in a Grid */}
      <div className="mt-6">
        {podcast.seasons.map((season) => (
          <div key={season.season} className="mb-8">
            <Accordion type="single" collapsible>
              <AccordionItem value="item-1">
                <AccordionTrigger>
                  <div className="flex items-center gap-4 w-full flex-1">
                    <Image
                      src={season.image}
                      alt={season.title}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                    <h2 className="text-xl font-semibold text-primary flex-1">
                      {season.title}
                    </h2>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  {/* Episodes Grid */}
                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {/* Season Title & Image */}
                    {season.episodes.map((episode) => (
                      <Card
                        key={episode.episode}
                        className="bg-muted p-4 flex flex-col justify-between"
                      >
                        <CardHeader>
                          <CardTitle className="text-lg text-foreground">
                            {episode.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent className="flex flex-col gap-2">
                          <p className="text-sm text-muted-foreground line-clamp-3">
                            {episode.description}
                          </p>
                          {/* Play Button */}
                          <Button
                            onClick={() => setCurrentAudio(episode.file)}
                            className="mt-auto bg-primary text-white w-full"
                          >
                            Play Episode {episode.episode}
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        ))}
      </div>

      {/* Floating Audio Player */}
      {currentAudio && (
        <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-card p-4 shadow-lg rounded-lg flex items-center gap-4 w-96">
          <audio controls autoPlay className="w-full">
            <source src={currentAudio} type="audio/mpeg" />
            Your browser does not support the audio element.
          </audio>
          <Button onClick={() => setCurrentAudio(null)} variant="destructive">
            Close
          </Button>
        </div>
      )}
    </div>
  );
};

export default PodcastDetails;
