import { createContext, useState, useEffect } from "react";
import { ReactNode } from "react";
import { codeforcesApi } from "../services/codeforcesApi";
import { formatRegistrationTime } from "../utils/dateUtils";

interface ContestData {
  key: string;
  value: {
    name: string;
    solved: number;
    total: number;
  };
}

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
    [K in 'Div. 1' | 'Div. 2' | 'Div. 3' | 'Div. 4' | 'Div. 1 + Div. 2' | 'Other Contests']: ContestData[];
  };
  setCategorizedContests: (categorizedContests: {
    [K in 'Div. 1' | 'Div. 2' | 'Div. 3' | 'Div. 4' | 'Div. 1 + Div. 2' | 'Other Contests']: ContestData[];
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

  const resetUserData = () => {
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
  };

  const processContestData = (
    contestSubmissions: any[],
    allProblems: Problem[],
    contestNames: { [key: number]: string }
  ) => {
    const tempContestsMap = new Map<number, { solved: number; total: number }>();
    const tempContestsDivMap = new Map<string, { name: string; solved: number; total: number }>();
    const tempCategorizedContests = {
      "Div. 1": [],
      "Div. 2": [],
      "Div. 3": [],
      "Div. 4": [],
      "Div. 1 + Div. 2": [],
      "Other Contests": [],
    };

    // Process contest submissions
    contestSubmissions.forEach((problem) => {
      const { contestId, verdict } = problem;
      if (!tempContestsMap.has(contestId)) {
        tempContestsMap.set(contestId, {
          solved: verdict === 'OK' ? 1 : 0,
          total: allProblems.filter(p => p.contestId === contestId).length
        });
      } else if (verdict === 'OK') {
        tempContestsMap.get(contestId)!.solved += 1;
      }
    });

    // Categorize contests
    tempContestsMap.forEach((value, key) => {
      const contestName = contestNames[key] || `Contest ${key}`;
      const contestData = {
        key: key.toString(),
        value: { name: contestName, ...value }
      };

      tempContestsDivMap.set(key.toString(), {
        name: contestName,
        ...value
      });

      // Categorize based on division
      if (contestName.includes("Div. 1 + Div. 2")) {
      // @ts-ignore
        tempCategorizedContests["Div. 1 + Div. 2"].push(contestData);
      } else if (contestName.includes("Div. 1")) {
      // @ts-ignore
        tempCategorizedContests["Div. 1"].push(contestData);
      } else if (contestName.includes("Div. 2")) {
      // @ts-ignore
        tempCategorizedContests["Div. 2"].push(contestData);
      } else if (contestName.includes("Div. 3")) {
      // @ts-ignore
        tempCategorizedContests["Div. 3"].push(contestData);
      } else if (contestName.includes("Div. 4")) {
      // @ts-ignore
        tempCategorizedContests["Div. 4"].push(contestData);
      } else {
      // @ts-ignore
        tempCategorizedContests["Other Contests"].push(contestData);
      }
    });

    return { tempContestsDivMap, tempCategorizedContests };
  };

  useEffect(() => {
    const fetchUserData = async () => {
      if (!username) return;
      
      resetUserData();
      setIsLoading(true);

      try {
        // Fetch all required data in parallel
        const [userData, allProblemsData, userRatingData, userSubmissions] = await Promise.all([
          codeforcesApi.getUserInfo(username),
          codeforcesApi.getAllProblems(),
          codeforcesApi.getUserRating(username),
          codeforcesApi.getUserSubmissions(username)
        ]);

        // Process user info
        setUserphoto(userData.titlePhoto);
        setFirstName(userData.firstName || "");
        setContribution(userData.contribution);
        setFriendOfCount(userData.friendOfCount);
        setMaxRank(userData.maxRank);
        setMaxRating(userData.maxRating);
        setRating(userData.rating);
        setRank(userData.rank);
        setRegistrationTime(formatRegistrationTime(userData.registrationTimeSeconds));

        // Process problems per day
        const tempProblemsPerDayMap = new Map<string, number>();
        userSubmissions.forEach((problem: { creationTimeSeconds: number }) => {
          const date = new Date(problem.creationTimeSeconds * 1000);
          const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          tempProblemsPerDayMap.set(formattedDate, (tempProblemsPerDayMap.get(formattedDate) || 0) + 1);
        });
        setProblemsPerDayMap(tempProblemsPerDayMap);
        setTotalSubmissions([...tempProblemsPerDayMap.values()].reduce((a, b) => a + b, 0));

        // Process contest data
        const contestNames = userRatingData.reduce((acc: any, contest: any) => {
          acc[contest.contestId] = contest.contestName;
          return acc;
        }, {});

        const filteredContestSubmissions = userSubmissions.filter(
          (problem: any) => problem.author.participantType === "CONTESTANT"
        );

        const { tempContestsDivMap, tempCategorizedContests } = processContestData(
          filteredContestSubmissions,
          allProblemsData,
          contestNames
        );

        setContestsDivMap(tempContestsDivMap);
        setCategorizedContests(tempCategorizedContests);

      } catch (error) {
        console.error("Failed to fetch user data:", error);
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
