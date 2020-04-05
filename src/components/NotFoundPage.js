import React from "react";
import { Link } from "react-router-dom";

function NotFoundPage() {
  return (
    <div>
      <h2>Page Not Found</h2>
      <p>
        <Link to="/" className="btn btn-secondary">
          Back to home
        </Link>
      </p>
    </div>
  );
}

export default NotFoundPage;
