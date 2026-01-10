import React from "react";
import { Link } from "react-router-dom";

interface ComingSoonProps {
  title?: string;
  description?: string;
}

const ComingSoon: React.FC<ComingSoonProps> = ({
  title = "Coming Soon",
  description = "Details for this section are being finalised. Please check back soon for updates.",
}) => {
  return (
    <div className="max-w-3xl mx-auto text-center py-24 px-6">
      <div className="inline-block bg-card rounded-2xl p-10 shadow-md">
        <h2 className="text-3xl font-extrabold text-navy-deep mb-3">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
        <div className="flex items-center justify-center">
          <Link to="/" className="px-4 py-2 rounded-md bg-primary text-black font-semibold">Return Home</Link>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
