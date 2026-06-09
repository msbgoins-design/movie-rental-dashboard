import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  borderColorClass:
    | "neon-pink"
    | "neon-blue"
    | "neon-purple"
    | "neon-orange"
    | "neon-red";
}

const MetricCard: React.FC<MetricCardProps> = ({
  title,
  value,
  subtitle,
  borderColorClass,
}) => {
  return (
    <div
      className={`card h-100 text-white bg-dark text-center metric-card ${borderColorClass}`}
      style={{ borderRadius: "12px" }}
    >
      <div className="card-body d-flex flex-column justify-content-center align-items-center p-4">
        <h6
          className="card-title text-uppercase mb-2 text-white small font-weight-bold"
          style={{ letterSpacing: "1px" }}
        >
          {title}
        </h6>
        <h2 className="card-text display-6 font-weight-bold my-1">{value}</h2>
        {subtitle && (
          <p className="card-text text-white mb-0 mt-2">{subtitle}</p>
        )}
      </div>
    </div>
  );
};

export default MetricCard;
