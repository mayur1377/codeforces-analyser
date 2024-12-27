import React, { useContext } from "react";
import { UsernameContext } from "../context/UsernameContext";
import { Progress } from "@/components/ui/progress";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { CiSquareInfo } from "react-icons/ci";

const ContestData = () => {
  const { contestsDivMap } = useContext(UsernameContext);

  const handleContestClick = (contestId: string) => {
    window.open(`https://codeforces.com/contest/${contestId}`, "_blank");
  };

  const categorizedContests: {
    "Div. 1": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 2": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 3": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 4": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 1 + Div. 2": { key: string; value: { name: string; solved: number; total: number } }[];
    "Other Contests": { key: string; value: { name: string; solved: number; total: number } }[];
  } = {
    "Div. 1": [],
    "Div. 2": [],
    "Div. 3": [],
    "Div. 4": [],
    "Div. 1 + Div. 2": [],
    "Other Contests": [],
  };

  Array.from(contestsDivMap.entries()).forEach(([key, value]) => {
    if (value.name.includes("Div. 1 + Div. 2")) {
      categorizedContests["Div. 1 + Div. 2"].push({ key, value });
    } else if (value.name.includes("Div. 1")) {
      categorizedContests["Div. 1"].push({ key, value });
    } else if (value.name.includes("Div. 2")) {
      categorizedContests["Div. 2"].push({ key, value });
    } else if (value.name.includes("Div. 3")) {
      categorizedContests["Div. 3"].push({ key, value });
    } else if (value.name.includes("Div. 4")) {
      categorizedContests["Div. 4"].push({ key, value });
    } else {
      categorizedContests["Other Contests"].push({ key, value });
    }
  });

  const renderContests = (contests: { key: string; value: { name: string; solved: number; total: number } }[]) => {
    return contests.map(({ key, value }: { key: string; value: { name: string; solved: number; total: number } }) => {
      const progressValue = (value.solved / value.total) * 100;
      return (
        <li key={key} style={{ marginBottom: "10px" }}>
          <strong onClick={() => handleContestClick(key)} style={{ cursor: "pointer", fontSize: "0.9em" }}>
            {value.name}
          </strong>
          <Progress value={progressValue} style={{ marginTop: "5px" }} />
          <small>{value.solved}/{value.total} solved</small>
        </li>
      );
    });
  };

  return (
    <Accordion type="single" collapsible>
      {Object.entries(categorizedContests).map(([category, contests]) => {
        const isOtherContests = category === "Other Contests";

        return (
          contests.length > 0 && (
            <AccordionItem key={category} value={category}>
              {isOtherContests ? (
                <AccordionTrigger>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <span>Other Contests</span>
                    <HoverCard>
                      <HoverCardTrigger asChild>
                        <span style={{ cursor: "pointer" }}>
                          <CiSquareInfo size={18} />
                        </span>
                      </HoverCardTrigger>
                      <HoverCardContent>
                        <p style={{ fontSize: "0.9em", margin: 0 }}>
                          for some reason , i found some missing contests in the API responses. gotta check it later on!
                        </p>
                      </HoverCardContent>
                    </HoverCard>
                  </div>
                </AccordionTrigger>
              ) : (
                <AccordionTrigger>{category}</AccordionTrigger>
              )}
              <AccordionContent>
                <ul style={{ listStyleType: "none", padding: 0 }}>
                  {renderContests(contests)}
                </ul>
              </AccordionContent>
            </AccordionItem>
          )
        );
      })}
    </Accordion>
  );
};

export default ContestData;
