"use client";

import React, { useContext, useEffect, useMemo, useState } from "react";
import CalendarHeatmap from "react-calendar-heatmap";
import "react-calendar-heatmap/dist/styles.css";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { UsernameContext } from "../context/UsernameContext";
import { AiOutlineFire } from "react-icons/ai";

// Helper function to extract the year from a date
const getYearFromDate = (date: Date) => date.getFullYear();

const calculateLongestStreak = (dates: string[]) => {
  if (dates.length === 0) return 0;

  const parsedDates = dates.map(date => new Date(date)).sort((a, b) => a.getTime() - b.getTime());
  let longestStreak = 1;
  let currentStreak = 1;

  for (let i = 1; i < parsedDates.length; i++) {
    const prevDate = parsedDates[i - 1];
    const currDate = parsedDates[i];
    const diffInDays = (currDate.getTime() - prevDate.getTime()) / (1000 * 60 * 60 * 24);

    if (diffInDays === 1) {
      currentStreak++;
      longestStreak = Math.max(longestStreak, currentStreak);
    } else {
      currentStreak = 1;
    }
  }

  return longestStreak;
};

const ProblemCalendar: React.FC = () => {
  const { problemsPerDayMap, selectedYears, setSelectedYears } = useContext(UsernameContext);
  const currentYear = new Date().getFullYear();

  const heatmapValues = useMemo(
    () =>
      Array.from(problemsPerDayMap.entries()).map(([date, count]) => ({
        date: new Date(date),
        count,
      })),
    [problemsPerDayMap]
  );

  const dataByYear = useMemo(
    () =>
      heatmapValues.reduce((acc, { date, count }) => {
        const year = getYearFromDate(date);
        if (!acc[year]) {
          acc[year] = { submissions: 0, activeDays: 0, activeDates: [], data: [] };
        }
        acc[year].submissions += count;
        if (count > 0) {
          acc[year].activeDays += 1;
          acc[year].activeDates.push(date);
        }
        acc[year].data.push({ date, count });
        return acc;
      }, {} as { [key: number]: { submissions: number; activeDays: number; activeDates: Date[]; data: { date: Date; count: number }[] } }),
    [heatmapValues]
  );

  const years = useMemo(
    () =>
      Object.keys(dataByYear)
        .map(Number)
        .sort((a, b) => b - a),
    [dataByYear]
  );

  return (
    <TooltipProvider>
      <div className="w-full">
        {years.map(year => {
          const yearData = dataByYear[year]?.data || [];
          const totalSubmissions = dataByYear[year]?.submissions || 0;
          const totalActiveDays = dataByYear[year]?.activeDays || 0;
          const longestStreak = calculateLongestStreak(
            (dataByYear[year]?.activeDates || []).map(date =>
              date.toISOString().split("T")[0]
            )
          );
          const startDate = new Date(`${year}-01-01`);
          const endDate = new Date(`${year}-12-31`);

          return (
            <div
              key={year}
              className="transition-[max-height] duration-500 ease-in-out"
              style={{ 
                maxHeight: selectedYears.includes(year) ? '200px' : '0',
                overflow: 'hidden',
                marginBottom: selectedYears.includes(year) ? '24px' : '0'
              }}
            >
              <div className={`transition-opacity duration-500 ease-in-out ${
                !selectedYears.includes(year) ? 'opacity-0' : 'opacity-100'
              }`}>
                <h4
                  className="text-left text-gray-600 flex items-center"
                  style={{ fontSize: "12px", margin: "5px" }}
                >
                  <span className="font-bold">{year}</span> - {totalSubmissions}{" "}
                  Submissions, {totalActiveDays} Days,{" "}
                  <AiOutlineFire className="inline-block" /> {longestStreak} Days
                </h4>
                <CalendarHeatmap
                  startDate={startDate}
                  endDate={endDate}
                  values={yearData}
                  classForValue={value => {
                    if (!value || value.count === 0) {
                      return "color-empty";
                    }
                    return `color-scale-${Math.min(value.count, 4)}`;
                  }}
                  showMonthLabels={false}
                />
              </div>
            </div>
          );
        })}
        <style>{`
          .react-calendar-heatmap .color-empty {
            fill: var(--box-color);
          }
          .react-calendar-heatmap .color-scale-1 {
            fill: #c6e48b;
          }
          .react-calendar-heatmap .color-scale-2 {
            fill: #7bc96f;
          }
          .react-calendar-heatmap .color-scale-3 {
            fill: #239a3b;
          }
          .react-calendar-heatmap .color-scale-4 {
            fill: #196127;
          }

          .react-calendar-heatmap rect {
            rx: 1.5px;
            ry: 1.5px;
          }
        `}</style>
      </div>
    </TooltipProvider>
  );
};

export default ProblemCalendar;
