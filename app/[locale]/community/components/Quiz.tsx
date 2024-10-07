"use client"; // Mark the component as a Client Component

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { QuizInterests } from "./QuizInterestTypes";

type Interests =
  | "chat"
  | "reporting"
  | "webdev"
  | "design"
  | "release"
  | "sig"
  | "docs";

export interface QuizProps {
  translations: QuizInterests;
}

const Quiz = ({ translations: t }: QuizProps) => {
  const [selectedInterest, setSelectedInterest] = useState<Interests | null>(
    null
  );

  const handleSelect = (interest: Interests) => {
    setSelectedInterest(interest);
  };

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex flex-col md:flex-row md:space-x-4">
        {/* Left column with buttons */}
        <div className="md:w-1/2 w-full">
          <Button
            className="mb-2 mr-2 w-full md:w-auto"
            variant={"outline"}
            onClick={() => handleSelect("chat")}
          >
            {t.chatting}
          </Button>

          <Button
            className="mb-2 mr-2 w-full md:w-auto"
            variant={"outline"}
            onClick={() => handleSelect("reporting")}
          >
            {t.bugs}
          </Button>

          <Button
            className="mb-2 mr-2 w-full md:w-auto"
            variant={"outline"}
            onClick={() => handleSelect("webdev")}
          >
            {t.webdev}
          </Button>

          <Button
            className="mb-2 mr-2 w-full md:w-auto"
            variant={"outline"}
            onClick={() => handleSelect("design")}
          >
            {t.graphics}
          </Button>

          <Button
            className="mb-2 mr-2 w-full md:w-auto"
            variant={"outline"}
            onClick={() => handleSelect("release")}
          >
            {t.release}
          </Button>

          <Button
            className="mb-2 mr-2 w-full md:w-auto"
            variant={"outline"}
            onClick={() => handleSelect("sig")}
          >
            {t.sig}
          </Button>

          <Button
            className="mb-2 mr-2 w-full md:w-auto"
            variant={"outline"}
            onClick={() => handleSelect("docs")}
          >
            {t.docs}
          </Button>
        </div>

        {/* Right column with the relevant answer */}
        <div className="md:w-1/2 w-full border p-4 rounded-lg mt-4 md:mt-0 prose prose-ol:text-white prose-p:text-white">
          {selectedInterest === "chat" && <p>{t.chattingDescription}</p>}
          {selectedInterest === "reporting" && <p>{t.bugsDescription}</p>}
          {selectedInterest === "webdev" && <p>{t.webDevDescription}</p>}
          {selectedInterest === "design" && <p>{t.graphicsDescription}</p>}
          {selectedInterest === "release" && <p>{t.releaseDescription}</p>}
          {selectedInterest === "sig" && <p>{t.sigDescription}</p>}
          {selectedInterest === "docs" && <p>{t.docsDescription}</p>}
          {!selectedInterest && <p>{t.noSelection}</p>}
        </div>
      </div>
    </div>
  );
};

export default Quiz;
