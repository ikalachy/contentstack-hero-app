import React from "react";


function ErrorBlock({ error }: { error: string }): JSX.Element {
  return (
    (
      <div className="invalid-feedback" style={{ display: "block" }}>
        {error}
      </div>
    )
  );
}

export default ErrorBlock;
