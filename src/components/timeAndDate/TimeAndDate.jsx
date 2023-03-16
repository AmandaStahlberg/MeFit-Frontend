import React, { useEffect, useState } from "react";

function TimeAndDate() {
  const [dateState, setDateState] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateState(new Date()), 30000);
  }, []);
  return (
    <>
      <h5 className="text-xl font-bold tracking-tight">
        {dateState.toLocaleDateString(
          "en-GB",

          {
            weekday: "long",
          }
        )}
      </h5>
      <p>
        {dateState.toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
          year: "numeric",
        })}
      </p>
      <p>
        Time: &nbsp;
        {dateState.toLocaleString("sv-SE", {
          hour: "numeric",
          minute: "numeric",
          hour12: false,
        })}
      </p>
    </>
  );
}

export default TimeAndDate;
