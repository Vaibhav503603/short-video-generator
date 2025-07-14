"use client";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import { useState } from "react";
import React from "react";
import { Input } from "@nextui-org/react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { SparklesIcon } from "lucide-react";

const suggestions = [
  "Historic Story",
  "Kids story",
  "Movie Stories",
  "AI innovations",
  "Space Mysteries",
  "Horror Stories",
  "Mythological Tales",
  "Tech Breakthroughs",
  "True Crime Stories",
  "Fantasy Adventures",
  "Science Experiments",
  "Motivational Stories",
];

function Topic({ onHandleInputChange }) {
  const [selectedTopic, setSelectedTopic] = useState();

  const GenerateScript = async () => {
    if (!selectedTopic) {
      console.warn("⚠️ No topic selected.");
      return;
    }
    try {
      const result = await axios.post("/api/generate-script", {
        topic: selectedTopic,
      });
      console.log("✅ Script Response:", result.data);
    } catch (error) {
      console.error("❌ Axios Error:", error?.response?.data || error.message);
    }
  };

  return (
    <div>
      <h2 className="mb-1">Project Title</h2>
      <Input
        placeholder="Enter project title"
        onChange={(e) => onHandleInputChange("title", e.target.value)}
      />

      <div className="mt-5">
        <h2>Video Topic</h2>
        <p className="text-sm text-gray-600">Select topic for your video</p>

        <Tabs defaultValue="suggestion" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="suggestion">Suggestions</TabsTrigger>
            <TabsTrigger value="your_topic">Your Topic</TabsTrigger>
          </TabsList>

          <TabsContent value="suggestion">
            <div>
              {suggestions.map((suggestion, index) => (
                <Button
                  variant="outline"
                  key={index}
                  className={`m-1 ${selectedTopic === suggestion ? "bg-secondary" : ""}`}
                  onClick={() => {
                    setSelectedTopic(suggestion);
                    onHandleInputChange("topic", suggestion);
                  }}
                >
                  {suggestion}
                </Button>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="your_topic">
            <Textarea
              placeholder="Enter your topic"
              onChange={(e) => {
                setSelectedTopic(e.target.value);
                onHandleInputChange("topic", e.target.value);
              }}
            />
          </TabsContent>
        </Tabs>
      </div>

      <Button className="mt-3" size="sm" onClick={GenerateScript}>
        <SparklesIcon className="mr-2" /> Generate Script
      </Button>
    </div>
  );
}

export default Topic;
