import React, { useContext } from "react";
import { UsernameContext } from "../context/UsernameContext";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FaCircleInfo } from "react-icons/fa6";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"


const UserContestData = () => {
  const { categorizedContests } = useContext(UsernameContext);

  if (!categorizedContests) {
    return null;
  }

  // Helper function to calculate the average solved percentage
  interface Contest {
    value: {
      solved: number;
      total: number;
    };
  }

  const calculateAverage = (contests: Contest[]): number => {
    // Filter out invalid contests where total is 0 or solved > total
    const validContests = contests.filter(
      (contest) => contest.value.total > 0 && contest.value.solved <= contest.value.total
    );

    if (validContests.length === 0) return 0;

    const totalPercentage = validContests.reduce((sum, contest) => {
      const percentageSolved = (contest.value.solved / contest.value.total) * 100;
      return sum + percentageSolved;
    }, 0);

    return validContests.length > 0 ? totalPercentage / validContests.length : 0;
  };

  // Calculate total contests attended
  const totalContestsAttended = Object.values(categorizedContests).reduce(
    (sum, contests) => sum + contests.length,
    0
  );

  if (totalContestsAttended === 0) {
    return null;
  }

  return (
    <>
      <p>Total Contests Attended: {totalContestsAttended}</p>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Div.</TableHead>
            <TableHead>Contests Attended</TableHead>
            <TableHead style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            Average Solved (7)
            <HoverCard>
              <HoverCardTrigger>
                <FaCircleInfo />
              </HoverCardTrigger>
              <HoverCardContent>
              {/* @ts-ignore */}
                might not be fully accurate, it&apos;s not me, it&apos;s cf.
              </HoverCardContent>
            </HoverCard>
          </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Object.entries(categorizedContests).map(([category, contests]) => {
            if (contests.length === 0) return null;

            // Calculate average solved for the division
            const averageSolvedPercentage = calculateAverage(contests);
            const averageSolved = (averageSolvedPercentage / 100) * 7; // Assuming each contest has 7 questions

            return (
              <TableRow key={category}>
                <TableCell className="font-medium">{category}</TableCell>
                <TableCell>{contests.length}</TableCell>
                <TableCell>{averageSolved.toFixed(2)} / 7  </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default UserContestData;
