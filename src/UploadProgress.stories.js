/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import UploadProgress from "./UploadProgress";
import { action } from "@storybook/addon-actions";

export default {
  title: "UploadProgress",
  decorators: [
    storyFn => (
      <div
        style={{
          maxWidth: 640,
          display: "flex",
          alignItems: "stretch",
          flexDirection: "column"
        }}
      >
        {storyFn()}
      </div>
    )
  ]
};

export const initial = () => {
  const [completed, setCompleted] = React.useState(0);
  const [currentFile, setCurrentFile] = React.useState(0);

  React.useEffect(() => {
    function progress() {
      setCurrentFile(oldCurrent => {
        if (completed === 100) return 0;
        return oldCurrent + 1;
      });
      setCompleted(oldCompleted => {
        if (oldCompleted === 100) {
          return 0;
        }
        const diff = Math.random() * 10;
        return Math.min(oldCompleted + diff, 100);
      });
    }

    const timer = setInterval(progress, 500);
    return () => {
      clearInterval(timer);
    };
  }, [completed]);

  return (
    <UploadProgress
      completed={completed}
      currentFile={currentFile}
      totalFiles={15}
    />
  );
};

export const error = () => {
  return (
    <UploadProgress
      completed={30}
      currentFile={2}
      totalFiles={15}
      error={true}
      retry={action("retry")}
    />
  );
};
