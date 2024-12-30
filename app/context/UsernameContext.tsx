import React, { createContext, useState, useEffect, useContext } from "react";
import { ReactNode } from "react";
import axios from "axios";

interface UsernameContextType {
  username: string;
  setUsername: (username: string) => void;

  firstName: string;
  setFirstName: (firstName: string) => void;

  userphoto: string;
  setUserphoto: (userphoto: string) => void;

  problemsPerDayMap: Map<string, number>;

  totalSubmissions: number;
  setTotalSubmissions: (totalSubmissions: number) => void;

  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;

  contribution: number;
  friendOfCount: number;
  maxRank: string;
  maxRating: number;
  rating: number;
  rank: string;
  registrationTime: string;

  selectedYear: number;
  setSelectedYear: (selectedYear: number) => void;

  selectedYears: number[];
  setSelectedYears: (selectedYears: number[]) => void;

  contestsMap: Map<number, { solved: number; total: number }>;

  contestsDivMap: Map<string , { name: string; solved: number; total: number }>;

  showContestData: boolean;
  setShowContestData: (showContestData: boolean) => void;

  showUserContestData: boolean;
  setShowUserContestData: (showUserContestData: boolean) => void;

  categorizedContests: {
    "Div. 1": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 2": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 3": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 4": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 1 + Div. 2": { key: string; value: { name: string; solved: number; total: number } }[];
    "Other Contests": { key: string; value: { name: string; solved: number; total: number } }[];
  };
  setCategorizedContests: (categorizedContests: {
    "Div. 1": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 2": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 3": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 4": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 1 + Div. 2": { key: string; value: { name: string; solved: number; total: number } }[];
    "Other Contests": { key: string; value: { name: string; solved: number; total: number } }[];
  }) => void;
}

export const UsernameContext = createContext<UsernameContextType>({
  username: "",
  setUsername: () => {},
  userphoto: "",
  setUserphoto: () => {},
  problemsPerDayMap: new Map(),
  firstName: "",
  setFirstName: () => {},
  isLoading: true,
  setIsLoading: () => {},
  contribution: 0,
  friendOfCount: 0,
  maxRank: "",
  maxRating: 0,
  rating: 0,
  rank: "",
  registrationTime: "",
  totalSubmissions: 0,
  setTotalSubmissions: () => {},
  selectedYear: new Date().getFullYear(),
  setSelectedYear: () => {},
  selectedYears: [],
  setSelectedYears: () => {},
  contestsMap: new Map(),
  contestsDivMap: new Map(),
  showContestData: true,
  setShowContestData: () => {},
  showUserContestData: true,
  setShowUserContestData: () => {},
  categorizedContests: {
    "Div. 1": [],
    "Div. 2": [],
    "Div. 3": [],
    "Div. 4": [],
    "Div. 1 + Div. 2": [],
    "Other Contests": [],
  },
  setCategorizedContests: () => {},
});

export const UsernameProvider = ({ children }: { children: ReactNode }) => {
  const [username, setUsername] = useState("");
  const [userphoto, setUserphoto] = useState("");
  const [problemsPerDayMap, setProblemsPerDayMap] = useState<Map<string, number>>(new Map());
  const [firstName, setFirstName] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [contribution, setContribution] = useState(0);
  const [friendOfCount, setFriendOfCount] = useState(0);
  const [maxRank, setMaxRank] = useState("");
  const [maxRating, setMaxRating] = useState(0);
  const [rating, setRating] = useState(0);
  const [rank, setRank] = useState("");
  const [registrationTime, setRegistrationTime] = useState("");
  const [totalSubmissions, setTotalSubmissions] = useState(0);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [selectedYears, setSelectedYears] = useState<number[]>([]);
  const [contestsDivMap, setContestsDivMap] = useState<Map<string, { name: string; solved: number; total: number }>>(new Map());
  interface Problem {
    contestId: number;
    // Add other properties if needed
  }
  
  const [allProblems, setAllProblems] = useState<Problem[]>([]);
  const [contestsMap, setContestsMap] = useState<Map<number, { solved: number; total: number }>>(new Map());
  const [showContestData, setShowContestData] = useState(true);
  const [showUserContestData, setShowUserContestData] = useState(true);
  const [categorizedContests, setCategorizedContests] = useState<{
    "Div. 1": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 2": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 3": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 4": { key: string; value: { name: string; solved: number; total: number } }[];
    "Div. 1 + Div. 2": { key: string; value: { name: string; solved: number; total: number } }[];
    "Other Contests": { key: string; value: { name: string; solved: number; total: number } }[];
  }>({
    "Div. 1": [],
    "Div. 2": [],
    "Div. 3": [],
    "Div. 4": [],
    "Div. 1 + Div. 2": [],
    "Other Contests": [],
  });

  
  useEffect(() => {
    const fetchAllProblems = async () => {
      const allProblemsResponse = await axios.get('https://codeforces.com/api/problemset.problems');
      setAllProblems(allProblemsResponse.data.result.problems);
      // console.log("allProblems", allProblems);
    };
    fetchAllProblems();
  }, []);
  // i have no idea why this is not working for 1st time , hence this dummy useEffect to do :fix this 
  
  useEffect(() => {
    
    const fetchUserData = async () => {
      if (!username) return;
      
      // Clear previous data and set loading immediately when username changes
      setUserphoto("");
      setFirstName("");
      setContribution(0);
      setFriendOfCount(0);
      setMaxRank("");
      setMaxRating(0);
      setRating(0);
      setRank("");
      setRegistrationTime("");
      setTotalSubmissions(0);
      setProblemsPerDayMap(new Map());
      setContestsDivMap(new Map());
      setCategorizedContests({
        "Div. 1": [],
        "Div. 2": [],
        "Div. 3": [],
        "Div. 4": [],
        "Div. 1 + Div. 2": [],
        "Other Contests": [],
      });
      
      try {
        // Start loading
        setIsLoading(true);
        
        // Fetch data
        const response = await axios.get(
          `https://codeforces.com/api/user.info?handles=${username}`
        );
        const userData = response.data.result[0];

        const allProblemsResponse = await axios.get('https://codeforces.com/api/problemset.problems');
        setAllProblems(allProblemsResponse.data.result.problems);

        const userRatingResponse = await axios.get('https://codeforces.com/api/user.rating?handle=' + username);
        const contestNames: { [key: number]: string } = {};
        if(userRatingResponse.data.result){
          userRatingResponse.data.result.forEach((contest: { contestId: number; contestName: string }) => {
            contestNames[contest.contestId] = contest.contestName;
          });
        }        
        // console.log("contestNames", contestNames);

        setUserphoto(userData.titlePhoto);
        // console.log(userData);
        setFirstName(userData.firstName || "");
        setContribution(userData.contribution);
        setFriendOfCount(userData.friendOfCount);
        setMaxRank(userData.maxRank);
        setMaxRating(userData.maxRating);
        setRating(userData.rating);
        setRank(userData.rank);

        const registrationDate = new Date(userData.registrationTimeSeconds * 1000);
        const now = new Date();
        const diffTime = Math.abs(now.getTime() - registrationDate.getTime());
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30);
        const diffYears = Math.floor(diffDays / 365);

        setRegistrationTime(
          diffYears > 0
            ? `${diffYears} years`
            : diffMonths > 0
            ? `${diffMonths} months`
            : diffWeeks > 0
            ? `${diffWeeks} weeks`
            : `${diffDays} days`
        );

        const problemsResponse = await axios.get(
          `https://codeforces.com/api/user.status?handle=${username}`
        );
        const userProblems = problemsResponse.data.result;

        // Process problemsPerDayMap
        const tempProblemsPerDayMap = new Map<string, number>();

        userProblems.forEach((problem: { creationTimeSeconds: number }) => {
          const creationDate = new Date(problem.creationTimeSeconds * 1000);
          const formattedDate = `${creationDate.getFullYear()}-${creationDate.getMonth() + 1}-${creationDate.getDate()}`;
          const currentCount = tempProblemsPerDayMap.get(formattedDate) || 0;
          tempProblemsPerDayMap.set(formattedDate, currentCount + 1);
        });

        setProblemsPerDayMap(tempProblemsPerDayMap);
        // console.log("tempProblemsPerDayMap", tempProblemsPerDayMap);
        let totalSubmissionsCount = 0;
        tempProblemsPerDayMap.forEach((count) => {
          totalSubmissionsCount += count;
        });
        setTotalSubmissions(totalSubmissionsCount);

        interface UserProblem {
          author: {
            participantType: string;
          };
          contestId: number;
          creationTimeSeconds: number;
          verdict: string;
        }

        const filteredContestSubmissions = userProblems.filter(
          (problem: UserProblem) => problem.author.participantType === "CONTESTANT"
        );

        const tempContestsMap = new Map<number, { solved: number; total: number }>();
        const tempContestsDivMap = new Map<string, { name: string; solved: number; total: number }>();

        filteredContestSubmissions.forEach((problem: { contestId: number; verdict: string }) => {
          const { contestId, verdict } = problem;
          if (verdict === 'OK') {
            if (tempContestsMap.has(contestId)) {
              tempContestsMap.get(contestId)!.solved += 1;
            } else {
              tempContestsMap.set(contestId, { solved: 1, total: allProblems.filter(p => p.contestId === contestId).length });
            }
          } else {
            if (!tempContestsMap.has(contestId)) {
              tempContestsMap.set(contestId, { solved: 0, total: allProblems.filter(p => p.contestId === contestId).length });
            }
          }
        });

        // console.log("tempContestsMap", tempContestsMap);
        const tempCategorizedContests: {
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
        tempContestsMap.forEach((value, key) => {
          const contestName = contestNames[key] || "Contest " + key;
          tempContestsDivMap.set(key.toString(), {
            name: contestName,
            solved: value.solved,
            total: value.total,
          });
          const contestData = { key: key.toString(), value: { name: contestName, solved: value.solved, total: value.total } };
          if (contestName.includes("Div. 1 + Div. 2")) {
            tempCategorizedContests["Div. 1 + Div. 2"].push(contestData);
          } else if (contestName.includes("Div. 1")) {
            tempCategorizedContests["Div. 1"].push(contestData);
          } else if (contestName.includes("Div. 2")) {
            tempCategorizedContests["Div. 2"].push(contestData);
          } else if (contestName.includes("Div. 3")) {
            tempCategorizedContests["Div. 3"].push(contestData);
          } else if (contestName.includes("Div. 4")) {
            tempCategorizedContests["Div. 4"].push(contestData);
          } else {
            tempCategorizedContests["Other Contests"].push(contestData);
          }
        });
        setContestsDivMap(tempContestsDivMap);
        setCategorizedContests(tempCategorizedContests);
        // console.log("tempContestsDivMap", tempContestsDivMap);
      }
      catch (error) {
        // Handle error
        console.error("Failed to fetch user data");
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [username]);

  return (
    <UsernameContext.Provider
      value={{
        username,
        setUsername,
        userphoto,
        setUserphoto,
        problemsPerDayMap,
        firstName,
        setFirstName,
        isLoading,
        setIsLoading,
        contribution,
        friendOfCount,
        maxRank,
        maxRating,
        rating,
        rank,
        registrationTime,
        totalSubmissions,
        setTotalSubmissions,
        selectedYear,
        setSelectedYear,
        selectedYears,
        setSelectedYears,
        contestsMap , 
        contestsDivMap ,
        showContestData,
        setShowContestData,
        showUserContestData,
        setShowUserContestData,
        categorizedContests,
        setCategorizedContests,
      }}
    >
      {children}
    </UsernameContext.Provider>
  );
};
