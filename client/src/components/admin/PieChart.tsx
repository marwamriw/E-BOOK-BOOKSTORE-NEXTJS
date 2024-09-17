"use client";
import { useRef, useEffect, useState } from "react";
import { Chart } from "chart.js/auto";

export default function PieChart() {
  const chartRef = useRef(null);
  const [bookData, setBookData] = useState([]);

  useEffect(() => {
    // Fetch book data
    async function fetchBookData() {
      try {
        const response = await fetch("http://localhost:4000/api/book-ten");
        if (!response.ok) {
          console.error("bad response");
          return;
        }
        const result = await response.json();
        // console.log("API result:", result);

        if (result && Array.isArray(result.data)) {
          setBookData(result.data);
        } else {
          console.error("Data is not an array:", result);
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
    const labels = Array.isArray(bookData)
      ? bookData.map((item) => item.title)
      : [];
    const data = Array.isArray(bookData)
      ? bookData.map((item) => item.price)
      : [];

    const newChart = new Chart(context, {
      type: "polarArea",
      data: {
        labels: labels,
        datasets: [
          {
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
              "rgba(255, 99, 132, 0.2)",
              "rgba(255, 159, 64, 0.2)",
              "rgba(255, 205, 86, 0.2)",
              "rgba(75, 192, 192, 0.2)",
              "rgba(54, 162, 235, 0.2)",
              "rgba(153, 102, 255, 0.2)",
              "rgba(201, 203, 207, 0.2)",
            ],
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          title: {
            display: true,
            text: " Ten Recent Book Prices",
          },
        },
        responsive: true,
      },
    });

    chartRef.current.chart = newChart;
  }, [bookData]);

  return (
    <div
      style={{ position: "relative", width: "70vw", height: "70vh" }}
      className="mt-4"
    >
      <canvas ref={chartRef} />
    </div>
  );
}
