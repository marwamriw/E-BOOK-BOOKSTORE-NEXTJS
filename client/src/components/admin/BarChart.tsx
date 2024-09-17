"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

export default function BarChart() {
  const chartRef = useRef(null);
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    // Fetch book data
    async function fetchBookData() {
      try {
        const response = await fetch("http://localhost:4000/api/books");
        if (!response.ok) {
          console.error("bad response");
          return;
        }
        const result = await response.json();
        console.log("API result:", result);

        // Extract data array from the result
        if (Array.isArray(result)) {
          setBookData(result);
        } else if (result && Array.isArray(result.data)) {
          // Extract data array from the result if needed
          setBookData(result.data);
        } else {
          console.error("Data is not in expected format:", result);
        }
      } catch (error) {
        console.error("Error fetching books:", error);
      }
    }

    fetchBookData();
  }, []);

  useEffect(() => {
    if (chartRef.current && chartRef.current.chart) {
      chartRef.current.chart.destroy();
    }

    const context = chartRef.current?.getContext("2d");
    if (!context) {
      console.error("Failed to get canvas context");
      return;
    }

    // Ensure bookData is an array before mapping
    const label = Array.isArray(bookData)
      ? bookData.map((items) => items.title)
      : [];
    const data = Array.isArray(bookData)
      ? bookData.map((items) => items.price)
      : [];

    const newChart = new Chart(context, {
      type: "bar",
      data: {
        labels: label,
        datasets: [
          {
            // barPercentage: 1.5 ,
            barThickness: 30,
            label: "Book Prices",
            data: data,
            backgroundColor: [
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderColor: [
              "rgb(255, 99, 132)",
              "rgb(255, 159, 64)",
              "rgb(255, 205, 86)",
              "rgb(75, 192, 192)",
              "rgb(54, 162, 235)",
              "rgb(153, 102, 255)",
              "rgb(201, 203, 207)",
            ],
            borderWidth: 1,
            borderRadius: 12,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: "Book Prices Info",
          },
        },
        layout: {
          padding: 20,
        },
        responsive: true,
        scales: {
          x: {
            type: "category",
          },
          y: {
            beginAtZero: true,
          },
        },
      },
    });

    chartRef.current.chart = newChart;
  }, [bookData]);

  return (
    <div className="flex justify-center items-center ml-10 mt-10">
      <div style={{ width: "70vw", height: "70vh" }}>
        <canvas ref={chartRef} />
      </div>
    </div>
  );
}
