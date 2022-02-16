import EmptyPost from "components/EmptyPost";
import React from "react";

const Saved = () => {
  const descriptionEmpty =
    "Save photos and videos that you want to see again. No one is notified, and only you can see what you've saved.";

  return (
    <EmptyPost type="save" description={descriptionEmpty}>
      Save
    </EmptyPost>
  );
};

export default Saved;
